'use strict';

const _ = require('lodash');
const {HandleError} = require('../../appFramework/helpers');
const objectID = require('mongodb').ObjectID;
const ServiceBase = require('./ServiceBase');

module.exports = class ServiceCrudBase extends ServiceBase {
  /**
   * Create payment
   * @param payment - {object}  payment object
   */
  * create(obj) {
    const {validate, sanitize, _model} = this;

    yield validate(obj);
    obj = sanitize(obj);

    let newModelObj = new _model(obj);

    try {
      yield newModelObj.save();
    } catch (e) {
      throw new HandleError(e.errors, 400);
    }

    return newModelObj.toObject();
  }

  /**
   * Get All payments
   */
  * getAll() {
    const {_model} = this;

    const objs = yield _model.find({}).lean();

    return objs;
  }

  /**
   * Get All payments
   * @param _id - {object}  id of payment
   */

  * getById(_id) {
    const {t, _model} = this;
    if (!objectID.isValid(_id)) {
      throw new HandleError({_error: [t('err_invalid_id')]}, 400);
    }
    const modelObj = yield _model.findOne({_id: _id}).lean();
    if (!modelObj) {
      throw new HandleError({_error: [t('err_not_found')]}, 400);
    }
    return modelObj;
  }

  /**
   * Get All payments
   * @param _id - {object}  id of payment
   * @param payment - {object}  payment object
   */
  * update(_id, obj) {
    const {validate, sanitize, t, _model} = this;
    if (obj._id !== _id) {
      throw new HandleError({_error: [t('err_id_not_match')]}, 400);
    }
    yield validate(obj);
    obj = sanitize(obj);
    try {
      yield _model.update({_id: _id}, {$set: obj});
    } catch (e) {
      throw new HandleError(e.errors, 400);
    }
    return obj;
  }

  /**
   * delete payment
   * @param _id - {object}  id of payment
   */
  * delete(_id) {
    const {t, _model} = this;

    let deletedObj = yield _model.findByIdAndRemove(_id);
    if (!deletedObj) {
      throw new HandleError({_error: [t('err_not_found')]}, 400);
    }

    return deletedObj.toObject();
  }
};
