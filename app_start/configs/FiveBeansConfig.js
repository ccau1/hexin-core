'use strict';

const AppStartConfig = require('../AppStartConfig');
const FiveBeans = require('../../helpers/FiveBeans');

module.exports = class FiveBeansConfig extends AppStartConfig {
  _init(next, appConfig) {
    const {fivebeans} = appConfig;

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
