'use strict';

const _ = require('lodash');
const indicative = require('indicative');
const {Mapper} = require('../helpers');
const {ValidationError, formatIndicativeErrors} = require('../helpers/Error');

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
    this.mapper.setMap()(function (obj) {
      const {t} = this;

      if (!obj) {
        throw new ValidationError(t('err_mapping_null_obj'));
      }

      return obj;
    });
    this.mapper.setMap('full')(function (obj) {
      const {t} = this;

      if (!obj) {
        throw new ValidationError(t('err_mapping_null_obj'));
      }

      return obj;
    });
    this.mapper.setMap('list')(function (obj) {
      const {t} = this;

      if (!obj) {
        throw new ValidationError(t('err_mapping_null_obj'));
      }

      return obj;
    });
    this.mapper.setMap('model')(function (obj) {
      const {t} = this;

      if (!obj) {
        throw new ValidationError(t('err_mapping_null_obj'));
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
        throw new ValidationError(formatIndicativeErrors(errors));
      });
  }

  sanitize(obj) {
    const sanitizationRules = {
    };

    const sanitizedData = indicative.sanitize(obj, sanitizationRules);

    return sanitizedData;
  }
};
