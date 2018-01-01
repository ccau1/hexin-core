const Logger = require('../../helpers/Logger');
const AppStartConfig = require('../AppStartConfig');

module.exports = class LoggerConfig extends AppStartConfig {
	_init(next, appConfig) {
		const { router } = appConfig;

		Logger.init(process.env.NODE_ENV);

		router.use(this.middleware);
		next();
	}

	middleware(req, res, next) {
		req.log = Logger.print;
		next();
	}
};
