'use strict';

const mongoose = require('mongoose');
const { Admin } = mongoose.mongo;
const long = require('mongoose-long');
const autoIncrement = require('mongoose-auto-increment');

/**
 * mongo db engine
 * @param configs					configs of db
 * @param configs.hosts				db hosts array
 * @param configs.replicaSet		replicaSet option (if any)
 * @param configs.database		    database name
 */
module.exports = async configs => {
	return new Promise((resolve, reject) => {
		let options = { useMongoClient: true };

		// support replicaSet
		if (configs.replicaSet) {
			options.autoReconnect = false;
			options.poolSize = 5;
			options.connectTimeoutMS = 1000;
			options.keepAlive = 1;
		}

		if (configs.auth) {
			options.user = configs.auth.user;
			options.pass = configs.auth.pass;
			options.auth = { authdb: configs.auth.authdb || 'admin' };
		}

		let connectionString = `mongodb://${configs.hosts.join()}/${
			configs.database
		}`;
		if (configs.replicaSet) {
			connectionString += `?replicaSet=${configs.replicaSet}`;
		}

		console.log('connectionString is: %s', connectionString);

		let checkConnectionState = function() {
			console.log('db connection-state: ' + mongoose.connection.readyState);
			setTimeout(checkConnectionState, 5000);
		};

		mongoose.connect(connectionString, options, err => {
			if (err) {
				console.error('Fail Connect to mongodb. ' + err);
				reject(err);
				throw err;
			}
			new Admin(mongoose.connection.db).listDatabases(err2 => {
				if (err2) {
					console.error('Fail Connect to mongodb. ' + err2);
					throw err;
				}
				console.info('Connect to mongodb successfully.');
			});
			resolve(mongoose);
			// checkConnectionState();
		});

		// If the connection throws an error
		mongoose.connection.on('error', err => {
			console.error('Mongoose connection error: %', err);
		});

		let nthTime = 1;
		let delay = 10000;

		let reconnectDb = function() {
			nthTime++;
			console.info('Reconnect to mongodb...');
			// reconnect to db if disconnected
			if (mongoose.connection.readyState === 0) {
				return mongoose.connect(connectionString, options, err => {
					if (err) {
						console.error('Failed to reconnect to mongodb. %s', err);
					} else {
						console.info('Reconnect to mongodb successfully.');
					}
				});
			} else {
				console.info(
					'Reconnect to mongodb successfully. state = %s',
					mongoose.connection.readyState
				);
				return null;
			}
		};

		// When the connection is disconnected
		mongoose.connection.on('disconnected', function() {
			console.log('Mongoose connection disconnected.');
			// reconnect to mongodb
			if (nthTime === 1) {
				reconnectDb();
			} else {
				setTimeout(function() {
					reconnectDb();
				}, delay);
			}
		});

		// If the Node process ends, close the Mongoose connection
		process.on('SIGINT', function() {
			mongoose.connection.close(function() {
				console.log('Mongoose connection disconnected through app termination');
				process.exit(0);
			});
		});

		mongoose.long = long(mongoose);
		mongoose.autoIncrement = autoIncrement;
		mongoose.Promise = global.Promise;
	});
};
