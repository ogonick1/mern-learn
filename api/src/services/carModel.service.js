const carModelRepository = require('../repositories/carModel.repository');
const carBrandRepository = require('../repositories/carBrand.repository');
const extraFeatureRepository = require('../repositories/extraFeature.repository');
const {
  throwCarModelNotFound,
  throwCarModelNamePerBrandNotUnique,
} = require('../errors/errors-builders/carModels.errors-builders');
const {
  throwCarBrandNotFound,
} = require('../errors/errors-builders/carBrands.errors-builders');
const {
  throwExtraFeaturesNotFound,
} = require('../errors/errors-builders/extraFeatures.errors-builders');

const findById = async (id) => {
  const carModel = await carModelRepository.findById(id);

  if (!carModel) {
    throwCarModelNotFound(id);
  }

  return carModel;
};

const create = async (model) => {
  const carBrand = await carBrandRepository.findById(model.brandId);

  if (!carBrand) {
    throwCarBrandNotFound(model.brandId);
  }

  const extraFeatures = await extraFeatureRepository.findManyByIds(model.extraFeaturesIds);

  if (extraFeatures.length < model.extraFeaturesIds.length) {
    throwExtraFeaturesNotFound(model.extraFeaturesIds);
  }

  const existModelByNameAndBrand = await carModelRepository.findModelWithBrand({
    name: model.name,
    brandId: model.brandId,
  });

  if (existModelByNameAndBrand) {
    throwCarModelNamePerBrandNotUnique();
  }

  return carModelRepository.create(model);
};

const update = async (id, model) => {
  const carModel = await carModelRepository.findById(id);

  if (!carModel) {
    throwCarModelNotFound(id);
  }

  const carBrand = await carBrandRepository.findById(model.brandId);

  if (!carBrand) {
    throwCarBrandNotFound(model.brandId);
  }

  const extraFeatures = await extraFeatureRepository.findManyByIds(model.extraFeaturesIds);

  if (extraFeatures.length < model.extraFeaturesIds.length) {
    throwExtraFeaturesNotFound(model.extraFeaturesIds);
  }

  const existModelByNameAndBrand = await carModelRepository.findModelWithBrand({
    name: model.name,
    brandId: model.brandId,
    _id: { $ne: id },
  });

  if (existModelByNameAndBrand) {
    throwCarModelNamePerBrandNotUnique();
  }

  return carModelRepository.update(id, model);
};

const remove = (id) => {
  return carModelRepository.remove(id);
};

const search = (searchModel) => {
  return carModelRepository.search(searchModel);
};

module.exports = {
  findById,
  create,
  update,
  remove,
  search,
};
