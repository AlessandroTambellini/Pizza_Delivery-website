/*
 * Create and export configuration variable
 *
 */

// Container for all environments
var environment = {};

// Staging (default) environment
environment.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'templateGlobals' : {
    'appName' : 'Pizza Delivery',
    'companyName' : 'Pizza Delivery',
    'yearCreated' : '2021',
    'baseUrl' : 'http://localhost:3000/'
  },
  'stripe': {    
     'secretApiKeyTest':'************************************************************************************************************'
  },
  'mailgun': {
    'ApiKeyTest':'***********************************************',
    'boundaries' : '************************************',
    'domain':'************************************************'
  }
};



// Export the module
module.exports = environment.staging;
