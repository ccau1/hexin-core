'use strict';

const AppStartConfig = require('../AppStartConfig');
const Redis = require('../../helpers/Redis');

module.exports = class RedisConfig extends AppStartConfig {
  init(next, appConfig) {
    this._init(next, appConfig);
  }

  _init(next, appConfig) {
    const {redis} = appConfig;

    Redis.connect(redis);
    next();
  }
  _preInit(next, appConfig) { }
  _postInit(next, appConfig) { }
};
