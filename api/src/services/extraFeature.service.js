const extraFeatureRepository = require('../repositories/extraFeature.repository');
const {
  throwExtraFeaturesNotFound,
  throwExtraFeatureNotUnic,
} = require('../errors/errors-builders/extraFeatures.errors-builders');

const create = async (model) => {
  const extraFeatureSameName = await extraFeatureRepository.findOneByCriteria({ title: model.title });

  if (extraFeatureSameName) {
    throwExtraFeatureNotUnic(model.title);
  }

  return extraFeatureRepository.create(model);
};

const findById = async (id) => {
  const extraFeature = await extraFeatureRepository.findById(id);
  if (!extraFeature) {
    throwExtraFeaturesNotFound(id);
  }
  return extraFeature;
};

const update = async (id, model) => {
  const extraFeature = await extraFeatureRepository.findById(id);

  if (!extraFeature) {
    throwExtraFeaturesNotFound(id);
  }

  const extraFeatureSameName = await extraFeatureRepository
    .findOneByCriteria({ title: model.title, _id: { $ne: id } });

  if (extraFeatureSameName) {
    throwExtraFeatureNotUnic(model.title);
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
