const { carBrandservice } = require('../services/carBrand.service');

const createCarBrand = async (req, res) => {
  const carBrand = await carBrandservice.create(req, res);
  return res.json({ carBrand });
};

const getCarBrandById = async (req, res) => {
  const carBrandId = await carBrandservice.findOne(req, res);
  return carBrandId;
};

const updateCarBrand = async (req, res) => {
  const updateCarBrandById = await carBrandservice.findAndUpdate(req, res);
  return updateCarBrandById;
};
const deleteCarBrand = async (req, res) => {
  const deleteCarBrandById = await carBrandservice.findAndDelete(req, res);
  return deleteCarBrandById;
};

module.exports = {
  createCarBrand,
  getCarBrandById,
  updateCarBrand,
  deleteCarBrand,
};
