'use strict';

const app_start = require('./app_start');
const controllers = require('./controllers');
const services = require('./services');
const helpers = require('./helpers');
const definer = require('./definer');

module.exports = Object.assign({},
  controllers,
  services,
  app_start,
  helpers,
  definer
);
