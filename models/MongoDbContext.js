'use strict';

const DbContext = require('./DbContext');

class MongoDbContext extends DbContext {
	constructor(connection) {
		super();
		this._connection = connection;
	}

	async init() {
		return true;
	}

	get transaction() {
		return this._transaction;
	}

	commit() {
		return null;
	}
}

module.exports = MongoDbContext;
