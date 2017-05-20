'use strict';

const AppStartConfig = require('../AppStartConfig');
const Redis = require('../../helpers/Redis');

module.exports = class RedisConfig extends AppStartConfig {
  init(appConfig) {
    this._init(appConfig);
  }

  _init(appConfig) {
    const {redis} = appConfig;

    Redis.connect(redis);
  }
  _preInit(appConfig) { }
  _postInit(appConfig) { }
};
