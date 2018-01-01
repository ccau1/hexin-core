const express = require('express');
const http = require('http');

module.exports = class AppStart {
	static get HANDLE_LIST_BEGINNING() {
		return true;
	}
	static get HANDLE_LIST_END() {
		return false;
	}

	constructor(appConfig) {
		//  set config
		this.appConfig = Object.assign(this.getBaseConfig(), appConfig);
		this.setConfig(this.appConfig);

		this.handleList = [];
		this.setHandlers(this.appConfig);
		this.setBaseHandlers(this.appConfig);
	}

	getBaseConfig() {
		const app = express();
		return {
			app,
			server: http.Server(app),
			router: express(),
			baseAppStart: {
				disable: false
			}
		};
	}

	setBaseHandlers(appConfig) {
		if (appConfig.baseAppStart.disable) {
			return false;
		}

		return true;
	}

	setConfig(appConfig) {
		throw new ReferenceError('AppStart must override setConfig(appConfig)');
	}

	setHandlers(appConfig) {
		throw new ReferenceError('AppStart must override setHandler(appConfig)');
	}

	handle(handle, addToBeginning = false) {
		if (addToBeginning) {
			this.handleList.unshift(handle);
		} else {
			this.handleList.push(handle);
		}
	}

	async init() {
		try {
			await this.doInit(this.appConfig, 'preInit');
			await this.doInit(this.appConfig, 'init').catch(err => {
				throw err;
			});
			await this.doInit(this.appConfig, 'postInit');
		} catch (err) {
			throw err;
		}
	}

	async doInit(appConfig, methodName, index = 0) {
		if (!this.handleList[index]) {
			return true;
		}

		return new Promise(async (resolve, reject) => {
			const initResultHandler = async err => {
				if (err) {
					return reject(err);
				}
				return this.doInit(appConfig, methodName, ++index)
					.then(result => resolve(result))
					.catch(doInitErr => {
						reject(doInitErr);
					});
			};

			this.handleList[index][methodName](initResultHandler, appConfig);
		});
	}
};
