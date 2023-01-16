const { errorCodes } = require('../error-codes');
const { NotFoundError } = require('../index');

function throwCarBrandNotFound(id) {
  throw new NotFoundError({
    errorCode: errorCodes.CAR_BRAND_NOT_FOUND,
    message: `Car Brand with id ${id} was not found`,
    details: {
      id,
    },
  });
}

module.exports = {
  throwCarBrandNotFound,
};
