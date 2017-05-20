'use strict';

const AppStartConfig = require('../AppStartConfig');
const Mailer = require('../../helpers/Mailer');

module.exports = class MailerConfig extends AppStartConfig {
  init(appConfig) {
    this._init(appConfig);
  }

  _init(appConfig) {
    const {mail} = appConfig;

    Mailer.connect(mail);
  }
  _preInit(appConfig) { }
  _postInit(appConfig) { }
};
