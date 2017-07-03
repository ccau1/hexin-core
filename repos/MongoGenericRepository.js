'use strict';

const iRepository = require('./iRepository');

class MongoGenericRepository extends iRepository {
  constructor(model, context) {
    super();
    this._model = model;
    this.modelName = model.modelName;
    this._context = context;
  }

  async handleCall(call) {
    return call
      .then(result => {
        if (!result) {
          return result;
        } else if (result.toObject) {
          result = result.toObject();
        } else if (result._doc) {
          result = result._doc;
        }
        return result;
      })
      .catch(err => {
        throw err;
      });
  }

  async find(query) {
    return await this.handleCall(this._model.find(query).lean());
  }
  async findOne(query) {
    return await this.handleCall(this._model.findOne(query).lean());
  }
  async findById(id) {
    return await this.handleCall(this._model.findById(id).lean());
  }
  async create(modelObj) {
    return await this.handleCall(this._model.create(modelObj));
  }
  async update(query, modelObj) {
    return await this.handleCall(this._model.update(query, {$set: modelObj}));
  }
  async updateOne(query, modelObj) {
    return await this.handleCall(this._model.findOneAndUpdate(query, {$set: modelObj}, {new: true}));
  }
  async updateById(id, modelObj) {
    return await this.handleCall(this._model.findByIdAndUpdate(id, {$set: modelObj}, {new: true}));
  }
  async delete(query) {
    return await this.handleCall(this._model.remove(query));
  }
  async deleteOne(query) {
    return await this.handleCall(this._model.findOneAndRemove(query));
  }
  async deleteById(id) {
    return await this.handleCall(this._model.findByIdAndRemove(id));
  }
  async commit() {
    return true;
  }
}

module.exports = MongoGenericRepository;
