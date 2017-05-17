'use strict';

const _ = require('lodash');
const indicative = require('indicative');
const {HandleError} = require('../helpers');

module.exports = class ServiceBase {
  constructor(context_, model) {
    // extract context into service variables
    this.t = context_.locale.t;
    this.lang = context_.locale.currentLanguage;
    this.context = context_;
    this._model = model;
  }

  validate(obj) {
    const rule = {
      _id: 'validId',
    };
    const message = {
    };
    return indicative.validateAll(obj, rule, message)
      .catch(errors => {
        throw new HandleError(HandleError.formatIndicativeErrors(errors), 400);
      });
  }

  sanitize(obj) {
    const sanitizationRules = {
    };

    const sanitizedData = indicative.sanitize(obj, sanitizationRules);

    return sanitizedData;
  }

  mapper(obj) {
    const {t} = this;
    if (!obj) {
      throw new HandleError({_error: [t('err_mapping_null_obj')]}, 500);
    }
    const newObj = Object.assign({}, obj);

    return newObj;
  }

  mapperReverse(obj) {
    const {t} = this;
    if (!obj) {
      throw new HandleError({_error: [t('err_mapping_null_obj')]}, 500);
    }
    const newObj = Object.assign({}, obj);

    return newObj;
  }
};
