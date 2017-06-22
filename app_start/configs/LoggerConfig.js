'use strict';

const {AppStartConfig, Logger} = require('hexin-core');

module.exports = class LoggerConfig extends AppStartConfig {
  init() {
    const {router} = this.appConfig;

    Logger.init(process.env.NODE_ENV);

    router.use(this.middleware);
  }

  middleware(req, res, next) {
    req.log = Logger.print;
    next();
  }
};
