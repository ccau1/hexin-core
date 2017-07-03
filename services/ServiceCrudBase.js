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
    const {validate, sanitize, _repo, unitOfWork} = this;

    await validate(obj);
    obj = sanitize(obj);

    const newObj = await _repo.create(obj);
    await unitOfWork.commit();

    return newObj;
  }

  /**
   * Get All payments
   */
  async getAll() {
    const {_repo} = this;

    const objs = await _repo.find({});

    return objs;
  }

  /**
   * Get All payments
   * @param _id - {object}  id of payment
   */

  async getById(_id) {
    const {t, _repo} = this;
    if (!objectID.isValid(_id)) {
      throw new ValidationError({_error: [t('err_invalid_id')]});
    }
    const modelObj = await _repo.findById(_id);

    return modelObj;
  }

  /**
   * Get All payments
   * @param _id - {object}  id of payment
   * @param payment - {object}  payment object
   */
  async update(_id, obj) {
    const {validate, sanitize, t, _repo} = this;
    if (obj._id !== _id) {
      throw new ValidationError(t('err_id_not_match'));
    }
    await validate(obj);
    obj = sanitize(obj);

    const newObj = await _repo.updateById(_id, obj);
    await unitOfWork.commit();

    return newObj;
  }

  /**
   * delete payment
   * @param _id - {object}  id of payment
   */
  async delete(_id) {
    const {t, _repo} = this;

    let deletedObj = await _repo.deleteById(_id);
    if (!deletedObj) {
      throw new ValidationError(t('err_not_found', [_repo.modelName]));
    }
    await unitOfWork.commit();

    return deletedObj;
  }
};
