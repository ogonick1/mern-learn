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
    name: carModel.name,
    brandId: carModel.brandId,
    yearStart: carModel.yearStart,
    yearEnd: carModel.yearEnd,
    powerUnits: carModel.powerUnits,
    extraFeaturesIds: carModel.extraFeaturesIds,
    bodyTypes: carModel.bodyTypes,
  });
};

module.exports = {
  getCarModel,
  createCarModel,
};
