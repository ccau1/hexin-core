'use strict';

const _ = require('lodash');
const indicative = require('indicative');
const {HandleError, Mapper} = require('../helpers');

module.exports = class ServiceBase {
  constructor(context_, model) {
    // extract context into service variables
    this.t = context_.locale.t;
    this.lang = context_.locale.currentLanguage;
    this.context = context_;
    this._model = model;
    this.mapper = new Mapper(this);

    this._setDefaultMaps();
  }

  _setDefaultMaps() {
    this.mapper.addMap()(function (obj) {
      const {t} = this;

      if (!obj) {
        throw new HandleError({_error: [t('err_mapping_null_obj')]}, 500);
      }

      return obj;
    });
    this.mapper.addMap('model')(function (obj) {
      const {t} = this;

      if (!obj) {
        throw new HandleError({_error: [t('err_mapping_null_obj')]}, 500);
      }

      return obj;
    });
  }

  validate(obj) {
    const rule = {
      _id: 'validId'
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
};
