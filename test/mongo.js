'use strict';
const Database = require('../helpers/Database');

const config = {
	engine: "mongo",
	connection: {
		hosts: ["rds:27017"],
		database: "wttwe"
	},
	default: true
};

Database.init('main-db', config);