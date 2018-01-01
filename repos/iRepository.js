'use strict';

class RepositoryInterface {
	constructor() {
		this.modelName = '_Model';
	}

	// Return: obj array
	async find(query) {
		throw new Error("Repo method 'find(query)' needs to be implemented");
	}
	// Return: obj
	async findOne(query) {
		throw new Error("Repo method 'findOne(query)' needs to be implemented");
	}
	// Return: obj
	async findById(id) {
		throw new Error("Repo method 'findById(id)' needs to be implemented");
	}
	// Return: created obj
	async create(modelObj) {
		throw new Error("Repo method 'create(modelObj)' needs to be implemented");
	}
	// Return: updated row count
	async update(query, modelObj) {
		throw new Error(
			"Repo method 'update(query, modelObj)' needs to be implemented"
		);
	}
	// Return: updated obj
	async updateOne(query, modelObj) {
		throw new Error(
			"Repo method 'updateOne(query, modelObj)' needs to be implemented"
		);
	}
	// Return: updated obj
	async updateById(id, modelObj) {
		throw new Error(
			"Repo method 'updateById(id, modelObj)' needs to be implemented"
		);
	}
	// Return: deleted row count
	async delete(query) {
		throw new Error("Repo method 'delete(query)' needs to be implemented");
	}
	// Return: deleted obj
	async deleteOne(query) {
		throw new Error("Repo method 'deleteOne(query)' needs to be implemented");
	}
	// Return: deleted obj
	async deleteById(id) {
		throw new Error("Repo method 'deleteById(id)' needs to be implemented");
	}
	async startTransaction() {
		throw new Error("Repo method 'startTransaction()' needs to be implemented");
	}
	async commit() {
		throw new Error("Repo method 'saveChanges()' needs to be implemented");
	}
}

module.exports = RepositoryInterface;
