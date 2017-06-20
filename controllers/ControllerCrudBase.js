'use strict';

const co = require('co');
const ControllerBase = require('./ControllerBase');

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
    route.post('/', middlewares, (req, res, next) => {
      co(function* () {
        const {m} = req;
        const newModelObj = m.mapper('model')(req.body);
        const modelObjResult = yield m.create(newModelObj);
        return res.send(m.mapper()(modelObjResult));
      })
      .catch(error => {
        next(error);
      });
    });

    /**
     * Get payments
     */
    route.get('/', middlewares, (req, res, next) => {
      co(function* () {
        const {m} = req;
        const modelObjs = yield m.getAll();
        return res.send(req.query.full !== undefined ? modelObjs : modelObjs.map(modelObj => m.mapper()(modelObj)));
      })
      .catch(error => {
        next(error);
      });
    });

    /**
     * Get payment by ID
     */
    route.get('/:_id/', middlewares, (req, res, next) => {
      co(function* () {
        const {m} = req;
        const modelObj = yield m.getById(req.params._id);
        return res.send(req.query.full !== undefined ? modelObj : m.mapper()(modelObj));
      })
      .catch(error => {
        next(error);
      });
    });

    /**
     * Update payment
     */
    route.put('/:_id', middlewares, (req, res, next) => {
      co(function* () {
        const {m} = req;
        const modelObj = m.mapper('model')(req.body);
        const updatedModelObj = yield m.update(req.params._id, modelObj);
        return res.send(m.mapper()(updatedModelObj));
      })
      .catch(error => {
        next(error);
      });
    });

    /**
     * Remove payment
     */
    route.delete('/:_id', middlewares, (req, res, next) => {
      co(function* () {
        const {m} = req;
        const deletedModelObj = yield m.delete(req.params._id);
        return res.send(m.mapper()(deletedModelObj));
      })
      .catch(error => {
        next(error);
      });
    });
  }
};
