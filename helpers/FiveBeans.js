'use strict';

const fivebeans = require('fivebeans');

module.exports = class FiveBeans {};

module.exports.client = null;

module.exports.connect = function(configs, callback) {
	module.exports.client = new fivebeans.client(configs.host, configs.port);

	module.exports.client
		.on('connect', function() {
			// client can now be used
			console.info('FiveBeans::Beanstalkd is connected.');
			return callback(null);
		})
		.on('error', function(error) {
			// connection failure
			console.error(
				'FiveBeans::Error occurred when connecting Beanstalkd: %s',
				JSON.stringify(error)
			);
			return callback({
				err: error
			});
		})
		.on('close', function() {
			// underlying connection has closed
			console.info('FiveBeans::Beanstalkd connection is closed.');
			return callback(null);
		})
		.connect();
};
