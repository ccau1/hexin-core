module.exports = class AppStartConfig {
	constructor(appConfig) {
		this.appConfig = appConfig;
	}

	preInit(next, appConfig) {
		this._preInit(next, appConfig);
	}

	init(next, appConfig) {
		this._init(next, appConfig);
	}

	postInit(next, appConfig) {
		this._postInit(next, appConfig);
	}

	// for core predefined calls
	_preInit(next, appConfig) {
		next();
	}
	_init(next, appConfig) {
		next();
	}
	_postInit(next, appConfig) {
		next();
	}
};
