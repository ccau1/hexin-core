function HttpResponseError(status, message) {
  this.name = 'HttpResponseError';
  this.status = status;
  this.message = message || Object.keys(HttpStatusCode).find(key => HttpStatusCode[key] === status) || 'Internal Server Error';
  this.stack = (new Error()).stack;
}
HttpResponseError.prototype = Object.create(Error.prototype);
HttpResponseError.prototype.constructor = HttpResponseError;

function ValidationError(message) {
  this.name = 'ValidationError';
  this.status = HttpStatusCode.BAD_REQUEST;
  if (Array.isArray(message)) {
    this.message = {};
    errors.forEach(err => {
      message[err.field] = err.message;
    });
  } else if (typeof message === 'string') {
    this.message = {_error: [message]};
  } else {
    this.message = message;
  }

  this.stack = (new Error()).stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  MOVED_PERMANENTLY: 301,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502
}

// module.exports.ErrorMsg = {
//   OK: new ErrorMsgClass('OK', 200),
//   CREATED: new ErrorMsgClass('CREATED', 201),
//   ACCEPTED: new ErrorMsgClass('ACCEPTED', 202),
//   NO_CONTENT: new ErrorMsgClass('NO_CONTENT', 204),
//   MOVED_PERMANENTLY: new ErrorMsgClass('MOVED_PERMANENTLY', 301),
//   NOT_MODIFIED: new ErrorMsgClass('NOT_MODIFIED', 304),
//   TEMPORARY_REDIRECT: new ErrorMsgClass('TEMPORARY_REDIRECT', 307),
//   PERMANENT_REDIRECT: new ErrorMsgClass('PERMANENT_REDIRECT', 308),
//   BAD_REQUEST: new ErrorMsgClass('BAD_REQUEST', 400),
//   UNAUTHORIZED: new ErrorMsgClass('UNAUTHORIZED', 401),
//   PAYMENT_REQUIRED: new ErrorMsgClass('PAYMENT_REQUIRED', 402),
//   UNAUTHORIZED: new ErrorMsgClass('UNAUTHORIZED', 401),
//   UNAUTHORIZED: new ErrorMsgClass('UNAUTHORIZED', 401),
//   PERMANENT_REDIRECT: new ErrorMsgClass('PERMANENT_REDIRECT', 308),
//   NOT_FOUND: new ErrorMsgClass('not found', 404),
// }


module.exports = {
  setGlobal: () => {
    global.HttpResponseError = HttpResponseError;
    global.ValidationError = ValidationError;
    global.HttpStatusCode = HttpStatusCode;
  }
};
module.exports.HttpResponseError = HttpResponseError;
module.exports.ValidationError = ValidationError;
module.exports.HttpStatusCode = HttpStatusCode;
