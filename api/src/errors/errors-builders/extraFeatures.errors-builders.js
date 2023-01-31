const { errorCodes } = require('../error-codes');
const { NotFoundError, BusinessLogicError } = require('../index');

function throwExtraFeaturesNotFound(ids) {
  throw new NotFoundError({
    errorCode: errorCodes.CAR_MODEL_NOT_FOUND,
    message: `Extra Features with ids ${(ids || []).join(',')} were not found`,
    details: {
      ids,
    },
  });
}

function throwExtraFeatureNotUnic(title) {
  throw new BusinessLogicError({
    errorCode: errorCodes.EXTRA_FEATURE_NAME_NOT_UNIQUE,
    message: `Extra Feature with name ${title} alredy exist`,
    details: {
      title,
    },
  });
}

module.exports = {
  throwExtraFeaturesNotFound,
  throwExtraFeatureNotUnic,
};
