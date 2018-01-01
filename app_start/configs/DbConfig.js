const AppStartConfig = require('../AppStartConfig');
const Database = require('../../helpers/Database');

module.exports = class DbConfig extends AppStartConfig {
	_preInit(next, appConfig) {
		const appDbNames = Object.keys(appConfig.db);

		const databaseInitCall = function(index = 0) {
			const dbName = appDbNames[index];
			if (!dbName) {
				// if no defaults were set, set it to the first appDbName
				if (!Database.getConnection()) {
					Database.setDefault(appDbNames[0]);
				}
				next();
			} else {
				Database.init(dbName, appConfig.db[dbName]).then(() => {
					databaseInitCall(++index);
				});
			}
		};
		databaseInitCall();
	}
};
