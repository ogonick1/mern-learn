const carService = require('../services/car.service');

const mapCarDocumentToResponseDto = (car) => ({
  id: car._id,
  carModelId: {
    ...car.carModelId,
    id: car.carModelId._id,
    extraFeaturesIds: (car.carModelId.extraFeaturesIds || []).map((extraFeature) => ({
      description: extraFeature.description,
      id: extraFeature._id,
      title: extraFeature.title,
    })),
  },
  powerUnit: car.powerUnit,
  year: car.year,
  bodyType: car.bodyType,
  extraFeaturesIds: (car.extraFeaturesIds || []).map((extraFeature) => ({
    description: extraFeature.description,
    title: extraFeature.title,
    id: extraFeature._id,
  })),
  color: car.color,
  plateNumber: car.plateNumber,
  plateNumberRegistrationDate: car.plateNumberRegistrationDate,
});

const getCar = async (req, res) => {
  const { id } = req.params;
  const car = await carService.findById(id);
  return res.json(mapCarDocumentToResponseDto(car));
};

const createCar = async (req, res) => {
  const {
    carModelId,
    powerUnit,
    year,
    bodyType,
    extraFeaturesIds,
    color,
    plateNumber,
    plateNumberRegistrationDate,
  } = req.body;
  const car = await carService.create({
    carModelId,
    powerUnit,
    year,
    bodyType,
    extraFeaturesIds,
    color,
    plateNumber,
    plateNumberRegistrationDate,
  });
  return res.json(mapCarDocumentToResponseDto(car));
};

const updateCar = async (req, res) => {
  const {
    carModelId,
    powerUnit,
    year,
    bodyType,
    extraFeaturesIds,
    color,
    plateNumber,
    plateNumberRegistrationDate,
  } = req.body;
  const { id } = req.params;
  await carService.update(id, {
    carModelId,
    powerUnit,
    year,
    bodyType,
    extraFeaturesIds,
    color,
    plateNumber,
    plateNumberRegistrationDate,
  });
  return res.status(204).send();
};

const removeCar = async (req, res) => {
  const { id } = req.params;
  await carService.remove(id);
  return res.status(204).send();
};

const searchCar = async (req, res) => {
  const {
    limit,
    offset,
    sortField,
    descending,
    stringFilters,
  } = req.body;
  const [car, count] = await carService.search({
    limit,
    offset,
    sortField,
    descending,
    stringFilters,
  });
  return res.json({
    count,
    car: car.map(mapCarDocumentToResponseDto),
  });
};

module.exports = {
  getCar,
  createCar,
  updateCar,
  removeCar,
  searchCar,
};
