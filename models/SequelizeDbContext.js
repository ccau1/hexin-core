'use strict';

const DbContext = require('./DbContext');

class SequelizeDbContext extends DbContext {
  constructor(connection) {
    super();
    this._connection = connection;
  }

  async init() {
    return this._init();
  }

  async _init() {
    return await this.startTransaction();
  }

  get transaction() {
    return this._transaction;
  }

  async startTransaction() {
    return await new Promise((resolve, reject) => {
      this._connection.transaction(transaction => {
        resolve(transaction);
        return new Promise((rs, rj) => {
          this._transaction = Object.assign({},
            transaction,
            {
              commit: () => {
                rs();
              },
              rollback: () => {
                rj();
              }
            }
          );
        })
        .catch(err => {
          throw err;
        });
      }).catch(err => {
        throw err;
      });
    });
  }

  async commit(allowRestart = true) {
    await this._transaction.commit();
    if (allowRestart) {
      await this.startTransaction();
    }
  }
}

module.exports = SequelizeDbContext;
