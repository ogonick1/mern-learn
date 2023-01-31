const carModelService = require('../services/carModel.service');

const mapCarModelDocumentToResponseDto = (carModel) => ({
  id: carModel._id,
  name: carModel.name,
  brandId: {
    country: carModel.brandId?.country,
    name: carModel.brandId?.name,
    id: carModel.brandId?._id,
  },
  yearStart: carModel.yearStart,
  yearEnd: carModel.yearEnd,
  powerUnits: carModel.powerUnits,
  extraFeaturesIds: (carModel.extraFeaturesIds || []).map((extraFeature) => ({
    description: extraFeature.description,
    title: extraFeature.title,
    id: extraFeature._id,
  })),
  bodyTypes: carModel.bodyTypes,
});

const getCarModel = async (req, res) => {
  const { id } = req.params;
  const carModel = await carModelService.findById(id);
  return res.json(mapCarModelDocumentToResponseDto(carModel));
};

const createCarModel = async (req, res) => {
  const {
    name,
    brandId,
    yearStart,
    yearEnd,
    powerUnits,
    extraFeaturesIds,
    bodyTypes,
  } = req.body;
  const carModel = await carModelService.create({
    name,
    brandId,
    yearStart,
    yearEnd,
    powerUnits,
    extraFeaturesIds,
    bodyTypes,
  });
  return res.json(mapCarModelDocumentToResponseDto(carModel));
};

const updateCarModel = async (req, res) => {
  const {
    name,
    brandId,
    yearStart,
    yearEnd,
    powerUnits,
    extraFeaturesIds,
    bodyTypes,
  } = req.body;
  const { id } = req.params;
  await carModelService.update(id, {
    name,
    brandId,
    yearStart,
    yearEnd,
    powerUnits,
    extraFeaturesIds,
    bodyTypes,
  });
  return res.status(204).send();
};

const removeCarModel = async (req, res) => {
  const { id } = req.params;
  await carModelService.remove(id);
  return res.status(204).send();
};

const searchCarModel = async (req, res) => {
  const {
    limit,
    offset,
    sortField,
    descending,
    stringFilters,
  } = req.body;
  const [carModels, count] = await carModelService.search({
    limit,
    offset,
    sortField,
    descending,
    stringFilters,
  });
  return res.json({
    count,
    carModels: carModels.map(mapCarModelDocumentToResponseDto),
  });
};

module.exports = {
  getCarModel,
  createCarModel,
  updateCarModel,
  removeCarModel,
  searchCarModel,
};
