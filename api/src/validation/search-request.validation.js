const { check } = require('express-validator');

const searchRequestValidation = [
  check('limit', 'Must be integer').optional().isInt(),
  check('offset', 'Must be integer').optional().isInt(),
  check('sortField', 'Must be string').optional().isString(),
  check('descending', 'Must be boolean').optional().isBoolean(),
  check('stringFilters').optional().isArray(),
  check('stringFilters.*.fieldName').isString(),
  check('stringFilters.*.values').isArray({ min: 1 }),
  check('stringFilters.*.values.*').isString(),
  check('stringFilters.*.exactMatch').isBoolean(),
];

module.exports = {
  searchRequestValidation,
};
