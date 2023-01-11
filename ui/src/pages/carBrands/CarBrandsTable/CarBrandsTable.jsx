import { TablePagination, TableSortLabel, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { CarBrandService } from '../../../services/carBrand.service';
import { useConfirmation } from '../../../hooks/useConfirmation';

export const CarBrandsTable = () => {
  const openConfirmation = useConfirmation();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('name');
  const [descending, setDescending] = useState(true);

  const getData = async () => {
    try {
      const result = await CarBrandService.search({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
        sortField: sortBy,
        descending,
      });

      setData(result.carBrands);
      setTotalCount(result.count);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [rowsPerPage, page, descending, sortBy]);

  const columns = [
    {
      id: 'name',
      label: t('carBrands.name'),
    },
    {
      id: 'country',
      label: t('carBrands.country'),
    },
    {
      id: 'actions',
      label: t('carBrands.actions'),
    },
  ];
  const deleteCarBrand = async (id) => {
    try {
      openConfirmation({})
      //await CarBrandService.delete(id);
      //await getData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRequestSort = (id) => {
    const thisSort = sortBy === id && descending === true;
    setDescending(!thisSort);
    setSortBy(id);
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => {
                return (
                  <TableCell
                    key={id}
                  >

                    {id !== 'actions'
                      ? (
                        <TableSortLabel
                          active={sortBy === id}
                          direction={descending ? 'desc' : 'asc'}
                          onClick={() => handleRequestSort(id)}
                        >
                          {label}
                        </TableSortLabel>
                      ) : label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length ? data.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => deleteCarBrand(item._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            }) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={t('carBrands.labelRowsPerPage')}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}

      />
    </div>
  );
};
