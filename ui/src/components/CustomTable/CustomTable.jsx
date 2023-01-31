import {
  TablePagination,
  TableSortLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';
import {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useTranslation } from 'react-i18next';

const getInitialSortingState = (
  sortableFields,
  defaultOrderBy,
  defaultOrderDescending,
) => sortableFields.reduce((acc, sortFieldName) => {
  acc[sortFieldName] = {
    orderDescending: sortFieldName === defaultOrderBy
      ? (defaultOrderDescending || false)
      : false,
    isActive: sortFieldName === defaultOrderBy,
    fieldName: sortFieldName,
  };

  return acc;
}, {});

const DEFAULT_SEARCH_LIMIT = 25;

export const CustomTableInner = (props, ref) => {
  const { t } = useTranslation(['loginPage', 'validationErrors', 'form']);
  const {
    columns = [],
    defaultOrderBy = '',
    defaultOrderDescending = false,
    sortableFields = [],
    requestAdapter,
    requestFunction,
    responseAdapter,
  } = props;

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_SEARCH_LIMIT);
  const [offset, setOffset] = useState(0);

  const [sortingState, setSortingState] = useState(getInitialSortingState(
    sortableFields,
    defaultOrderBy,
    defaultOrderDescending,
  ));

  const getTableData = useCallback(async () => {
    const activeSortField = Object.values(sortingState).find(({ isActive }) => isActive);
    const requestBody = requestAdapter({
      orderBy: activeSortField?.fieldName || '',
      orderDescending: activeSortField?.orderDescending || false,
      limit,
      offset,
    });

    const response = await requestFunction(requestBody);
    const {
      count,
      items,
    } = responseAdapter(response);
    setTotalCount(count);
    setData(items);
  }, [
    sortingState,
    limit,
    offset,
    requestAdapter,
  ]);

  useEffect(() => {
    getTableData();
  }, [
    sortingState,
    limit,
    offset,
  ]);

  const onFilterChanged = () => {
    setOffset((prev) => {
      if (prev === 0) {
        getTableData();
      }

      return 0;
    });
  };

  const setSort = useCallback((columnId) => {
    if (sortableFields.includes(columnId)) {
      setOffset(0);
      const activeSortField = Object.values(sortingState).find(({ isActive }) => isActive);
      const newOrderDescendingForActive = !activeSortField?.orderDescending || false;
      setSortingState((prev) => {
        const newSortingState = { ...prev };

        if (columnId === activeSortField?.fieldName) {
          newSortingState[columnId].orderDescending = newOrderDescendingForActive;
        } else {
          if (activeSortField) {
            newSortingState[activeSortField.fieldName].isActive = false;
          }
          newSortingState[columnId].isActive = true;
        }

        return {
          ...newSortingState,
        };
      });
    }
  }, [setSortingState, sortableFields, sortingState]);

  const {
    headerGroups,
    rows,
    prepareRow,
    getTableProps,
    getTableBodyProps,
  } = useTable({ columns, data });

  useImperativeHandle(ref, () => ({
    onFilterChanged,
    getTableData,
  }));

  return (
    <div>
      <TableContainer>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => {
              const activeSortField = Object
                .values(sortingState)
                .find(({ isActive }) => isActive);
              return (
                <TableRow key={headerGroup.getHeaderGroupProps().key}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      key={column.getHeaderProps().key}
                      width={column.width}
                    >
                      {sortableFields.includes(column.id) ? (
                        <TableSortLabel
                          active={activeSortField.fieldName === column.id}
                          direction={activeSortField.orderDescending ? 'desc' : 'asc'}
                          onClick={() => setSort(column.id)}
                        >
                          {column.render('Header')}
                        </TableSortLabel>
                      ) : column.render('Header')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              const {
                getRowProps,
                cells,
              } = row;

              return (
                <TableRow key={getRowProps().key}>
                  {cells.map((cell) => (
                    <TableCell key={cell.getCellProps().key}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={t('carBrands:carBrands.labelRowsPerPage')}
        rowsPerPageOptions={[5, 10, DEFAULT_SEARCH_LIMIT]}
        component="div"
        count={totalCount}
        rowsPerPage={limit}
        page={offset / limit}
        onPageChange={(_, page) => {
          setOffset(page * limit);
        }}
        onRowsPerPageChange={(event) => {
          setLimit(parseInt(event.target.value, 10));
        }}
      />
    </div>
  );
};

export const CustomTable = forwardRef(CustomTableInner);

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    Header: PropTypes.string.isRequired,
    Cell: PropTypes.func,
    width: PropTypes.string,
  })),
  defaultOrderBy: PropTypes.string,
  defaultOrderDescending: PropTypes.bool,
  sortableFields: PropTypes.arrayOf(PropTypes.string),
  requestAdapter: PropTypes.func.isRequired,
  requestFunction: PropTypes.func.isRequired,
  responseAdapter: PropTypes.func.isRequired,
};
