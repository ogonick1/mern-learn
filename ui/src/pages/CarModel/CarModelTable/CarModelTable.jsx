import {
  TablePagination, TableSortLabel, IconButton, Stack,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from '../../../hooks/useConfirmation';
import { CarModelService } from '../../../services/carModel.service';
import './index.scss';

export const CarModelTable = () => {
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
      const result = await CarModelService.search({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
        sortField: sortBy,
        descending,
      });

      setData(result.carModel);
      setTotalCount(result.count);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getData();
  }, [rowsPerPage, page, descending, sortBy]);

  const columns = [

    {
      id: 'name',
      label: t('carModel.name'),
      isSortable: true,
      sortKey: 'name',
    },
    {
      id: 'brandName',
      label: t('carModel.brandName'),
      isSortable: false,
    },
    {
      id: 'years',
      label: t('carModel.years'),
      isSortable: true,
      sortKey: 'yearStart',

    },
    {
      id: 'powerUnits',
      label: t('carModel.powerUnits'),
      isSortable: false,
    },
    {
      id: 'extraFeatures',
      label: t('carModel.extraFeatures'),
      isSortable: false,
    },
    {
      id: 'bodyTypes',
      label: t('carModel.bodyTypes'),
      isSortable: false,
    },
    {
      id: 'actions',
      label: t('carModel.actions'),
      isSortable: false,
    },
  ];

  const deleteCarModel = async (id) => {
    try {
      await CarModelService.delete(id);
      await getData();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const deleteCarModelConfirmation = (id) => {
    openConfirmation({
      title: t('customDialog.title'),
      text: t('customDialog.text'),
      confirmButtonAction: () => {
        deleteCarModel(id);
      },
    });
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
  const navigate = useNavigate();
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({
                id, label, isSortable, sortKey,
              }) => {
                return (
                  <TableCell
                    key={id}
                  >
                    {
                      isSortable
                        ? (
                          <TableSortLabel
                            active={sortBy === sortKey}
                            direction={descending ? 'desc' : 'asc'}
                            onClick={() => handleRequestSort(sortKey)}
                          >
                            {label}
                          </TableSortLabel>
                        ) : label
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length ? data.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brandId.name}</TableCell>
                  <TableCell>
                    {item.yearStart}
                    {item.yearEnd ? ' - ' : t('carModel.noData')}
                    {item.yearEnd}
                  </TableCell>
                  <TableCell>
                    <ul className="carModel__powerUnits">
                      {(item.powerUnits || []).map((powerUnit, index) => {
                        return (
                          // eslint-disable-next-line react/no-array-index-key
                          <li className="carModel__powerUnits-li" key={index}>
                            <b>{t('carModel.engineVolume')}</b>
                            {powerUnit.engineVolume}
                            <br />
                            <b>{t('carModel.fuelType')}</b>
                            {t(`enum.FuelType.${powerUnit.fuelType}`)}
                            <br />
                            <b>{t('carModel.gearBox')}</b>
                            {t(`enum.GearBox.${powerUnit.gearBox}`)}
                            <br />
                            <b>{t('carModel.driveType')}</b>
                            {t(`enum.DriveType.${powerUnit.driveType}`)}
                          </li>
                        );
                      })}
                    </ul>
                  </TableCell>
                  <TableCell>
                    {(item.extraFeaturesIds || []).map((extrafeature) => {
                      return (
                        <div key={extrafeature._id}>
                          {extrafeature.title}
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    {(item.bodyTypes || []).map((bodyTypes, index) => {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index}>
                          {t(`enum.BodyType.${bodyTypes}`)}
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      alignItems="center"
                      display="flex"
                    >
                      <IconButton
                        onClick={() => deleteCarModelConfirmation(item._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => navigate(`/car-model/edit/${item._id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Stack>
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
