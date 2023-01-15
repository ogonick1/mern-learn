const { errorCodes } = require('../error-codes');
const { NotFoundError } = require('../index');

function throwExtraFeaturesNotFound(ids) {
  throw new NotFoundError({
    errorCode: errorCodes.CAR_MODEL_NOT_FOUND,
    message: `Extra Features with ids ${(ids || []).join(',')} were not found`,
    details: {
      ids,
    },
  });
}

module.exports = {
  throwExtraFeaturesNotFound,
};
