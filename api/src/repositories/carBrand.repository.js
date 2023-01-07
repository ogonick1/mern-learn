const { CarBrandModel } = require('../models/CarBrand');
const { mapSearchRequestToMongoDbFindQuery } = require('../utils/search/mongo-search.utils');

const create = (model) => {
  const { name, country } = model;
  return new CarBrandModel({ name, country }).save();
};

const findById = (id) => {
  return CarBrandModel.findById(id).lean().exec();
};

const findOneByCriteria = (filter = {}) => {
  return CarBrandModel.findOne(filter).lean().exec();
};

const update = (id, model) => {
  return CarBrandModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return CarBrandModel.findByIdAndDelete(id);
};

const search = (searchModel) => {
  const { queryOptions } = mapSearchRequestToMongoDbFindQuery(searchModel);

  return Promise.all([
    CarBrandModel.find({}, null, queryOptions).lean().exec(),
    CarBrandModel.countDocuments().exec(),
  ]);
};

module.exports = {
  create,
  findById,
  findOneByCriteria,
  update,
  remove,
  search,
};
