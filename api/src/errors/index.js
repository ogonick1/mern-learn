/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
const { errorCodes } = require('./error-codes');

class GeneralError extends Error {
  constructor({
    errorCode = errorCodes.DEFAULT,
    message = undefined,
    details = undefined,
  }) {
    super();
    this.message = message || errorCode.message;
    this.errorCode = errorCode.code;
    this.details = details || '';
  }

  getCode() {
    if (this instanceof BadRequestError || this instanceof BusinessLogicError) {
      return 400;
    }
    if (this instanceof NotFoundError) {
      return 404;
    }
    if (this instanceof DbError) {
      return 500;
    }
    return 500;
  }
}

class ApiError extends GeneralError {
  constructor(message = '', errorCode = errorCodes.DEFAULT, errorDetails = '') {
    super(message, errorCode, errorDetails);
  }
}
class DbError extends GeneralError {
  constructor(message, details, innerError, errorCode = errorCodes.db.DB_ERROR) {
    super(errorCode, message, details, innerError);
  }
}
class BadRequestError extends GeneralError { }
class NotFoundError extends GeneralError { }
class BusinessLogicError extends GeneralError { }

module.exports = {
  GeneralError,
  ApiError,
  DbError,
  BadRequestError,
  NotFoundError,
  BusinessLogicError,
};
