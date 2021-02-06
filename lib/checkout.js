/*
 * Specific handler for checkout actions
 *
 */

 // Dependencies
 var _data = require('./data');
 var config = require('./config');
 var helpers = require('./helpers');



// Checkout

var checkout = {};

checkout.payment = function(data, callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    checkout._payment[data.method](data,callback);
  } else {
    callback(405);
  }
}

// Container for the checkout submethod
checkout._payment = {};


checkout._payment.post = function(data, callback){
  // Get tokenId and userIdentifier from header
  var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
  // Let's get the order id that client wants to checkout and the stripe token 
  var orderId = typeof(data.payload.orderId) == 'string' && data.payload.orderId.trim().length > 0? data.payload.orderId.trim() : false;
  var totalPrice = typeof(data.payload.totalPrice) == 'string' && data.payload.totalPrice.trim().length > 0? data.payload.totalPrice.trim() : false;
  var deliveryTime = typeof(data.payload.deliveryTime) == 'string' && data.payload.deliveryTime.trim().length > 0? data.payload.deliveryTime.trim() : false;
  var stripeToken = typeof(data.payload.stripeToken) == 'string' && data.payload.stripeToken.trim().length > 0 ? data.payload.stripeToken : false;
  var userIdentifier = typeof(data.payload.address) == 'string' ? data.payload.address : false;

  if(userIdentifier){
    if(token){
      _data.read('tokens', token, (err, tokenData) => {
        if(!err && tokenData){
          _data.read('clients', tokenData.email, (err, clientData) => {
            if(!err && clientData){
              if(userIdentifier == clientData.address){
                if(orderId && stripeToken){
                  _data.read('orders', orderId, (err, orderData) => {
                    if(!err && orderData){
                      var stripeRequestObject = {
                          amount: (totalPrice),
                          currency: 'usd',
                          description: (userIdentifier+'_'+token+'_'+Date.now()),   
                          source: stripeToken
                      };
                      helpers.sendRequest('https', '443', 'api.stripe.com', 'POST', '/v1/charges',
                      'application/x-www-form-urlencoded', ('Bearer ' + config.stripe.secretApiKeyTest), 5, stripeRequestObject, function(err, data){
                        if(err && data){
                          //There was a problem placing the charge via stripe, let's alert the client(user) via email and return server error.
                          orderData.payed = false;
                        } else {
                          //There wasn't any error and charge have been applied through stripe, now let's update the order status and send email to the user afterwards.
                          orderData.payed = true;
                          console.log('successful stripe');
                        }
    
                        var emailRequestObject = {
                            'from': '*********email service domain**************',
                            'to': tokenData.email,
                            'subject': 'Order: '+orderId+'',
                            'text': 'Dear '+clientData.firstName+', the order with a total amout of ' + totalPrice + ' was made by yourself.'
                        };
    
                        helpers.sendRequest('https', '443', 'api.mailgun.net', 'POST', '/v3/****email service domain*************/messages',
                        'application/x-www-form-urlencoded', ('Basic ' + Buffer.from(('api:'+ config.mailgun.ApiKeyTest)).toString('base64')), 5, emailRequestObject, function(err){
                          if(!err){
                            orderData.email_sent = true;
                            orderData.delivery_time = deliveryTime;
                            orderData.address = clientData.address;
                          } else {
                            console.log("There was an error sending the email to the client.");
                          }
                          _data.update('orders', orderId, orderData, function(err){
                            if(!err){
                              callback(200, {'Congratulation: ' : 'All the actions has been completed. Your pizzas will be delivered at '+orderData.delivery_time+' in this location: '+orderData.address});
                            } else {
                              callback(500, {'Error': 'There was an error updating the user\'s order.'});
                            }
                          });
                        });
                      });
                    } else {
                      callback(403, {'Error': 'Could not find the order in the storage'});
                    }
                  });
                } else {
                  callback(400, {'Error': 'Missing required order Id or payment method'});
                }
              } else {
                callback(400, {'Error': 'Wrong address'});
              }
            } else {
              callback(400, {'Error': 'Could not find the specified user'});
            }
          });
        } else {
          callback(400, {'Error': 'Could not find the user token'});
        }
      });
    } else {
      callback(400, {'Error': 'Missing required token in header. Probably you are not logged in.'});
    }
  } else {
    callback(400, {'Error': 'Missing required address'});
  }

};


module.exports = checkout;
