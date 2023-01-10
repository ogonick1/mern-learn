/* eslint-disable */
import { Button, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import { CarBrandService } from '../../../services/carBrand.service';

export const CarBrandsTable = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getData = async () => {
    try {
      const result = await CarBrandService.search({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
        sortField: 'name',
        descending: true,
      });

      setData(result.carBrands);
      setTotalCount(result.count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [rowsPerPage, page]);
  const columns = [
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'country',
      label: 'Cauntry',
    },
    {
      id: 'actions',
      label: 'Actions',
    },
  ];
  const deleteCarBrand = async (id) => {
    try {
      await CarBrandService.delete(id);
      await getData();
    } catch (error) {
      console.log(error);
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => {
                return <TableCell key={id}>{label}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length ? data.map((item) => {
              return <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell><Button onClick={() => deleteCarBrand(item._id)}>X</Button></TableCell>
              </TableRow>
            }) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
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
