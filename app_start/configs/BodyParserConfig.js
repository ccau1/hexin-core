'use strict';

const AppStartConfig = require('../AppStartConfig');
const bodyParser = require('body-parser');

module.exports = class BodyParserConfig extends AppStartConfig {
  _init(next, appConfig) {
    const {router} = appConfig;
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(bodyParser.json());
    next();
  }
};
