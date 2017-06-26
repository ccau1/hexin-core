'use strict';

const iRepository = require('./iRepository');

class MongoGenericRepository extends iRepository {
  constructor(connection, model) {
    super();
    this._model = model;
    this._connection = connection;
    this._transaction = null;
  }

  async handleCall(call) {
    return call
      .catch(err => {
        throw new Error(err);
      });
  }

  async find(query) {
    return this.handleCall(this._model.find(query).lean());
  }
  async findOne(query) {
    return await this.handleCall(this._model.findOne(query).lean());
  }
  async findById(id) {
    return this.handleCall(this._model.findById(id).lean());
  }
  async create(modelObj) {
    return this.handleCall(this._model.create(modelObj));
  }
  async update(query, modelObj) {
    return this.handleCall(this._model.update(query, {$set: modelObj}));
  }
  async updateOne(query, modelObj) {
    return this.handleCall(this._model.findOneAndUpdate(query, {$set: modelObj}, {new: true}));
  }
  async updateById(id, modelObj) {
    return this.handleCall(this._model.findByIdAndUpdate(id, {$set: modelObj}));
  }
  async delete(query) {
    return await this.handleCall(this._model.remove(query));
  }
  async deleteOne(query) {
    return await this.handleCall(this._model.findOneAndRemove(query).toObject());
  }
  async deleteById(id) {
    return await this.handleCall(this._model.findByIdAndRemove(id).toObject());
  }
  async startTransaction() {
    return await {};
  }
  async commit() {
    return await {};
  }
}

module.exports = MongoGenericRepository;
