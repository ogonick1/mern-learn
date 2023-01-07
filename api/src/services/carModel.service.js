const carModelRepository = require('../repositories/carModel.repository');
const carBrandRepository = require('../repositories/carBrand.repository');
const extraFeatureRepository = require('../repositories/extraFeature.repository');
const {
  NotFoundError,
  BusinessLogicError,
} = require('../errors');
const { errorCodes } = require('../errors/error-codes');

const findById = async (id) => {
  const carModel = await carModelRepository.findById(id);
  return carModel;
};

const create = async (model) => {
  const carBrand = await carBrandRepository.findById(model.brandId);

  if (!carBrand) {
    throw new NotFoundError({
      errorCode: errorCodes.CAR_BRAND_NOT_FOUND,
      message: `Car Brand with id ${model.brandId} was not found`,
      details: {
        model,
      },
    });
  }

  const extraFeatures = await extraFeatureRepository.findManyByIds(model.extraFeaturesIds);

  if (extraFeatures.length < model.extraFeaturesIds.length) {
    throw new NotFoundError({
      errorCode: errorCodes.EXTRA_FEATURE_NOT_FOUND,
      message: `Extra Feature with id ${model.extraFeaturesIds} was not found`,
      details: {
        model,
      },
    });
  }

  const existModelByNameAndBrand = await carModelRepository.findModelWithBrand({
    name: model.name,
    brandId: model.brandId,
  });

  if (existModelByNameAndBrand) {
    throw new BusinessLogicError({
      errorCode: errorCodes.CAR_MODEL_NAME_MUST_BE_UNIQUE_PER_BRAND,
      message: 'Card Model name must be unique per Brand',
      details: {
        name: model.name,
        brandId: model.brandId,
      },
    });
  }

  return carModelRepository.create(model);
};

module.exports = {
  findById,
  create,
};
