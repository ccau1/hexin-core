'use strict';

const AppStartConfig = require('../AppStartConfig');
const Err = require('../../helpers/Error');
const MongooseError = require('mongoose/lib/error');
const MongoError = require('mongodb-core').MongoError;

module.exports = class ErrorsConfig extends AppStartConfig {
  init() {
    const {router} = this.appConfig;
    Err.setGlobal();
    router.use(this.middleware.bind(this));
  }

  middleware(error, req, res, next) {
    let errorObj = {
      status: error.status || 500,
      message: error.message || 'internal server error',
      stack: error.stack || {}
    };

    this.handleMongoError(errorObj, error);
    this.handleGenericError(errorObj, error);

    this.handleErrorLog(errorObj, req.log);

    return this.handleErrorResponse(errorObj, res);
  }

  handleErrorResponse(error, res) {
    return res.status(error.status).json(error.message);
  }

  handleErrorLog(error, log) {
    if (error.status >= 500) {
      log('error', error.stack);
    }
  }

  handleGenericError(errorObj, error) {
    if (Array.isArray(error)) {
      // assuming it is from indicative
      errorObj.message = {};
      error.forEach(err => {
        errorObj.message[err.field] = err.message;
      });
      errorObj.status = 400;
    } else if (typeof errorObj.message === 'string') {
      errorObj.message = {_error: [errorObj.message]};
    }
  }

  handleMongoError(errorObj, error) {
    if (error.name === 'MongoError') {
      errorObj.message = error.message;
    } else if (error instanceof MongooseError) {
      if (error.name === 'CastError') {
        errorObj.status = 400;
      }
      errorObj.message = {[error.path]: error.message};
    }
  }
};
