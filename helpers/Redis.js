'use strict';

const redis = require('redis');

module.exports = class Redis {
};

module.exports.client = null;

module.exports.config = {};

module.exports.connect = function (config) {
  this.client = redis.createClient({
    host: config.host, port: config.port,
  });
  this.config = config;
};
