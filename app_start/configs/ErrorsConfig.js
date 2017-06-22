'use strict';

const AppStartConfig = require('../AppStartConfig');
const Err = require('../../helpers/Error');
const MongooseError = require('mongoose/lib/error');

module.exports = class ErrorsConfig extends AppStartConfig {
  init() {
    const {router} = this.appConfig;
    Err.setGlobal();
    router.use(this.middleware);
  }

  middleware(error, req, res, next) {
    let status = error.status || 500;
    let message = error.message || 'internal server error';
    if (error instanceof MongooseError) {
      if (error.name === 'CastError') {
        status = 400;
      }
      message = {[error.path]: error.message};
    } else if (Array.isArray(error)) {
      // assuming it is from indicative
      message = {};
      error.forEach(err => {
        message[err.field] = err.message;
      });
      status = 400;
    }

    if (status >= 500) {
      req.log('error', error.stack);
    }

    return res.status(status).json(message);
  }
};
