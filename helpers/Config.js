'use strict';

const path = require('path');
const fs = require('fs');

module.exports.get = function(type, env) {
	if (!type) {
		throw new Error('Config.get:: type required');
	}
	if (!env) {
		throw new Error('Config.get:: env required');
	}

	let configFilePath =
		path.dirname(require.main.filename) + '/configs/base/' + env + '.json';

	if (!fs.existsSync(configFilePath)) {
		throw new Error('Config File was not found in PATH: ' + configFilePath);
	}

	return JSON.parse(fs.readFileSync(configFilePath, 'UTF-8'));
};
