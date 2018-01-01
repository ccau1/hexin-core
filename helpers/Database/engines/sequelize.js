'use strict';

const Sequelize = require('sequelize');

/**
 * mongo db engine
 * @param configs					configs of db
 * @param configs.hosts				db hosts array
 * @param configs.replicaSet		replicaSet option (if any)
 * @param configs.database		    database name
 */
module.exports = async configs => {
	const sequelize = new Sequelize(
		configs.database,
		configs.user,
		configs.pass,
		configs.configs
	);

	sequelize
		.authenticate()
		.then(() => {
			console.log('Sequelize connection has been established successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});

	return await sequelize;
};
