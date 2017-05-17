'use strict';

function HandleError(message, status) {
  this.message = message;
  this.status = status;
  this.stack = ` Error Message: ${typeof message === 'object' ? JSON.stringify(message) : message} \n ${(new Error(message)).stack}`;
}

module.exports = HandleError;

// module.exports.formatMongooseErrors = (errors) => {
//   return Object.keys(errors).map(errorField => {
//     return {field: errorField, validation: errors[errorField].kind, message: errors[errorField].message};
//   });
// };

module.exports.formatIndicativeErrors = (errors) => {
  let returnErrors = {};
  errors.forEach(err => {
    returnErrors[err.field] = err.message;
  });
  return returnErrors;
};

module.exports.ErrorMessage = () => {
  this.errors = {
    _error: [],
  };
  this.push = (error, field) => {
    if (!field) {
      this.errors._error.push(error);
    } else {
      this.errors[field] = error;
    }
  };
  this.pop = (field) => {
    if (!field) {
      return this.errors._error.pop();
    } else {
      const deletedField = this.errors[field];
      delete this.errors[field];
      return deletedField;
    }
  };
};
