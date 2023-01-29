/**
 * @param offset {number}{optional}
 * @param limit {number}{optional}
 * @param sortField {string}{optional}
 * @param descending {boolean}{optional}
 */
const mapSearchRequestToMongoDbFindQuery = (searchModel) => {
  // queryOptions
  const queryOptions = {
    limit: searchModel.limit || 50,
    skip: searchModel.offset || 0,
  };

  if (searchModel.sortField) {
    queryOptions.sort = {
      [searchModel.sortField]: !searchModel.descending ? 1 : -1,
    };
  }

  // filterQuery
  const filterQuery = {};

  if (searchModel.stringFilters) {
    searchModel.stringFilters.forEach((filter) => {
      filterQuery.$and = filterQuery.$and || [];
      filterQuery.$and.push({
        [filter.fieldName]: {
          $in: filter.value.map((value) => {
            if (filter.exactMatch) {
              return value;
            }
            return new RegExp(value, 'i');
          }),
        },
      });
    });
  }

  return {
    queryOptions,
    filterQuery,
  };
};

module.exports = {
  mapSearchRequestToMongoDbFindQuery,
};
