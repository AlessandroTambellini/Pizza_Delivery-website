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
     'secretApiKeyTest':'sk_test_51HxF08GIhlLUSbnqQyEbp4zYsondpWOy67mnhVUQVPFZeXrXlyxJvv96laRqYWkoZ 1rKnw5oUSIVgFV2CCI5BbRf00svkGUaCd'
  },
  'mailgun': {
    'ApiKeyTest':'1f3c8880bef3ecc29e5ad53281a3e054-4879ff27-ad190a0e',
    'boundaries' : 'pubkey-2d9871cbd108bc4346ac9f5c5499f1f7',
    'domain':'sandbox3190a416efd04182891524cf8725529e.mailgun.org'
  }
};



// Export the module
module.exports = environment.staging;