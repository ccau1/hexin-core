'use strict';

const path = require('path');
const chalk = require('chalk');

// THIS IS FOR SEEDING MONGO
module.exports = class Seeder {
	constructor() {
		this._dataArray = [];
		this._mongoose = null;
		this._connectFunction = () => true;
		this._models = [];
		this._clearAll = false;
		this._clearCollectionList = [];
		this._showLog = true;
		this._isEnabled = true;
		this._onlyPopulateEmptyCollection = false;
	}

	async init(cb) {
		if (!this._isEnabled) {
			return cb();
		}
		this.log('Seeder::init begins');

		// start connection (pre-load certain tasks)
		await this._connect(this._connectFunction);

		// load all models saved from addModel/addModels
		this._loadModels(this._models);

		// handle clearing of collections
		if (this._clearAll) {
			const allMongooseKeys = Object.keys(this._mongoose.models);
			// this.log('Seeder::clear all collections', allMongooseKeys);
			await this._clearCollections(allMongooseKeys);
		} else if (this._clearCollectionList.length > 0) {
			// this.log('Seeder::clearing collections...');
			await this._clearCollections(this._clearCollectionList);
		}
		// populate models with data set from addData/addDatas
		await this._populateModels(this._dataArray);
		this.log('Seeder::init completed');

		// seeding completed, callback
		cb();
	}

	async _clearCollections(modelNames) {
		// clear all documents from the collections listed in modelNames
		const clearTasks = modelNames.map(model => this._clearCollection(model));
		return Promise.all(clearTasks);
	}

	async _clearCollection(modelName) {
		// get the model in mongoose from the modelName
		const Model = this._mongoose.model(modelName);
		const me = this;

		// remove all items inside selected model
		return Model.remove({}, function(err) {
			if (err) {
				me.log(chalk.red('Error: ' + err.message));
				return;
			}
			me.log(modelName + 's collection cleared');
		});
	}

	async _populateModels(dataArray) {
		// for each item in the dataArray, populate model base on
		// dataArray[i].model and dataArray[i].documents
		for (let i = 0; i < dataArray.length; i++) {
			await this._populateModel(dataArray[i].model, dataArray[i].documents);
		}
	}

	async _populateModel(modelName, documents) {
		// get model from mongoose by modelName
		const Model = this._mongoose.model(modelName);

		// if only populate on empty collection, then exit function if docCount is bigger than 0
		if (this._onlyPopulateEmptyCollection) {
			const docCount = await Model.count();
			if (docCount > 0) {
				return;
			}
		}

		// for each document, add it to the model
		const errors = [];
		for (let i = 0; i < documents.length; i++) {
			try {
				await Model.create(documents[i]);
				this.log(
					'Successfully created document [' + i + '] of ' + modelName + ' model'
				);
			} catch (err) {
				this.log(
					chalk.red(
						'Error creating document [' + i + '] of ' + modelName + ' model'
					)
				);
				this.log(chalk.red('Error: ' + err.message));
				errors.push(err.message);
			}
		}
		if (errors.length) {
			let errMessage = errors.length + ' seeding items failed\n';
			errors.forEach(err => {
				errMessage += err + '\n';
			});
			throw new Error(errMessage);
		}
	}

	async _connect(fn) {
		return new Promise(resolve => {
			fn(mongoose => {
				this._mongoose = mongoose;
				this.log('Seeder::connection completed');
				return resolve();
			});
		});
	}

	_loadModels(models) {
		// Each model can either be a string (path) or a function
		// For each model, instantiate it
		models.forEach(model => {
			let modelFn = model;
			// if model is a string (path), get the function from filepath
			if (typeof model === 'string') {
				modelFn = require(path.resolve(model));
			}

			// instantiate model
			modelFn();
		});
		this.log('Seeder::model added: ', models);
	}

	log(msg) {
		if (this._showLog) {
			console.info(msg);
		}
	}

	showLog(showLog) {
		this._showLog = showLog;
		return this;
	}

	isEnabled(isEnabled) {
		this._isEnabled = isEnabled;
		return this;
	}

	clearCollections(collectionNames) {
		// set list of collectionNames to clear
		this._clearCollectionList = this._clearCollectionList.concat(
			collectionNames
		);
		return this;
	}

	clearCollection(collectionName) {
		// set a collectionName to clear
		this._clearCollectionList.push(collectionName);
		return this;
	}

	clearAllCollections(isClear = true) {
		// set whether system should clear all collections
		this._clearAll = isClear;
		return this;
	}

	connection(fn) {
		// set connection function (pre-load)
		this._connectFunction = fn;
		return this;
	}

	addDatas(dataArrayList) {
		// add data to this._dataArray
		dataArrayList.forEach(dataArray => this.addData(dataArray));
		return this;
	}
	addData(dataArray) {
		// add data to this._dataArray
		// if dataArray is a string (path), get array from filepath
		let finalDataArray = dataArray;
		if (typeof dataArray === 'string') {
			finalDataArray = require(path.resolve(dataArray));
		}
		// concat incoming data array to this._dataArray
		this._dataArray = this._dataArray.concat(finalDataArray);
		return this;
	}

	onlyPopulateEmptyCollection() {
		this._onlyPopulateEmptyCollection = true;
		return this;
	}

	registerModels(models) {
		// concat list of models to this._models
		this._models = this._models.concat(models);
		return this;
	}

	registerModel(model) {
		// add model to this._models
		this._models.push(model);
		return this;
	}
};
