'use strict';

const AppStartConfig = require('../AppStartConfig');
const Mailer = require('../../helpers/Mailer');

module.exports = class MailerConfig extends AppStartConfig {
  _init(next, appConfig) {
    const {mail} = appConfig;

    Mailer.connect(mail);
    next();
  }
  _preInit(next, appConfig) { }
  _postInit(next, appConfig) { }
};
