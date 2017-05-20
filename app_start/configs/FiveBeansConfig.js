'use strict';

const AppStartConfig = require('../AppStartConfig');
const FiveBeans = require('../../helpers/FiveBeans');

module.exports = class FiveBeansConfig extends AppStartConfig {
  init(appConfig) {
    this._init(appConfig);
  }

  _init(appConfig) {
    const {beanstalkd} = appConfig;

    /*
      appConfig Prerequisite

      "beanstalkd": {
     	  "host": "127.0.0.1",
       	"port": 11300
      },
    */

    FiveBeans.connect(beanstalkd, function (err) {
      if (err) {
        console.warn('Fail to connect to beanstalk server.');
        process.exit(1);
      }
    });
  }
  _preInit(appConfig) { }
  _postInit(appConfig) { }
};
