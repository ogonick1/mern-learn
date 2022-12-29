const carBrandRepository = require('../repositories/carBrand.repository');

const create = (model) => {
  return carBrandRepository.create(model);
};

const findById = (id) => {
  return carBrandRepository.findById(id);
};

const update = (id, model) => {
  return carBrandRepository.update(id, model);
};

const remove = (id) => {
  return carBrandRepository.remove(id);
};

module.exports = {
  create,
  findById,
  update,
  remove,
};
