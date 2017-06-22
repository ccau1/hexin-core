'use strict';

const AppStartConfig = require('../AppStartConfig');

module.exports = class RouterConfig extends AppStartConfig {
  init() {
    const {app, router, baseUrl} = this.appConfig;

    // Register all our routes with /api
    app.use(baseUrl, router);
  }
};
