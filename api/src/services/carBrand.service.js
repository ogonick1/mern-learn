const { CarBrandRepository } = require('../repositories/carBrand.repository');

const createBrand = async (req, res) => {
  const brand = CarBrandRepository.create(req);
  return brand;
};

const findBrand = async (req, res) => {
  const Id = req.params.id;
  const brandId = CarBrandRepository.findBrandById(Id);
  return brandId;
};
const findAndUpdate = async (req, res) => {
  const updateBrandId = CarBrandRepository.findUpdate(req);
  return updateBrandId;
};
const findAndDelete = async (req, res) => {
  const Id = req.params.id;
  const deleteBrandId = CarBrandRepository.findDelete(Id);
  return deleteBrandId;
};

module.exports = {
  createBrand,
  findBrand,
  findAndUpdate,
  findAndDelete,
};
