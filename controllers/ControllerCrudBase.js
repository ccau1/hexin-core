'use strict';

const co = require('co');
const ControllerBase = require('./ControllerBase');
const {HttpResponseError, HttpStatusCode} = require('../helpers/Error');

module.exports = class ControllerCrudBase extends ControllerBase {
  constructor(app, controllerName, service, middlewares = []) {
    super(app, controllerName, service);
    // set middlewares specifically for this class' crud methods
    this.middlewares = middlewares;
    // init base crud calls (will be overridden if specified in renderRoutes())
    this.initCrud(this.r);
  }

  /**
   * Handles base CRUD calls
   */
  initCrud(route) {
    const {middlewares} = this;
    /**
     * Create payment
     */
    route.post('/', middlewares, function* (req, res, next) {
      const {m} = req;
      const newModelObj = m.mapper('model')(req.body);
      const modelObjResult = yield m.create(newModelObj);

      return res.send(m.mapper()(modelObjResult));
    });

    /**
     * Get payments
     */
    route.get('/', middlewares, function* (req, res, next) {
      const {m} = req;
      const modelObjs = yield m.getAll();

      if (req.query.full !== undefined) {
        return res.send(modelObjs.map(modelObj => m.mapper('full')(modelObj)));
      } else if (req.query.list !== undefined) {
        return res.send(modelObjs.map(modelObj => m.mapper('list')(modelObj)));
      } else {
        return res.send(modelObjs.map(modelObj => m.mapper()(modelObj)));
      }
    });

    /**
     * Get payment by ID
     */
    route.get('/:_id/', middlewares, function* (req, res, next) {
      const {m} = req;
      const modelObj = yield m.getById(req.params._id);

      if (!modelObj) {
        throw new HttpResponseError(HttpStatusCode.NOT_FOUND);
      }

      return res.send(req.query.full !== undefined ? m.mapper('full')(modelObj) : m.mapper()(modelObj));
    });

    /**
     * Update payment
     */
    route.put('/:_id', middlewares, function* (req, res, next) {
      const {m} = req;
      const modelObj = m.mapper('model')(req.body);
      const updatedModelObj = yield m.update(req.params._id, modelObj);

      if (!updatedModelObj) {
        throw new HttpResponseError(HttpStatusCode.NOT_FOUND);
      }

      return res.send(m.mapper()(updatedModelObj));
    });

    /**
     * Remove payment
     */
    route.delete('/:_id', middlewares, function* (req, res, next) {
      const {m} = req;
      const deletedModelObj = yield m.delete(req.params._id);

      if (!deletedModelObj) {
        throw new HttpResponseError(HttpStatusCode.NOT_FOUND);
      }

      return res.send(m.mapper()(deletedModelObj));
    });
  }
};
