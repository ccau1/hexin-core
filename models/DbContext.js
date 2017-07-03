'use strict';

class DbContext {

  commit() {
    throw new Error('Method \'commit()\' must be implemented');
  }
}

module.exports = DbContext;
