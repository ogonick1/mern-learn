const carRepository = require('../repositories/car.repository');
const carModelRepository = require('../repositories/carModel.repository');
const extraFeatureRepository = require('../repositories/extraFeature.repository');
const {
  throwCarModelNotFound,
} = require('../errors/errors-builders/carModels.errors-builders');
const {
  throwExtraFeaturesNotFound,
} = require('../errors/errors-builders/extraFeatures.errors-builders');
const {
  throwCarNotFound,
  throwCarPlateNumberNotUnique,
} = require('../errors/errors-builders/car.errors-builders');

const findById = async (id) => {
  const car = await carRepository.findById(id);

  if (!car) {
    throwCarNotFound(id);
  }

  return car;
};

const create = async (model) => {
  // TODO rename to carWithSamePlateNumber
  const plateNumber = await carRepository.findByCriteria({
    plateNumber: model.plateNumber,
  });

  if (plateNumber) {
    throwCarPlateNumberNotUnique(model.plateNumber);
  }

  // TODO rename to carModel
  const carModelId = await carModelRepository.findById(model.carModelId);

  if (!carModelId) {
    throwCarModelNotFound(model.carModelId);
  }

  const extraFeatures = await extraFeatureRepository.findManyByIds(model.extraFeaturesIds);

  if (extraFeatures.length < model.extraFeaturesIds?.length) {
    throwExtraFeaturesNotFound(model.extraFeaturesIds);
  }

  return carRepository.create(model);
};

const update = async (id, model) => {
  // TODO WHERE check on unique plateNumber like for create ???

  // TODO rename to carModel
  const carModelId = await carModelRepository.findById(id);

  if (!carModelId) {
    throwCarModelNotFound(id);
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
