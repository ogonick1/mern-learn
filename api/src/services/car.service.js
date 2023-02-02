const carRepository = require('../repositories/car.repository');
const carModelRepository = require('../repositories/carModel.repository');
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

const validateCarForCarModel = async ({
  carModelId,
  bodyType,
  powerUnit,
  extraFeaturesIds,
}) => {
  const carModel = await carModelRepository.findById(carModelId);

  if (!carModel) {
    throwCarModelNotFound(carModelId);
  }

  const isMatchedByBodyType = carModel.bodyTypes.includes(bodyType);

  if (!isMatchedByBodyType) {
    throwCarModelNotInclude(bodyType);
  }

  const isMatchedByPowerUnit = carModel.powerUnits.some((carModelPowerUnit) => {
    return carModelPowerUnit.driveType === powerUnit.driveType
      && carModelPowerUnit.engineVolume === powerUnit.engineVolume
      && carModelPowerUnit.fuelType === powerUnit.fuelType
      && carModelPowerUnit.gearBox === powerUnit.gearBox;
  });

  if (!isMatchedByPowerUnit) {
    throwCarModelNotInclude(powerUnit);
  }

  const carModelExtraFeaturesIds = carModel.extraFeaturesIds.map(({ _id }) => _id.toString());

  const isMatchedByExtraFeatures = extraFeaturesIds
    .every((extraFeaturesId) => carModelExtraFeaturesIds.includes(extraFeaturesId));

  if (!isMatchedByExtraFeatures) {
    throwExtraFeaturesNotFound(extraFeaturesIds);
  }
};

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

  await validateCarForCarModel({
    carModelId: model.carModelId,
    bodyType: model.bodyType,
    powerUnit: model.powerUnit,
    extraFeaturesIds: model.extraFeaturesIds,
  });

  return carRepository.create(model);
};

const update = async (id, model) => {
  const carWithSamePlateNumber = await carRepository.findOneByCriteria({
    plateNumber: model.plateNumber,
    _id: { $ne: id },
  });

  if (carWithSamePlateNumber) {
    throwNotUnique(model.plateNumber);
  }

  await validateCarForCarModel({
    carModelId: model.carModelId,
    bodyType: model.bodyType,
    powerUnit: model.powerUnit,
    extraFeaturesIds: model.extraFeaturesIds,
  });

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
