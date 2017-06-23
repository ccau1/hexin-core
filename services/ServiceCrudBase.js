'use strict';

const _ = require('lodash');
const objectID = require('mongodb').ObjectID;
const ServiceBase = require('./ServiceBase');
const {ValidationError} = require('../helpers/Error');

module.exports = class ServiceCrudBase extends ServiceBase {
  /**
   * Create payment
   * @param payment - {object}  payment object
   */
  async create(obj) {
    const {validate, sanitize, _model} = this;

    await validate(obj);
    obj = sanitize(obj);

    let newModelObj = new _model(obj);

    await newModelObj.save();

    return newModelObj.toObject();
  }

  /**
   * Get All payments
   */
  async getAll() {
    const {_model} = this;

    const objs = await _model.find({}).lean();

    return objs;
  }

  /**
   * Get All payments
   * @param _id - {object}  id of payment
   */

  async getById(_id) {
    const {t, _model} = this;
    if (!objectID.isValid(_id)) {
      throw new ValidationError({_error: [t('err_invalid_id')]});
    }
    const modelObj = await _model.findOne({_id: _id}).lean();

    return modelObj;
  }

  /**
   * Get All payments
   * @param _id - {object}  id of payment
   * @param payment - {object}  payment object
   */
  async update(_id, obj) {
    const {validate, sanitize, t, _model} = this;
    if (obj._id !== _id) {
      throw new ValidationError(t('err_id_not_match'));
    }
    await validate(obj);
    obj = sanitize(obj);

    const newObj = await _model.findByIdAndUpdate(_id, obj, {new: true});
    return newObj;
  }

  /**
   * delete payment
   * @param _id - {object}  id of payment
   */
  async delete(_id) {
    const {t, _model} = this;

    let deletedObj = await _model.findByIdAndRemove(_id);
    if (!deletedObj) {
      throw new ValidationError(t('err_not_found', [_model.modelName]));
    }

    return deletedObj.toObject();
  }
};
