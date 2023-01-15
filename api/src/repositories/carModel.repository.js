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

const findModelWithBrand = (filter = {}) => {
  return CarModelModel.findOne(filter).lean().exec();
};

const update = (id, model) => {
  return CarModelModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return CarModelModel.findByIdAndDelete(id);
};

const search = (searchModel) => {
  const { queryOptions } = mapSearchRequestToMongoDbFindQuery(searchModel);

  return Promise.all([
    CarModelModel.find({}, null, queryOptions).lean().exec(),
    CarModelModel.countDocuments().exec(),
  ]);
};

module.exports = {
  create,
  findById,
  findModelWithBrand,
  update,
  remove,
  search,
};
