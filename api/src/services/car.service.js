const carRepository = require('../repositories/car.repository');
const carModelRepository = require('../repositories/carModel.repository');
const extraFeatureRepository = require('../repositories/extraFeature.repository');
const {
  throwCarModelNotFound,
  throwCarModelNotInclude,
} = require('../errors/errors-builders/carModels.errors-builders');
const {
  throwExtraFeaturesNotFound,
} = require('../errors/errors-builders/extraFeatures.errors-builders');
const {
  throwCarNotFound,
  throwNotUnique,
} = require('../errors/errors-builders/car.errors-builders');

const findById = async (id) => {
  const car = await carRepository.findById(id);

  if (!car) {
    throwCarNotFound(id);
  }

  return car;
};

const create = async (model) => {
  const carWithSamePlateNumber = await carRepository.findOneByCriteria({
    plateNumber: model.plateNumber,
  });

  if (carWithSamePlateNumber) {
    throwNotUnique(model.plateNumber);
  }

  const carModel = await carModelRepository.findById(model.carModelId);
  console.log(carModel);

  if (!carModel) {
    throwCarModelNotFound(model.carModelId);
  }
  if (!carModel.bodyTypes.includes(model.bodyType)) {
    throwCarModelNotInclude(model.bodyType);
  }
  if (!carModel.powerUnits.find(((element) => JSON.stringify(element) === JSON.stringify(model.powerUnit)))) {
    throwCarModelNotInclude(model.powerUnit);
  }

  const extraFeatures = await extraFeatureRepository.findManyByIds(model.extraFeaturesIds);

  if (extraFeatures.length < model.extraFeaturesIds?.length) {
    throwExtraFeaturesNotFound(model.extraFeaturesIds);
  }

  return carRepository.create(model);
};

const update = async (id, model) => {
  const carWithSamePlateNumber = await carRepository.findOneByCriteria({
    plateNumber: model.plateNumber,
  });

  if (carWithSamePlateNumber) {
    throwNotUnique(model.plateNumber);
  }

  const carModel = await carModelRepository.findById(model.carModelId);
  console.log(carModel);

  if (!carModel) {
    throwCarModelNotFound(model.carModelId);
  }
  if (!carModel.bodyTypes.includes(model.bodyType)) {
    throwCarModelNotInclude(model.bodyType);
  }
  if (!carModel.powerUnits.find(((element) => JSON.stringify(element) === JSON.stringify(model.powerUnit)))) {
    throwCarModelNotInclude(model.powerUnit);
  }

  const extraFeatures = await extraFeatureRepository.findManyByIds(model.extraFeaturesIds);

  if (extraFeatures.length < model.extraFeaturesIds?.length) {
    throwExtraFeaturesNotFound(model.extraFeaturesIds);
  }

  return carRepository.update(id, model);
};

const remove = (id) => {
  return carRepository.remove(id);
};

const search = (searchModel) => {
  return carRepository.search(searchModel);
};

module.exports = {
  findById,
  create,
  update,
  remove,
  search,
};
