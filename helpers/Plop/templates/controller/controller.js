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
  isVerb(verb, inVerbList)                    - Function that returns a boolean whether first arg is in second arg
*/


const {$1} = require('hexin-core');

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
