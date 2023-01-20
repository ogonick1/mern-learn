/**
 * @param offset {number}{optional}
 * @param limit {number}{optional}
 * @param sortField {string}{optional}
 * @param descending {boolean}{optional}
 */
const mapSearchRequestToMongoDbFindQuery = (searchModel) => {
  const queryOptions = {
    limit: searchModel.limit || 50,
    skip: searchModel.offset || 0,
  };

  if (searchModel.sortField) {
    queryOptions.sort = {
      [searchModel.sortField]: !searchModel.descending ? 1 : -1,
    };
  }
  return {
    queryOptions,
  };
};

module.exports = {
  mapSearchRequestToMongoDbFindQuery,
};
