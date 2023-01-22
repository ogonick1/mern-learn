const carModelService = require('../services/carModel.service');

const getCarModel = async (req, res) => {
  const { id } = req.params;
  const carModel = await carModelService.findById(id);
  return res.json({
    name: carModel.name,
    brandId: carModel.brandId,
    yearStart: carModel.yearStart,
    yearEnd: carModel.yearEnd,
    powerUnits: carModel.powerUnits,
    extraFeaturesIds: carModel.extraFeaturesIds,
    bodyTypes: carModel.bodyTypes,
  });
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
  return res.json({
    id: carModel._id,
    name: carModel.name,
    brandId: carModel.brandId,
    yearStart: carModel.yearStart,
    yearEnd: carModel.yearEnd,
    powerUnits: carModel.powerUnits,
    extraFeaturesIds: carModel.extraFeaturesIds,
    bodyTypes: carModel.bodyTypes,
  });
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
  } = req.body;
  const [carModel, count] = await carModelService.search({
    limit,
    offset,
    sortField,
    descending,
  });
  return res.json({
    count,
    carModel: carModel.map((item) => ({
      id: item._id,
      name: item.name,
      brandId: item.brandId,
      yearStart: item.yearStart,
      yearEnd: item.yearEnd,
      powerUnits: item.powerUnits,
      extraFeaturesIds: item.extraFeaturesIds,
      bodyTypes: item.bodyTypes,
    })),
  });
};

module.exports = {
  getCarModel,
  createCarModel,
  updateCarModel,
  removeCarModel,
  searchCarModel,
};
