'use strict';

const restler = require('restler');

const Request = (module.exports = class Request {
	constructor(req, url, opt) {
		return Request.fetch(req, url, opt);
	}
});

module.exports.get = (req, url, opt) => {
	const newOpt = Object.assign({}, opt, { method: 'GET' });
	Request.request(req, url, newOpt);
};

module.exports.put = (req, url, opt) => {
	const newOpt = Object.assign({}, opt, { method: 'PUT' });
	Request.request(req, url, newOpt);
};

module.exports.post = (req, url, opt) => {
	const newOpt = Object.assign({}, opt, { method: 'POST' });
	Request.request(req, url, newOpt);
};

module.exports.delete = (req, url, opt) => {
	const newOpt = Object.assign({}, opt, { method: 'DELETE' });
	Request.request(req, url, newOpt);
};

module.exports.fetch = (req, url, opt) => {
	return new Promise((resolve, reject) => {
		if (!opt.headers) {
			opt.headers = {
				'Accept-Language': req.lang,
				'X-Forwarded-For':
					req.headers['x-forwarded-for'] ||
					req.connection.remoteAddress ||
					req.socket.remoteAddress ||
					req.connection.socket.remoteAddress
			};
		}
		if (
			!opt.headers['X-Request-ID'] ||
			!opt.headers['X-Client-Authorization']
		) {
			if (
				req.headers['x-request-id'] &&
				req.headers['x-client-authorization']
			) {
				opt.headers['X-Request-ID'] = req.headers['x-request-id'];
				opt.headers['X-Client-Authorization'] =
					req.headers['x-client-authorization'];
			}
		}
		if (req.headers.authorization) {
			opt.headers.authorization = req.headers.authorization;
		}
		if (opt.data) {
			opt.headers['Content-Type'] = 'application/json';
			opt.data = JSON.stringify(opt.data);
		}
		opt.timeout = 20000;
		restler
			.request(url, opt)
			.on('complete', (result, response) => {
				if (result instanceof Error) {
					if (result.code === 'ECONNREFUSED') {
						return reject(new Error('Service Unavailable'));
					}
					return reject(result);
				}
				if (
					response.headers['content-type'] &&
					response.headers['content-type'].split(';')[0] === 'application/json'
				) {
					result = result && JSON.parse(result);
				}
				response.result = result;
				return resolve(response);
			})
			.on('abort', () => {
				return reject(new Error('request::abort'));
			})
			.on('timeout', ms => {
				return reject(new Error('request::timeout'));
			});
	});
};
