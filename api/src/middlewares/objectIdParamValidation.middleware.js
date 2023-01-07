const { errorCodes } = require('../errors/error-codes');
const { BadRequestError } = require('../errors');
const { isObjectId } = require('../validation/objectId.validation');

const objectIdParamValidationMiddleware = (paramName = 'id') => (req, res, next) => {
  const id = req.params[paramName];
  if (!isObjectId(id)) {
    throw new BadRequestError({
      errorCode: errorCodes.ID_PARAM_NOT_VALID_OBJECT_ID,
      message: 'Id param must be valid ObjectId',
      details: {
        id,
      },
    });
  } else {
    next();
  }
};

module.exports = {
  objectIdParamValidationMiddleware,
};
