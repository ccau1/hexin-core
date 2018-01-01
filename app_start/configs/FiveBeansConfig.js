const AppStartConfig = require('../AppStartConfig');
const FiveBeans = require('../../helpers/FiveBeans');

module.exports = class FiveBeansConfig extends AppStartConfig {
	_init(next, appConfig) {
		const { fivebeans } = appConfig;

		FiveBeans.connect(fivebeans, err => {
			if (err) {
				console.warn('Fail to connect to beanstalk server.');
				process.exit(1);
			}
			next();
		});
	}
};
