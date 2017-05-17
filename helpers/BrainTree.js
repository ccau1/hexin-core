'use strict';

const braintree = require('braintree');

module.exports = class BrainTree {

};

module.exports.configs = null;
module.exports.gateway = null;

/**
 * configure braintree
 */
module.exports.configure = function (configs) {
  module.exports.configs = configs;
};
/**
 * connect braintree
 */
module.exports.connect = function () {
  if (module.exports.configs === null) {
    throw new Error('Please configure before connect.');
  }
  module.exports.gateway = braintree.connect(module.exports.configs);
};
/**
 * get client token
 */
module.exports.generateClientToken = function () {
  if (module.exports.gateway === null) {
    throw new Error('gateway is not connected yet.');
  }

  module.exports.gateway.clientToken.generate({}, function (err, response) {
    return response.clientToken;
  });
};
