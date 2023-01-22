const { BadRequestError } = require('../index');
const { errorCodes } = require('../error-codes');

function throwAuthError() {
  throw new BadRequestError({
    errorCode: errorCodes.LOGIN_ERROR,
    message: 'Invalid email or password try again',
    details: {},
  });
}

function throwEmailReady() {
  throw new BadRequestError({
    message: 'Email already registered',
    errorCode: errorCodes.EMAIL_ALREADY_EXISTED,
  });
}
module.exports = {
  throwAuthError,
  throwEmailReady,
};
