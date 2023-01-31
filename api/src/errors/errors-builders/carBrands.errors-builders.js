const { errorCodes } = require('../error-codes');
const { NotFoundError, BusinessLogicError } = require('../index');

function throwCarBrandNotFound(id) {
  throw new NotFoundError({
    errorCode: errorCodes.CAR_BRAND_NOT_FOUND,
    message: `Car Brand with id ${id} was not found`,
    details: {
      id,
    },
  });
}

function throwCarBrandUniqueName(name) {
  throw new BusinessLogicError({
    errorCode: errorCodes.CAR_BRAND_NAME_NOT_UNIQUE,
    message: `Car Brand with name ${name} already exist`,
    details: {
      name,
    },
  });
}

module.exports = {
  throwCarBrandNotFound,
  throwCarBrandUniqueName,
};
