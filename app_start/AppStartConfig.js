'use strict';

module.exports = class AppStartConfig {
  constructor(appConfig: Object) {
    this.appConfig = appConfig;
    this.preInit(appConfig);
  }

  preInit(appConfig: Object) { }

  init(appConfig: Object) { }

  postInit(appConfig: Object) { }
};
