'use strict';

module.exports = class AppStartConfig {
  constructor(appConfig) {
    this.appConfig = appConfig;
    this.preInit(appConfig);
  }

  preInit() { }

  init() { }

  postInit() { }
};
