const { ExtraFeatureModel } = require('../models/ExtraFeature');
const { mapSearchRequestToMongoDbFindQuery } = require('../utils/search/mongo-search.utils');

const create = (model) => {
  const { title, description } = model;
  return new ExtraFeatureModel({ title, description }).save();
};

const findOneByCriteria = (filter = {}) => {
  return ExtraFeatureModel.findOne(filter).lean().exec();
};

const findById = (id) => {
  return ExtraFeatureModel.findById(id).lean().exec();
};
const update = (id, model) => {
  return ExtraFeatureModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return ExtraFeatureModel.findByIdAndDelete(id);
};

const findManyByIds = (ids) => {
  return ExtraFeatureModel.find({ _id: { $in: ids } }).lean().exec();
};

const search = (searchModel) => {
  const { queryOptions } = mapSearchRequestToMongoDbFindQuery(searchModel);

  return Promise.all([
    ExtraFeatureModel.find({}, null, queryOptions).lean().exec(),
    ExtraFeatureModel.countDocuments().exec(),
  ]);
};

module.exports = {
  create,
  findOneByCriteria,
  findById,
  update,
  remove,
  findManyByIds,
  search,
};
