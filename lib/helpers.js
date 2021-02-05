/*
 * Helpers for various tasks
 *
 */

// Dependencies
var http = require('https');
var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var querystring = require('querystring');
var path = require('path');
var fs = require('fs');

// Container for all the helpers
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

// Create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for(i = 1; i <= strLength; i++) {
        // Get a random charactert from the possibleCharacters string
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        // Append this character to the string
        str+=randomCharacter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};


// Email validator
helpers.emailValidator = (email) => {
  // Check the email is valid
  if(email.indexOf("@") > 0 && email.indexOf(".") > 2 && email.trim().indexOf(" ") == -1){
    var AtsignSplit = email.split("@");
    var part1 = AtsignSplit[0]; // part of the email before the @
    var part2 = AtsignSplit[1]; // part of the email after the @
    var dotSplit = part2.split(".");
    var part3 = dotSplit[0];    // part between the @ and the .
    var part4 = dotSplit[1];    // part after the dot (The domain)
    function checkSymbol(stringToTest){  // Test if one of the symbols is in a string
      var prohibitedSymbols = [";", ":", "_", "#", "§", "°", "\\", "*", "+", "]", "[", "{", "}", "|", "£", "'", '"', "$", "%", "&", "/", "(", ")", "=", "?", "^", "<", ">"];
      for(const n in prohibitedSymbols){
        if(stringToTest.indexOf(prohibitedSymbols[n]) > -1){
          return true;
        }
      }
      return false;
    }
    // Other email checks
    if(AtsignSplit.length == 2 && dotSplit.length == 2 && part1.length > 0 && part3.length > 0 && part4.length > 1
      && part3.indexOf("-") != 0 && part3.indexOf("-") != part3.length - 1 && part4.indexOf("-") == -1
      && checkSymbol(part3) === false && checkSymbol(part4) === false){
        return true;
    } else {
      return false
    }
  } else {
    return false;
  }
};


helpers.checkPizzaOrder = (pizzaTypes) => {
  var figure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var pizzaPrices = [5, 5, 6, 6.5, 6.5, 7, 5.5];
  var checked = [];
  var orderedPizzas = [];
  for(i=0; i<pizzaTypes.length; i++){
      if(pizzaTypes[i].length > 0){
        for(n=0; n<figure.length; n++){
          if(pizzaTypes[i].charAt(0) == figure[n]){
            if(pizzaTypes[i].length == 1){
              if(figure[n] == '0'){
                orderedPizzas.push(false);
                checked.push('checked');
                continue;
              } else {
                orderedPizzas.push((pizzaTypes[i]*pizzaPrices[i]));
                checked.push('checked');
                continue;
              }
            } 

            if(pizzaTypes[i].length == 2){
              for(m=0; m<figure.length; m++){
                if(pizzaTypes[i].charAt(1) == figure[m]){
                  orderedPizzas.push(pizzaTypes[i]*pizzaPrices[i]);
                  checked.push('checked');
                  continue;
                } else {
                  if(figure[m] == 9 && checked[i] == undefined){ //check if the second figure is a number or not
                    orderedPizzas.push(false);
                    checked.push('checked');
                    continue;
                  } else {
                    continue;
                  }
                }
              }
            }

            if(pizzaTypes[i].length > 2){
              orderedPizzas.push(false);
              checked.push('checked');
              continue;
            }
            
          } else { // If after the tenth test, noone of the 10 figures matches the pizzaTypes[1].charAt(0), means that it isn't a number or a figure of a number (could be a letter)
            if(figure[n] == 9 && checked[i] == undefined){
              orderedPizzas.push(false);
              checked.push('checked');
              continue;
            } else {
              continue;
            }
          }
        }
      } else {
        orderedPizzas.push(false);
        checked.push('checked');
        continue;
      }
  }
  return orderedPizzas;
}



helpers.sendRequest = function(protocol, port, hostname, method, path, contentType, auth, timeoutSeconds, postData, callback){
  var stringPayload = querystring.stringify(postData);

  // Construct the request
  var requestDetails = {
    'hostname' : hostname,
    'port': port,
    'method' : method,
    'timeout' : timeoutSeconds * 1000,
    'path' : path
  };

  // Instantiate the request object (using either the http or https module)
  var _moduleToUse = protocol == 'http' ? http : https;
  var req = _moduleToUse.request(requestDetails, function(res){
    res.on('data', (d) => {
      if(res.statusCode == 200){
       callback(false);
      }else{
        console.log(res.statusCode);
        callback(true);
      }
    });
  });

  req.setHeader('Authorization', auth);
  req.setHeader('Content-Type', contentType);
  req.setHeader('Content-Length', Buffer.byteLength(stringPayload));

  // Add the payload
  req.write(stringPayload);

  // Bind to the error event so it doesn't get thrown
  req.on('error',function(e){
    console.log(e);
    callback(true, {'Error': e});
  });

  // Bind to the timeout event
  req.on('timeout',function(){
    console.log('timeout');
    callback(true, {'Error': 'The request took much time and got timeout.'})
  });

  // End the request
  req.end();
};



// Get the string content of a template, and use provided data for string interpolation
helpers.getTemplate = function(templateName,data,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof(data) == 'object' && data !== null ? data : {};
  if(templateName){
    var templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html', 'utf8', function(err,str){
      if(!err && str && str.length > 0){
        // Do interpolation on the string
        var finalString = helpers.interpolate(str,data);
        callback(false,finalString);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer to a string, and pass provided data object to header and footer for interpolation
helpers.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};
  // Get the header
  helpers.getTemplate('_header',data,function(err,headerString){
    if(!err && headerString){
      // Get the footer
      helpers.getTemplate('_footer',data,function(err,footerString){
        if(!err && headerString){
          // Add them all together
          var fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};

// Take a given string and data object, and find/replace all the keys within it
helpers.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global."
  for(var keyName in config.templateGlobals){
     if(config.templateGlobals.hasOwnProperty(keyName)){
       data['global.'+keyName] = config.templateGlobals[keyName]
     }
  }
  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for(var key in data){
     if(data.hasOwnProperty(key) && typeof(data[key] == 'string')){
        var replace = data[key];
        var find = '{'+key+'}';
        str = str.replace(find,replace);
     }
  }
  return str;
};

// Get the contents of a static (public) asset
helpers.getStaticAsset = function(fileName,callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName, function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid file name was not specified');
  }
};


// Export the module
module.exports = helpers;


