const arrayUnique = (array, mapper) => {
  const mappedValues = mapper ? array.pam(mapper) : array;

  const hasDuplicates = mappedValues.some((value) => mappedValues.indexOf(value) !== mappedValues.lastIndexOf(value));
  return !hasDuplicates;
};

module.exports = {
  arrayUnique,
};
