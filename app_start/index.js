'use strict';

const AppStartBase = require('./AppStartBase');
const AppStartConfig = require('./AppStartConfig');

const configs = require('./configs');

module.exports = Object.assign({},
  configs,
  {
    AppStartConfig,
    AppStartBase
  }
);
