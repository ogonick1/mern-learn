const { CarModelModel } = require('../models/CarModel');
const { mapSearchRequestToMongoDbFindQuery } = require('../utils/search/mongo-search.utils');

const create = (model) => {
  return new CarModelModel(model).save();
};

const findById = (id) => {
  return CarModelModel
    .findById(id)
    .populate('brandId')
    .populate('extraFeaturesIds')
    .lean()
    .exec();
};

const findModelByCriteria = (filter = {}) => {
  return CarModelModel.findOne(filter).lean().exec();
};

const update = (id, model) => {
  return CarModelModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return CarModelModel.findByIdAndDelete(id);
};

const search = (searchModel) => {
  const { queryOptions, filterQuery } = mapSearchRequestToMongoDbFindQuery(searchModel);

  return Promise.all([
    CarModelModel
      .find(filterQuery, null, queryOptions)
      .populate('brandId')
      .populate('extraFeaturesIds')
      .lean()
      .exec(),
    CarModelModel.countDocuments(filterQuery).exec(),
  ]);
};

module.exports = {
  create,
  findById,
  findModelByCriteria,
  update,
  remove,
  search,
};
