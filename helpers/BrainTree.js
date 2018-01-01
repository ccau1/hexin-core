'use strict';

const braintree = require('braintree');

module.exports = class BrainTree {};

module.exports.configs = null;
module.exports.client = null;

/**
 * configure braintree
 */
module.exports.setConfig = function(configs) {
	module.exports.configs = configs;
};
/**
 * connect braintree
 */
module.exports.connect = function() {
	if (module.exports.configs === null) {
		throw new Error('Braintree::Please configure before connect.');
	}
	module.exports.client = braintree.connect(module.exports.configs);
};
/**
 * get client token
 */
module.exports.generateClientToken = function() {
	if (module.exports.client === null) {
		throw new Error('Braintree::Client is not connected yet.');
	}

	module.exports.client.clientToken.generate({}, function(err, response) {
		return response.clientToken;
	});
};
