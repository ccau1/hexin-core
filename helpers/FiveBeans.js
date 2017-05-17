'use strict';

const fivebeans = require('fivebeans');

module.exports = class FiveBeans {

};

module.exports.bsClient = null;

module.exports.connect = function (configs, callback) {
  module.exports.bsClient = new fivebeans.client(configs.host, configs.port);

  module.exports.bsClient
  .on('connect', function () {
    // client can now be used
    console.info('Beanstalkd is connected.');
    return callback(null);
  })
  .on('error', function (error) {
    // connection failure
    console.error('Error occurred when connecting Beanstalkd: %s', JSON.stringify(error));
    return callback({
      err: error,
    });
  })
  .on('close', function () {
    // underlying connection has closed
    console.info('Beanstalkd connection is closed.');
    return callback(null);
  }).connect();
};
