'use strict';

const express = require('express');


module.exports = class ControllerBase {
  constructor(app, controllerName = '', service = undefined) {
    this.a = this.app = app;
    this.r = this.router = express();
    this.controllerName = controllerName;
    app.use('/' + controllerName, this.r);

    if (service) {
      this.r.all('*', function (req, res, next) {
        req.m = new service(req);
        next();
      });
    }
    // call custom api calls made in controller specific level
    this.renderRoutes(this.r);
  }

  authenticate(req, res, next) {
    if (req.current_user) {
      return next();
    }
    return res.status(401).json({message: 'Unauthorized'});
  }

  authorize(req_, res_, next_) {
    // if its called as middleware, just call authenticate
    if (req_ && typeof req_ !== 'string') {
      return this.authenticate(req_, res_, next_);
    }
    const _arguments = [].slice.apply(arguments);
    return function (req, res, next) {
      if (req.current_user) {
        if (!_arguments.length) return next();
        if (req.current_user.roles) {
          const matchedRoles = _arguments.filter(role => req.current_user.roles.indexOf(role) > -1);
          if (matchedRoles.length) {
            return next();
          }
        }
        return res.status(403).json({message: 'Forbidden'});
      }
      return res.status(401).json({message: 'Unauthorized'});
    };
  }

  renderRoutes(routes) {
    console.warn('## Controller "' + this.controllerName + '" should override method renderRoutes(routes)');
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
