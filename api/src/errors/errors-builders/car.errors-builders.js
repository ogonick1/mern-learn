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

function throwCarPlateNumberNotUnique(plateNumber) {
  throw new BusinessLogicError({
    errorCode: errorCodes.CAR_PLATE_NUMBER_NOT_UNIQUE,
    message: 'Card Plate Number must be unique',
    details: {
      plateNumber,
    },
  });
}

module.exports = {
  throwCarNotFound,
  throwCarPlateNumberNotUnique,
};
