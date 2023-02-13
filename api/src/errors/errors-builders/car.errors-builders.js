const { errorCodes } = require('../error-codes');
const { NotFoundError, BusinessLogicError } = require('../index');

function throwCarNotFound(id) {
  throw new NotFoundError({
    errorCode: errorCodes.CAR_NOT_FOUND,
    message: `Car with id ${id} was not found`,
    details: {
      id,
    },
  });
}

function throwNotUnique(plateNumber) {
  throw new BusinessLogicError({
    errorCode: errorCodes.NOT_UNIQUE,
    message: `${plateNumber} must be unique`,
    details: {
      plateNumber,
    },
  });
}

module.exports = {
  throwCarNotFound,
  throwNotUnique,
};
