'use strict';

module.exports.connection = {};

module.exports.init = (name, config) => {
  const connection = module.exports.connection;
  connection[name] = require('./engines/' + config.engine)(config.connection);
  if (!connection.default || config.default) {
    connection.default = connection[name];
  }
};

module.exports.getConnection = (name) => {
  const connection = module.exports.connection;
  return connection[name] || connection.default;
};
