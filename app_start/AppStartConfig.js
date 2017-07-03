'use strict';

module.exports = class AppStartConfig {
  constructor(appConfig) {
    this.appConfig = appConfig;
  }

  preInit(next, appConfig) { next(); }

  init(next, appConfig) { next(); }

  postInit(next, appConfig) { next(); }
};
