'use strict';

module.exports = class Token {

};

module.exports.generateToken = function () {
  return (Math.floor(1e16 * Math.random()).toString(16) + Math.floor(1e16 * Math.random()).toString(16) + '0'.repeat(10)).slice(0, 24);
};
