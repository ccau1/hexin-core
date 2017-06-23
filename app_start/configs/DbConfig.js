'use strict';

const AppStartConfig = require('../AppStartConfig');
const Database = require('../../helpers/Database');

module.exports = class DbConfig extends AppStartConfig {
  preInit(appConfig) {
    const appDbNames = Object.keys(appConfig.db);
    if (appDbNames.length) {
      appDbNames.forEach(dbName => {
        Database.init(dbName, appConfig.db[dbName]);
      });

      // if no defaults were set, set it to the first appDbName
      if (!Database.getConnection()) {
        Database.setDefault(appDbNames[0]);
      }
    }
  }
};
