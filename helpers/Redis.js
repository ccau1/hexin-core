'use strict';

const redis = require('redis');

module.exports = class Redis {
};

module.exports.client = null;

module.exports.connect = function (configs) {
  module.exports.client = redis.createClient({
    host: configs.host, port: configs.port,
  });
};
