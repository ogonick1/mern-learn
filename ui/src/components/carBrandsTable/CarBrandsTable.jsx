import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../plugins/store/carSlice';

export const CarBrandsTable = () => {
  const carBrands = useSelector((state) => state.cars.carBrands);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(search());
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">N</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Cauntry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carBrands ? carBrands.map((carBrand, index) => (
              <TableRow
                key={carBrand.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {carBrand.name}
                </TableCell>
                <TableCell align="center">{carBrand.country}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell align="center">not found</TableCell>
                <TableCell align="center" scope="row">
                  not found
                </TableCell>
                <TableCell align="center">not found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
