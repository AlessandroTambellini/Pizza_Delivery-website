/*
 * Request Handlers
 *
 */

// Dependencies
const { Z_ASCII } = require('zlib');
var _data = require('./data');
var helpers = require('./helpers');
//var helpers = require('./config');

// Define all the handlers
var handlers = {};

/*
 * HTML Handlers
 *
 */

// Index
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Pizza Delivery',
      'head.description' : 'Best pizzas with the best delivery service',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create an account
handlers.accountCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only take few seconds',
      'body.class' : 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};


// Create new session
handlers.sessionCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your Account',
      'head.description' : 'Please enter your email and address to access your account',
      'body.class' : 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'head.description' : 'Your account has been deleted',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Menu page
handlers.menuItems = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'menu',
      'head.description' : 'the menu is shown to loggedout users',
      'body.class' : 'menu'
    };
    // Read in a template as a string
    helpers.getTemplate('menuItems',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create order
handlers.orderCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'create an order',
      'head.description' : 'page to make orders',
      'body.class' : 'orderCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('order',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};



// Public assets
handlers.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};


/*********************************************************************************************/

/*
 * JSON API handlers
 *
 */


// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};


// clients
handlers.clients = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._clients[data.method](data,callback);
  } else {
    callback(405);
  }
}

// Container for all the clients methods
handlers._clients  = {};

// Clients - post
// Required data: firstName, lastName, address, email, tosAgreement
// Optional data: none
handlers._clients.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 6 && data.payload.email.trim().length < 254 ? data.payload.email.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  // Creation of the client
  if(firstName && lastName && email && address && tosAgreement){
    // Check the email is valid
    var emailChecked = helpers.emailValidator(email);
    if(emailChecked === true){
      // Make sure the client doesn't already exist
      _data.read('clients',email,function(err,data){
        if(err){
          // Create the client object
          var clientObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'email' : email,
            'address' : address,
            'tosAgreement' : tosAgreement
          };

          // Store the client
          _data.create('clients',email,clientObject,function(err){
            if(!err){
              callback(200, clientObject);
            } else {
              callback(500,{'Error' : 'Could not create the new client'});
            }
          });
        } else {
          callback(400,{'Error' : 'A client with that email already exists'});
        }
      });
    } else {
      callback(400, {'Error' : 'Invalid email'})
    }
  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }
}

// Clients - get
// Required data: tokenId
// Optional data: none
handlers._clients.get = function(data,callback){
  var tokenId = typeof(data.queryStringObject.tokenId) == 'string' ? data.queryStringObject.tokenId : false;
  // Verify that the given token is valid
  _data.read('tokens',tokenId,function(err, tokenData){
    if(!err && tokenData){
      clientEmail = tokenData.email;
      _data.read('clients',clientEmail,function(err, clientData){
        if(!err && clientData){
          callback(200, clientData);
          console.log(clientData);
        } else {
          callback(400,{'Error' : 'Could not show the client data'});
        }
      });
    } else {
      callback(403,{"Error" : "Token is invalid."});
    }
  });
}

// Clients - update
// Required data: address
// Optional data: firstName, lastName, email, address
handlers._clients.put = function(data,callback){
  // Check for required email
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 6 ? data.payload.email.trim() : false;
  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  
  // Error if email
  if(email){
    // Error if nothing is sent to update
    if(firstName || lastName || address){

      // Get token from headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the email
      handlers._tokens.verifyToken(token,email,function(tokenIsValid){
        if(tokenIsValid){
          // Lookup the user
          _data.read('clients',email,function(err,userData){
            if(!err && userData){
              // Update the fields if necessary
              if(firstName){
                userData.firstName = firstName;
              }
              if(lastName){
                userData.lastName = lastName;
              }
              if(address){
                userData.address = address;
              }
              // Store the new updates
              _data.update('clients',email,userData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              });
            } else {
              callback(400,{'Error' : 'Specified user does not exist.'});
            }
          });
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
        }
      });
    } else {
      callback(400,{'Error' : 'Not digited fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required email.'});
  } 
};


// Clients - delete
// Required data: address
// Cleanup old checks associated with the client
handlers._clients.delete = function(data,callback){
  // Check for required field = token id from headers
  var tokenId = typeof(data.headers.token) == 'string' ? data.headers.token : false;

  // Verify that the given token is valid 
  _data.read('tokens',tokenId,function(err, tokenData){
    if(!err && tokenData){
      var clientEmail = tokenData.email;
      //Delete the client token
      _data.delete('tokens',tokenId,function(err){
        if(!err){
          // Delete the client's data
          _data.delete('clients',clientEmail,function(err){
            if(!err){
              callback(200, {'Success' : 'Client successfully deleted'});
            } else {
              callback(500,{'Error' : 'Could not delete the specified client'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not delete the client token'});
        }
      });
    } else {
      callback(403,{"Error" : "Token is invalid."});
    }
  });
};




// Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens  = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 5 ? data.payload.email.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  if(email && address){
    // Lookup the user who matches that email
    _data.read('clients',email,function(err,clientData){
      if(!err && clientData){
        // Check the address is correct
        if(address == clientData.address){
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'email' : email,
            'id' : tokenId,
            'expires' : expires
          };
          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200, tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create the new token'});
            }
          });
        } else {
          callback(400,{'Error' : 'Address did not match the specified user\'s stored address'});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s).'})
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the existing token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Check to make sure the token isn't already expired
        if(tokenData.expires > Date.now()){
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update the token\'s expiration.'});
            }
          });
        } else {
          callback(400,{"Error" : "The token has already expired, and cannot be extended."});
        }
      } else {
        callback(400,{'Error' : 'Specified user does not exist.'});
      }
    });
  } else {
    callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
  }
};


// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Delete the token
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,email,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that the token is for the given user and has not expired
      if(tokenData.email == email && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};




// Order
handlers.order = function(data,callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._order[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._order  = {};


// Order - post
handlers._order.post = (data, callback) => {
  fourCheeses = typeof(data.payload.fourCheeses) == 'string' ? data.payload.fourCheeses.trim() : false;
  margherita = typeof(data.payload.margherita) == 'string' ? data.payload.margherita.trim() : false;
  pepperoni = typeof(data.payload.pepperoni) == 'string' ? data.payload.pepperoni.trim() : false;
  speckArugola = typeof(data.payload.speckArugola) == 'string' ? data.payload.speckArugola.trim() : false;
  vegetarian = typeof(data.payload.vegetarian) == 'string' ? data.payload.vegetarian.trim() : false;
  buffaloMozzarella = typeof(data.payload.buffaloMozzarella) == 'string' ? data.payload.buffaloMozzarella.trim() : false;
  mushrooms = typeof(data.payload.mushrooms) == 'string' ? data.payload.mushrooms.trim() : false; 

  if(fourCheeses || margherita || pepperoni || speckArugola || vegetarian || buffaloMozzarella || mushrooms){
    var pizzaTypes = [fourCheeses, margherita, pepperoni, speckArugola, vegetarian, buffaloMozzarella, mushrooms];
    var orderedPizzas = helpers.checkPizzaOrder(pizzaTypes);
    if(orderedPizzas !== null){
      _data.read('tokens',data.headers.token, (err, tokenData) => {
        if(!err && tokenData){
          var orderId = helpers.createRandomString(20);
          var orderedPizzasObj = {
            'orderedPizzas': orderedPizzas,
            'delivery_time': '',
            'address': '',
            'orderId': orderId,
            'email': tokenData.email,
            'payed': false,
            'email_sent': false
          };
          _data.create('orders', orderId, orderedPizzasObj, (err) => {
            !err ?  callback(200, orderedPizzasObj) : callback(500, {'Error': 'Could not store the new order'});
          });

        } else {
          callback(400, {'Error': 'Your not logged In'});
        }
      });
    } else {
      callback(400, {'Error': 'Could not take the order'});
    } 

  } else {
    callback(400, {'Error': 'Nothing to order was send'});
  } 
};



module.exports = handlers;



