'use strict';

const iRepository = require('./iRepository');

class SequelizeGenericRepository extends iRepository {
	constructor(model, context) {
		super();
		this._model = model;
		this._context = context;
		this._transaction = context.transaction;
	}

	async preCall() {
		return await true;
	}

	async find(query) {
		await this.preCall();
		return await this._model.findAll({ where: query });
	}
	async findOne(query) {
		await this.preCall();
		return await this._model.findOne({ where: query });
	}
	async findById(id) {
		await this.preCall();
		return await this._model.findById(id);
	}
	async create(modelObj) {
		await this.preCall();
		return await this._model.create(modelObj, {
			transaction: this._transaction
		});
	}
	async update(query, modelObj) {
		await this.preCall();
		return await this._model.update(modelObj, {
			where: query,
			transaction: this._transaction
		});
	}
	async updateOne(query, modelObj) {
		await this.preCall();
		return await this._model.update(modelObj, {
			where: query,
			limit: 1,
			transaction: this._transaction
		});
	}
	async updateById(id, modelObj) {
		await this.preCall();
		// TODO:: is default id 'id' or '_id'?
		return await this._model.update(modelObj, {
			where: { id },
			limit: 1,
			transaction: this._transaction
		});
	}
	async delete(query) {
		await this.preCall();
		return await this._model.destroy({
			where: query,
			transaction: this._transaction
		});
	}
	async deleteOne(query) {
		await this.preCall();
		return await this._model.destroy({
			where: query,
			limit: 1,
			transaction: this._transaction
		});
	}
	async deleteById(id) {
		await this.preCall();
		// TODO:: is default id 'id' or '_id'?
		return await this._model.destroy({
			where: { id },
			limit: 1,
			transaction: this._transaction
		});
	}

	async commit() {
		await this.context.commit();
	}
}

module.exports = SequelizeGenericRepository;
