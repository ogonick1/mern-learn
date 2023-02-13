const { errorCodes } = require('../error-codes');
const { NotFoundError, BusinessLogicError } = require('../index');

function throwCarModelNotFound(id) {
  throw new NotFoundError({
    errorCode: errorCodes.CAR_MODEL_NOT_FOUND,
    message: `Car Model with id ${id} was not found`,
    details: {
      id,
    },
  });
}
function throwCarModelNotInclude(field) {
  throw new BusinessLogicError({
    errorCode: errorCodes.CAR_MODEL_NOT_INCLUDE,
    message: `The car model does not include ${field}`,
    details: {
      field,
    },
  });
}

function throwCarModelNamePerBrandNotUnique({ name, brandId }) {
  throw new BusinessLogicError({
    errorCode: errorCodes.CAR_MODEL_NAME_MUST_BE_UNIQUE_PER_BRAND,
    message: 'Card Model name must be unique per Brand',
    details: {
      name,
      brandId,
    },
  });
}

module.exports = {
  throwCarModelNotFound,
  throwCarModelNamePerBrandNotUnique,
  throwCarModelNotInclude,
};
