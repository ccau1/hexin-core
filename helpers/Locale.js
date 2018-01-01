'use strict';

const requireDir = require('require-dir');

module.exports = class Locale {
	constructor(config = {}) {
		this.setConfig(config);

		// TODO::better way to bind this? arrow function throws error
		this.getLanguage = this.getLanguage.bind(this);
		this.setCurrentLanguage = this.setCurrentLanguage.bind(this);
		this.sanitizeCode = this.sanitizeCode.bind(this);
		this.isValidLanguageCode = this.isValidLanguageCode.bind(this);
		this.setConfig = this.setConfig.bind(this);
		this.t = this.t.bind(this);
		this.translate = this.translate.bind(this);
		this.stringFormat = this.stringFormat.bind(this);
	}

	getLanguage() {
		return this.currentLanguage;
	}

	setCurrentLanguage(lang) {
		// TODO:: probably should throw error instead of return boolean
		if (this.isValidLanguageCode(lang)) {
			this.currentLanguage = this.sanitizeCode(lang);
			return true;
		} else {
			return false;
		}
	}

	sanitizeCode(code) {
		const { accept } = this.config;

		if (accept[code]) {
			return code;
		} else {
			return Object.keys(accept).find(
				langKey => accept[langKey].indexOf(code) > -1
			);
		}
	}

	isValidLanguageCode(code) {
		const { accept } = this.config;

		return (
			Boolean(accept[code]) ||
			Object.keys(accept).find(
				langKey => accept[langKey].indexOf(code) > -1
			) !== null
		);
	}

	setConfig(config) {
		this.config = Object.assign({}, this.config, config);
		if (!this.currentLanguage) {
			this.currentLanguage = this.config.default;
		}
		if (this.config.sources) {
			// source could be one of the following: string, object, array (of string or object)
			const { sources } = this.config;
			if (Array.isArray(sources)) {
				let result = {};
				sources.forEach(source => {
					if (typeof source === 'object') {
						Object.keys(source).forEach(oKey => {
							result[oKey] = Object.assign({}, result[oKey], source[oKey]);
						});
					} else if (typeof source === 'string') {
						const obj = requireDir(source, { recurse: true });
						Object.keys(obj).forEach(oKey => {
							result[oKey] = Object.assign({}, result[oKey], obj[oKey]);
						});
					} else {
						throw new Error('invalid locale sources');
					}
				});
				this.sources = result;
			} else if (typeof sources === 'object') {
				this.sources = sources;
			} else if (typeof sources === 'string') {
				this.sources = requireDir(this.config.path, { recurse: true });
			} else {
				throw new Error('invalid locale sources');
			}
		}
	}

	t(word, args, l) {
		return this.translate(
			l || this.currentLanguage || this.config.default,
			word,
			args
		);
	}

	translate(lang, word, args = []) {
		return this.stringFormat(this.sources[lang][word] || word, args);
	}

	stringFormat(string, args = []) {
		return string.replace(/(\{\d+\})/g, function(a) {
			return args[Number(a.substr(1, a.length - 2)) || 0];
		});
	}
};

// String.prototype.format = function () {
//   let args = [].slice.call(arguments);
//   return this.replace(/(\{\d+\})/g, function (a) {
//     return args[Number(a.substr(1, a.length - 2)) || 0];
//   });
// };
