import PropTypes from 'prop-types';

export const CustomTable = (props) => {
  const {
    columns = [],
    defaultOrderBy = '',
    defaultOrderDescending = false,
    sortableFields = [],
    requestAdapter,
    requestFunction,
    responseAdapter,
  } = props;

  return (
    <div>
      CustomTable
    </div>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    Header: PropTypes.string.isRequired,
    Cell: PropTypes.element,
  })),
  defaultOrderBy: PropTypes.string,
  defaultOrderDescending: PropTypes.bool,
  sortableFields: PropTypes.arrayOf(PropTypes.string),
  requestAdapter: PropTypes.func.isRequired,
  requestFunction: PropTypes.func.isRequired,
  responseAdapter: PropTypes.func.isRequired,
};
