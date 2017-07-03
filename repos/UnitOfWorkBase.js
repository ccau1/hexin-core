'use strict';

class UnitOfWorkBase {
  constructor(context) {
    this._context = context;
  }

  get context() {
    return this._context;
  }

  async init() {
    return await this.context.init();
  }
}

module.exports = UnitOfWorkBase;
