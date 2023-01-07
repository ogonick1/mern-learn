const carBrandService = require('../services/carBrand.service');

const createCarBrand = async (req, res) => {
  const { name, country } = req.body;

  const carBrand = await carBrandService.create({ name, country });

  return res.json({
    id: carBrand._id,
    name: carBrand.name,
    country: carBrand.country,
  });
};

const getCarBrandById = async (req, res) => {
  const { id } = req.params;

  const carBrand = await carBrandService.findById(id);
  return res.json({
    id: carBrand._id,
    name: carBrand.name,
    country: carBrand.country,
  });
};

const updateCarBrand = async (req, res) => {
  const { name, country } = req.body;
  const { id } = req.params;

  await carBrandService.update(id, {
    name,
    country,
  });
  return res.status(204).send();
};

const removeCarBrand = async (req, res) => {
  const { id } = req.params;
  await carBrandService.remove(id);
  return res.status(204).send();
};

const searchCarBrands = async (req, res) => {
  const {
    limit,
    skip,
    sortField,
    descending,
  } = req.body;
  const [carBrands, count] = await carBrandService.search({
    limit,
    skip,
    sortField,
    descending,
  });
  return res.json({
    count,
    carBrands,
  });
};

module.exports = {
  createCarBrand,
  getCarBrandById,
  updateCarBrand,
  removeCarBrand,
  searchCarBrands,
};
