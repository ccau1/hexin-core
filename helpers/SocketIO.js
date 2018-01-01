'use strict';

const socketIO = require('socket.io');

class SocketIO {}

SocketIO.client = null;

SocketIO.users = {};

SocketIO.connect = function(server) {
	module.exports.client = socketIO.listen(server);
};

module.exports = SocketIO;
