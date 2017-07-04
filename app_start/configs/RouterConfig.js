'use strict';

const AppStartConfig = require('../AppStartConfig');

module.exports = class RouterConfig extends AppStartConfig {
  _init(next) {
    const {app, router, baseUrl} = this.appConfig;

    // Register all our routes with /api
    app.use(baseUrl, router);
    next();
  }
};
