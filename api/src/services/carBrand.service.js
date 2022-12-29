const carBrandRepository = require('../repositories/carBrand.repository');
const { BusinessLogicError, NotFoundError } = require('../errors');
const { errorCodes } = require('../errors/error-codes');

const create = async (model) => {
  const carBrandWithSameName = await carBrandRepository
    .findOneByCriteria({ name: model.name });

  if (carBrandWithSameName) {
    throw new BusinessLogicError({
      errorCode: errorCodes.CAR_BRAND_NAME_NOT_UNIQUE,
      message: `Car Brand with name ${model.name} already exist`,
      details: {
        name: model.name,
      },
    });
  }

  return carBrandRepository.create(model);
};

const findById = async (id) => {
  const carBrand = await carBrandRepository.findById(id);

  if (!carBrand) {
    throw new NotFoundError({
      errorCode: errorCodes.CAR_BRAND_NOT_FOUND,
      message: `Car Brand with id ${id} was not found`,
      details: {
        id,
      },
    });
  }

  return carBrand;
};

const update = async (id, model) => {
  const carBrand = await carBrandRepository.findById(id);

  if (!carBrand) {
    throw new NotFoundError({
      errorCode: errorCodes.CAR_BRAND_NOT_FOUND,
      message: `Car Brand with id ${id} was not found`,
      details: {
        id,
      },
    });
  }

  const carBrandWithSameName = await carBrandRepository
    .findOneByCriteria({ name: model.name, _id: { $ne: id } });

  if (carBrandWithSameName) {
    throw new BusinessLogicError({
      errorCode: errorCodes.CAR_BRAND_NAME_NOT_UNIQUE,
      message: `Car Brand with name ${model.name} already exist`,
      details: {
        name: model.name,
      },
    });
  }

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
