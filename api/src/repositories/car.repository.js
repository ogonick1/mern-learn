const { CarModel } = require('../models/Car');
const { mapSearchRequestToMongoDbFindQuery } = require('../utils/search/mongo-search.utils');

const findByCriteria = (filter = {}) => {
  return CarModel.findOne(filter).lean().exec();
};

const create = (model) => {
  return new CarModel(model).save();
};

const findById = (id) => {
  return CarModel
    .findById(id)
    .populate('carModelId')
    .populate('extraFeaturesIds')
    .lean()
    .exec();
};

const update = (id, model) => {
  return CarModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return CarModel.findByIdAndDelete(id);
};

const search = (searchModel) => {
  const { queryOptions, filterQuery } = mapSearchRequestToMongoDbFindQuery(searchModel);

  return Promise.all([
    CarModel
      .find(filterQuery, null, queryOptions)
      .populate('carModelId')
      .populate('extraFeaturesIds')
      .lean()
      .exec(),
    CarModel.countDocuments(filterQuery).exec(),
  ]);
};

module.exports = {
  create,
  findById,
  update,
  remove,
  search,
  findByCriteria,
};
