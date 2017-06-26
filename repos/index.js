'use strict';

const iRepository = require('./iRepository');
const MongoGenericRepository = require('./MongoGenericRepository');
const SequelizeGenericRepository = require('./SequelizeGenericRepository');

module.exports = {
  iRepository,
  MongoGenericRepository,
  SequelizeGenericRepository
};
