'use strict';

const Logger = require('../../helpers/Logger');
const AppStartConfig = require('../AppStartConfig');

module.exports = class LoggerConfig extends AppStartConfig {
  init(next) {
    const {router} = this.appConfig;

    Logger.init(process.env.NODE_ENV);

    router.use(this.middleware);
    next();
  }

  middleware(req, res, next) {
    req.log = Logger.print;
    next();
  }
};
