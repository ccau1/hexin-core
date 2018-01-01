'use strict';

/*

  Quick Note

  renderRoutes
  ---------------------------------------------------------------------------------------------------------------------
  this.authenticate                           - Middleware that checks if user is loggedin
                                                  - Usage:
                                                      - router.post('/', this.authenticate, (req, res, next) => {
  this.authorize(...roles)                    - Middleware that checks if user has any of the roles
                                                  - Usage:
                                                      - router.post('/', this.authorize, (req, res, next) => {
                                                      - router.post('/', this.authorize('user', 'admin'), (req, res, next) => {
  this.isVerb(verb, inVerbList)                    - Function that returns a boolean whether first arg is in second arg

  ControllerCrudBase includes the following routes
  ---------------------------------------------------------------------------------------------------------------------
  [GET] api/$3/                               - returns all available entries
  [GET] api/$3/:_id                           - returns entry by _id
  [POST] api/$3/                              - create new entry and return created entry
  [PUT] api/$3/:_id                           - update entry by _id. BODY: $2 Object
  [DELETE] api/$3/:_id                        - delete entry by _id

*/

const { $1 } = require('httpeace-node-core');

// Service
const $2Service = new require('../services/$2Service');

module.exports = class $2Controller extends $1 {
	constructor(app) {
		super(app, '$3', $2Service);
	}

	renderRoutes(router) {
		// TODO:: Implement routes
	}
};
