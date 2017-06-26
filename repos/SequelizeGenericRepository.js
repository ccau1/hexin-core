'use strict';

const iRepository = require('./iRepository');

class SequelizeGenericRepository extends iRepository {
  constructor(connection, model) {
    super();
    this._model = model;
    this._connection = connection;
    this._transaction = null;
    this.startTransaction();
  }

  async find(query) {
    return await this._model.findAll({where: query});
  }
  async findOne(query) {
    return await this._model.findOne({where: query});
  }
  async findById(id) {
    return await this._model.findById(id);
  }
  async create(modelObj) {
    return await this._model.create(modelObj, {transaction: this._transaction});
  }
  async update(query, modelObj) {
    return await this._model.update(modelObj, {where: query, transaction: this._transaction});
  }
  async updateOne(query, modelObj) {
    return await this._model.update(modelObj, {where: query, limit: 1, transaction: this._transaction});
  }
  async updateById(id, modelObj) {
    // TODO:: is default id 'id' or '_id'?
    return await this._model.update(modelObj, {where: {id}, limit: 1, transaction: this._transaction});
  }
  async delete(query) {
    return await this._model.destroy({where: query, transaction: this._transaction});
  }
  async deleteOne(query) {
    return await this._model.destroy({where: query, limit: 1, transaction: this._transaction});
  }
  async deleteById(id) {
    // TODO:: is default id 'id' or '_id'?
    return await this._model.destroy({where: {id}, limit: 1, transaction: this._transaction});
  }

  async startTransaction() {
    return this._transaction || new Promise((resolve, reject) => {
      this._connection.transaction(transaction => {
      // your transactions
        this._transaction = transaction;
        resolve(transaction);
      }).then(result => {
        // transaction has been committed. Do something after the commit if required.
      }).catch(err => {
        // do something with the err.
        reject(new Error(err));
      });
    });
  }

  async commit() {
    await this._transaction.commit();
    this._transaction = null;
    this.startTransaction();
  }
}

module.exports = SequelizeGenericRepository;
