const AppStartConfig = require('../AppStartConfig');
const Redis = require('../../helpers/Redis');

module.exports = class RedisConfig extends AppStartConfig {
	_init(next, appConfig) {
		const { redis } = appConfig;

		Redis.connect(redis);
		next();
	}
};
