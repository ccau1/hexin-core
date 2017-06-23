'use strict';

const AppStartConfig = require('../AppStartConfig');

module.exports = class ServerStartConfig extends AppStartConfig {
  init() {
    const {app, port, title} = this.appConfig;

    const appPort = process.env.PORT || port || 8280;

    // START THE SERVER
    app.listen(appPort);
    console.info('Create ' + title + ' server on port ' + appPort);
  }
};
