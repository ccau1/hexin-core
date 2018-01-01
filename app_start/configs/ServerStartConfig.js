const AppStartConfig = require('../AppStartConfig');

module.exports = class ServerStartConfig extends AppStartConfig {
	_init(next, appConfig) {
		const { server, port, title } = appConfig;

		const appPort = process.env.PORT || port || 8280;

		// START THE SERVER
		server.listen(appPort);
		console.info(`Create ${title} server on port ${appPort}`);
		next();
	}
};
