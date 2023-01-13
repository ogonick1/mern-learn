const extraFeatureRepository = require('../repositories/extraFeature.repository');
const { BusinessLogicError, NotFoundError } = require('../errors');
const { errorCodes } = require('../errors/error-codes');

const create = async (model) => {
  const extraFeatureSameName = await extraFeatureRepository.findOneByCriteria({ title: model.title });

  if (extraFeatureSameName) {
    throw new BusinessLogicError({
      errorCode: errorCodes.EXTRA_FEATURE_NAME_NOT_UNIQUE,
      message: `Extra Feature with name ${model.title} alredy exist`,
      details: {
        title: model.title,
      },
    });
  }

  return extraFeatureRepository.create(model);
};

const findById = async (id) => {
  const extraFeature = await extraFeatureRepository.findById(id);
  if (!extraFeature) {
    throw new NotFoundError({
      errorCode: errorCodes.EXTRA_FEATURE_NOT_FOUND,
      message: `Extra Feature  with id ${id} was not found`,
      details: {
        id,
      },
    });
  }
  return extraFeature;
};

const update = async (id, model) => {
  const extraFeature = await extraFeatureRepository.findById(id);

  if (!extraFeature) {
    throw new NotFoundError({
      errorCode: errorCodes.EXTRA_FEATURE_NOT_FOUND,
      message: `Extra Feature with id ${id} was not found`,
      details: {
        id,
      },
    });
  }

  const extraFeatureSameName = await extraFeatureRepository
    .findOneByCriteria({ title: model.title, _id: { $ne: id } });

  if (extraFeatureSameName) {
    throw new BusinessLogicError({
      errorCode: errorCodes.EXTRA_FEATURE_NAME_NOT_UNIQUE,
      message: `Extra Feature with name ${model.title} already exist`,
      details: {
        title: model.title,
      },
    });
  }

  return extraFeatureRepository.update(id, model);
};

const remove = (id) => {
  return extraFeatureRepository.remove(id);
};

const search = (searchModel) => {
  return extraFeatureRepository.search(searchModel);
};

module.exports = {
  create,
  findById,
  update,
  remove,
  search,
};
