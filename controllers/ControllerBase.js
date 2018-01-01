const express = require('express');
const yields = require('express-yields');

module.exports = class ControllerBase {
	constructor(app, controllerName = '', service = undefined) {
		this.a = this.app = app;
		this.r = this.router = express.Router({ mergeParams: true });
		this.controllerName = controllerName;
		app.use('/' + controllerName, this.r);

		if (service) {
			this.r.all(
				'*',
				function(req, res, next) {
					req.controller = this;
					req.m = new service(req);
					next();
				}.bind(this)
			);
		}
		// call custom api calls made in controller specific level
		this.renderRoutes(this.r);
	}

	authenticate(req, res, next) {
		if (req.currentUser) {
			return next();
		}
		return res.status(401).json({ message: 'Unauthorized' });
	}

	authorize(req_, res_, next_) {
		// if its called as middleware, just call authenticate
		if (req_ && typeof req_ !== 'string') {
			return this.authenticate(req_, res_, next_);
		}
		const _arguments = [].slice.apply(arguments);
		return function(req, res, next) {
			if (req.currentUser) {
				if (!_arguments.length) return next();
				if (req.currentUser.roles) {
					const matchedRoles = _arguments.filter(
						role => req.currentUser.roles.indexOf(role) > -1
					);
					if (matchedRoles.length) {
						return next();
					}
				}
				return res.status(403).json({ message: 'Forbidden' });
			}
			return res.status(401).json({ message: 'Unauthorized' });
		};
	}

	authorizeCurrentUser(req, res, next) {
		if (!req.currentUser) {
			return res.status(401).json({ message: 'Unauthorized' });
		} else if (req.params._id.toString() !== req.currentUser._id.toString()) {
			return res.status(403).json({ message: 'Forbidden' });
		} else {
			next();
		}
	}

	authorizeStatus(req_, res_, next_) {
		const defaultStatusCutOff = 1;

		if (typeof req_ === 'object' && !Array.isArray(req_)) {
			const currentUser = req_.currentUser || req_.session.passport.user;
			const { t } = req_.locale;
			if (currentUser && currentUser.status >= defaultStatusCutOff) {
				next_();
			} else {
				throw new ValidationError({
					_error: [t('err_user_status_invalid', [defaultStatusCutOff])]
				});
			}
		} else {
			return (req, res, next) => {
				const { t } = req.locale;
				const currentUser = req.currentUser || req.session.passport.user;
				if (!currentUser) {
					throw new ValidationError({ _error: [t('err_user_status_invalid')] });
				}
				if (Array.isArray(req_) && req_.indexOf(currentUser.status) > -1) {
					next();
				} else if (Number.isInteger(req_) && currentUser.status >= req_) {
					next();
				} else if (!req_ && currentUser.status >= defaultStatusCutOff) {
					next();
				} else {
					throw new ValidationError({ _error: [t('err_user_status_invalid')] });
				}
			};
		}
	}

	renderRoutes(router) {
		console.warn(
			'## Controller "' +
				this.controllerName +
				'" should override method renderRoutes(routes)'
		);
	}

	/**
	 * Check if verb is within the verb listen
	 */
	isVerb(verb, inVerbList) {
		if (!inVerbList) return false;
		if (!Array.isArray(inVerbList)) {
			inVerbList = inVerbList.split('|');
		}
		inVerbList = inVerbList.map(v => v.toLowerCase());
		return inVerbList.indexOf(verb.toLowerCase()) !== -1;
	}
};
