'use strict';

const AppStartConfig = require('../AppStartConfig');
const FiveBeans = require('../../helpers/FiveBeans');

module.exports = class FiveBeansConfig extends AppStartConfig {
  init(next, appConfig) {
    this._init(next, appConfig);
  }

  _init(appConfig) {
    const {fivebeans} = appConfig;

    /*
      appConfig Prerequisite

      "fivebeans": {
     	  "host": "127.0.0.1",
       	"port": 11300
      },
    */

    FiveBeans.connect(fivebeans, function (err) {
      if (err) {
        console.warn('Fail to connect to beanstalk server.');
        process.exit(1);
      }
      next();
    });
  }
  _preInit(next, appConfig) { }
  _postInit(next, appConfig) { }
};
