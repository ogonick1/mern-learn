const carModelRepository = require('../repositories/carModel.repository');
const carBrandRepository = require('../repositories/carBrand.repository');
const extraFeatureRepository = require('../repositories/extraFeature.repository');
const { NotFoundError } = require('../errors');
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
  const extraFeature = await extraFeatureRepository.findAllById(model.extraFeaturesIds);

  if (!extraFeature) {
    throw new NotFoundError({
      errorCode: errorCodes.EXTRA_FEATURE_NOT_FOUND,
      message: `Extra Feature with id ${model.extraFeaturesIds} was not found`,
      details: {
        model,
      },
    });
  }

  return carModelRepository.create(model);
};

module.exports = {
  findById,
  create,
};
