const { validationResult } = require('express-validator');
const { errorCodes } = require('../errors/error-codes');
const { BadRequestError } = require('../errors');

const validatorErrorHandlerMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError({
      errorCode: errorCodes.VALIDATION_ERROR,
      message: 'Validation error',
      details: {
        errors: errors.array(),
      },
    });
  } else {
    next();
  }
};

module.exports = {
  validatorErrorHandlerMiddleware,
};
