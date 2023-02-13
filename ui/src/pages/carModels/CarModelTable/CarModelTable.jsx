import {
  IconButton, Stack,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from '../../../hooks/useConfirmation';
import { CarModelService } from '../../../services/carModel.service';
import './index.scss';
import { TextInput } from '../../../components/fields/TextInput';
import { CustomTable } from '../../../components/CustomTable';
import { useFirstMountState } from '../../../hooks/useFirstMountState';

export const CarModelTable = () => {
  const navigate = useNavigate();
  const openConfirmation = useConfirmation();
  const { t } = useTranslation(['carModel', 'customDialog', 'enums']);
  const customTableRef = useRef(null);
  const isFirstMount = useFirstMountState();
  const [nameFilter, setNameFilter] = useState('');
  const [yearsFilter, setYearsFilter] = useState('');

  const reloadTable = () => {
    customTableRef.current?.getTableData();
  };

  const onFilterChanged = () => {
    customTableRef.current?.onFilterChanged();
  };

  useEffect(() => {
    if (!isFirstMount) {
      onFilterChanged();
    }
  }, [nameFilter, yearsFilter]);

  const deleteCarModel = async (id) => {
    try {
      await CarModelService.delete(id);
      reloadTable();
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const deleteCarModelConfirmation = (id) => {
    openConfirmation({
      title: t('customDialog:customDialog.title'),
      text: t('customDialog:customDialog.text'),
      confirmButtonAction: () => {
        deleteCarModel(id);
      },
    });
  };

  const requestAdapter = ({
    limit,
    offset,
    orderBy,
    orderDescending,
  }) => ({
    limit,
    offset,
    sortField: orderBy,
    descending: orderDescending,
  });

  const requestFunction = (args) => {
    const {
      limit,
      offset,
      sortField,
      descending,
    } = args;

    const stringFilters = [];

    if (nameFilter) {
      stringFilters.push({
        fieldName: 'name',
        values: [nameFilter],
        exactMatch: false,
      });
    }
    if (yearsFilter) {
      stringFilters.push({
        fieldName: 'yearStart',
        values: [yearsFilter],
        exactMatch: true,
      });
    }
    return CarModelService.search({
      limit,
      offset,
      sortField,
      descending,
      stringFilters,
    });
  };

  const responseAdapter = ({ carModels, count }) => ({
    items: carModels.map((carModel) => ({
      name: carModel.name,
      id: carModel.id,
      bodyTypes: carModel.bodyTypes
        .map((bodyType) => t(`enums:enums.BodyType.${bodyType}`))
        .join(', '),
      years: `${carModel.yearStart} - ${carModel.yearEnd || t('carModel:carModel.noData')}`,
      brandName: carModel.brandId?.name || '',
      extraFeatures: carModel.extraFeaturesIds
        .map((extraFeature) => extraFeature.title)
        .join(', '),
      powerUnits: carModel.powerUnits,
    })),
    count,
  });

  const columns = [
    {
      accessor: 'name',
      Header: t('carModel:carModel.name'),
    },
    {
      accessor: 'brandName',
      Header: t('carModel:carModel.brandName'),
    },
    {
      accessor: 'years',
      Header: t('carModel:carModel.years'),
    },
    {
      accessor: 'powerUnits',
      Header: t('carModel:carModel.powerUnits'),
      Cell({ row: { original } }) {
        return (
          <ul className="carModel__powerUnits">
            {(original.powerUnits || []).map((powerUnit, index) => {
              return (
                <li
                  className="carModel__powerUnits-li"
                  // eslint-disable-next-line
                  key={index}
                >
                  <b>{t('carModel:carModel.engineVolume')}</b>
                  {powerUnit.engineVolume}
                  <br />
                  <b>{t('carModel:carModel.fuelType')}</b>
                  {t(`enums:enums.FuelType.${powerUnit.fuelType}`)}
                  <br />
                  <b>{t('carModel:carModel.gearBox')}</b>
                  {t(`enums:enums.GearBox.${powerUnit.gearBox}`)}
                  <br />
                  <b>{t('carModel:carModel.driveType')}</b>
                  {t(`enums:enums.DriveType.${powerUnit.driveType}`)}
                </li>
              );
            })}
          </ul>
        );
      },
    },
    {
      accessor: 'extraFeatures',
      Header: t('carModel:carModel.extraFeatures'),
    },
    {
      accessor: 'bodyTypes',
      Header: t('carModel:carModel.bodyTypes'),
    },
    {
      accessor: 'actions',
      Header: t('carBrands.actions'),
      width: '10%',
      Cell({ row: { original } }) {
        return (
          <Stack direction="row">
            <IconButton
              onClick={() => deleteCarModelConfirmation(original.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/car-model/edit/${original.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <div>
      <Stack direction="row">
        <div style={{ marginRight: 12 }}>
          <TextInput
            fullWidth={false}
            value={nameFilter}
            onChange={setNameFilter}
            label={t('carModel:carModel.name')}
          />
        </div>
        <TextInput
          fullWidth={false}
          value={yearsFilter}
          onChange={setYearsFilter}
          label={t('carModel:carModel.years')}
        />
      </Stack>
      <CustomTable
        ref={customTableRef}
        columns={columns}
        sortableFields={['name', 'years']}
        defaultOrderBy="name"
        defaultOrderDescending={false}
        requestAdapter={requestAdapter}
        requestFunction={requestFunction}
        responseAdapter={responseAdapter}
      />
    </div>
    // <div>
    //  <TableContainer>
    //    <Table>
    //      <TableHead>
    //        <TableRow>
    //          {columns.map(({
    //            id, label, isSortable, sortKey,
    //          }) => {
    //            return (
    //              <TableCell
    //                key={id}
    //              >
    //                {
    //                  isSortable
    //                    ? (
    //                      <TableSortLabel
    //                        active={sortBy === sortKey}
    //                        direction={descending ? 'desc' : 'asc'}
    //                        onClick={() => handleRequestSort(sortKey)}
    //                      >
    //                        {label}
    //                      </TableSortLabel>
    //                    ) : label
    //                }
    //              </TableCell>
    //            );
    //          })}
    //        </TableRow>
    //      </TableHead>
    //      <TableBody>
    //        {data?.length ? data.map((item) => {
    //          return (
    //            <TableRow key={item.id}>
    //              <TableCell>{item.name}</TableCell>
    //              <TableCell>{item.brandId.name}</TableCell>
    //              <TableCell>
    //                {item.yearStart}
    //                {item.yearEnd ? ' - ' : t('carModel:carModel.noData')}
    //                {item.yearEnd}
    //              </TableCell>
    //              <TableCell>
    //  <ul className="carModel__powerUnits">
    //    {(item.powerUnits || []).map((powerUnit) => {
    //      return (
    //        <li className="carModel__powerUnits-li" key={nanoid()}>
    //          <b>{t('carModel:carModel.engineVolume')}</b>
    //          {powerUnit.engineVolume}
    //          <br />
    //          <b>{t('carModel:carModel.fuelType')}</b>
    //          {t(`enums:enums.FuelType.${powerUnit.fuelType}`)}
    //          <br />
    //          <b>{t('carModel:carModel.gearBox')}</b>
    //          {t(`enums:enums.GearBox.${powerUnit.gearBox}`)}
    //          <br />
    //          <b>{t('carModel:carModel.driveType')}</b>
    //          {t(`enums:enums.DriveType.${powerUnit.driveType}`)}
    //        </li>
    //      );
    //    })}
    //  </ul>
    //              </TableCell>
    //              <TableCell>
    //                {(item.extraFeaturesIds || []).map((extrafeature) => {
    //                  return (
    //                    <div key={extrafeature.id}>
    //                      {extrafeature.title}
    //                    </div>
    //                  );
    //                })}
    //              </TableCell>
    //              <TableCell>
    //                {(item.bodyTypes || []).map((bodyTypes) => {
    //                  return (
    //                    <div key={nanoid()}>
    //                      {t(`enums:enums.BodyType.${bodyTypes}`)}
    //                    </div>
    //                  );
    //                })}
    //              </TableCell>
    //              <TableCell>
    //                <Stack
    //                  direction="row"
    //                  alignItems="center"
    //                  display="flex"
    //                >
    //                  <IconButton
    //                    onClick={() => deleteCarModelConfirmation(item.id)}
    //                    color="error"
    //                  >
    //                    <DeleteIcon />
    //                  </IconButton>
    //                  <IconButton
    //                    onClick={() => navigate(`/car-model/edit/${item.id}`)}
    //                  >
    //                    <EditIcon />
    //                  </IconButton>
    //                </Stack>
    //              </TableCell>
    //            </TableRow>
    //          );
    //        }) : null}
    //      </TableBody>
    //    </Table>
    //  </TableContainer>
    //  <TablePagination
    //    labelRowsPerPage={t('carBrands:carBrands.labelRowsPerPage')}
    //    rowsPerPageOptions={[5, 10, 25]}
    //    component="div"
    //    count={totalCount}
    //    rowsPerPage={rowsPerPage}
    //    page={page}
    //    onPageChange={handleChangePage}
    //    onRowsPerPageChange={handleChangeRowsPerPage}

  //  />
  // </div>
  );
};
