const carBrandRepository = require('../repositories/carBrand.repository');
const {
  throwCarBrandNotFound,
  throwCarBrandUniqueName,
} = require('../errors/errors-builders/carBrands.errors-builders');

const create = async (model) => {
  const carBrandWithSameName = await carBrandRepository
    .findOneByCriteria({ name: model.name });

  if (carBrandWithSameName) {
    throwCarBrandUniqueName(model.name);
  }

  return carBrandRepository.create(model);
};

const findById = async (id) => {
  const carBrand = await carBrandRepository.findById(id);

  if (!carBrand) {
    throwCarBrandNotFound(id);
  }

  return carBrand;
};

const update = async (id, model) => {
  const carBrand = await carBrandRepository.findById(id);

  if (!carBrand) {
    throwCarBrandNotFound(id);
  }

  const carBrandWithSameName = await carBrandRepository
    .findOneByCriteria({ name: model.name, _id: { $ne: id } });

  if (carBrandWithSameName) {
    throwCarBrandUniqueName(model.name);
  }

  return carBrandRepository.update(id, model);
};

const remove = (id) => {
  return carBrandRepository.remove(id);
};

const search = (searchModel) => {
  return carBrandRepository.search(searchModel);
};

module.exports = {
  create,
  findById,
  update,
  remove,
  search,
};
