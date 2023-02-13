import {
  IconButton, Stack,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useConfirmation } from '../../../hooks/useConfirmation';
import './index.scss';
import { TextInput } from '../../../components/fields/TextInput';
import { CustomTable } from '../../../components/CustomTable';
import { useFirstMountState } from '../../../hooks/useFirstMountState';
import { CarService } from '../../../services/car.service';

export const CarTable = () => {
  const navigate = useNavigate();
  const openConfirmation = useConfirmation();
  const { t } = useTranslation(['car', 'carModel', 'customDialog', 'enums']);
  const customTableRef = useRef(null);
  const isFirstMount = useFirstMountState();
  const [colorFilter, setColorFilter] = useState('');
  const [plateNumberFilter, setPlateNumberFilter] = useState('');

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
  }, [colorFilter, plateNumberFilter]);

  const deleteCar = async (id) => {
    try {
      await CarService.delete(id);
      reloadTable();
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const deleteCarConfirmation = (id) => {
    openConfirmation({
      title: t('customDialog:customDialog.title'),
      text: t('customDialog:customDialog.text'),
      confirmButtonAction: () => {
        deleteCar(id);
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

    if (colorFilter) {
      stringFilters.push({
        fieldName: 'color',
        values: [colorFilter],
        exactMatch: false,
      });
    }
    if (plateNumberFilter) {
      stringFilters.push({
        fieldName: 'plateNumber',
        values: [plateNumberFilter],
        exactMatch: false,
      });
    }
    return CarService.search({
      limit,
      offset,
      sortField,
      descending,
      stringFilters,
    });
  };

  const responseAdapter = ({ car, count }) => ({
    items: car.map((carItem) => ({
      name: carItem.carModelId?.name,
      powerUnit: carItem.powerUnit,
      id: carItem.id,
      year: carItem.year,
      bodyType: t(`enums:enums.BodyType.${carItem.bodyType}`),
      extraFeatures: carItem.extraFeaturesIds
        .map((extraFeature) => extraFeature.title)
        .join(', '),
      color: carItem.color,
      plateNumber: carItem.plateNumber,
      plateNumberRegistrationDate: dayjs(carItem.plateNumberRegistrationDate).format('DD/MM/YYYY'),
    })),
    count,
  });

  const columns = [
    {
      accessor: 'name',
      Header: t('car:car.name'),
    },
    {
      accessor: 'powerUnit',
      Header: t('car:car.powerUnit'),
      Cell({ row: { original } }) {
        return (
          <ul className="carModel__powerUnit">
            <li
              className="carModel__powerUnit-li"
            >
              <b>{t('car:car.engineVolume')}</b>
              {original.powerUnit.engineVolume}
              <br />
              <b>{t('car:car.fuelType')}</b>
              {t(`enums:enums.FuelType.${original.powerUnit.fuelType}`)}
              <br />
              <b>{t('car:car.gearBox')}</b>
              {t(`enums:enums.GearBox.${original.powerUnit.gearBox}`)}
              <br />
              <b>{t('car:car.driveType')}</b>
              {t(`enums:enums.DriveType.${original.powerUnit.driveType}`)}
            </li>
          </ul>
        );
      },
    },
    {
      accessor: 'year',
      Header: t('car:car.year'),
    },
    {
      accessor: 'bodyType',
      Header: t('car:car.bodyType'),
    },
    {
      accessor: 'extraFeatures',
      Header: t('car:car.extraFeatures'),
    },
    {
      accessor: 'color',
      Header: t('car:car.color'),
    },
    {
      accessor: 'plateNumber',
      Header: t('car:car.plateNumber'),
    },
    {
      accessor: 'plateNumberRegistrationDate',
      Header: t('car:car.plateNumberRegistrationDate'),
    },
    {
      accessor: 'actions',
      Header: t('car:car.actions'),
      width: '10%',
      Cell({ row: { original } }) {
        return (
          <Stack direction="row">
            <IconButton
              onClick={() => deleteCarConfirmation(original.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/car/edit/${original.id}`)}
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
            value={colorFilter}
            onChange={setColorFilter}
            label={t('car:car.color')}
          />
        </div>
        <TextInput
          fullWidth={false}
          value={plateNumberFilter}
          onChange={setPlateNumberFilter}
          label={t('car:car.plateNumber')}
        />
      </Stack>
      <CustomTable
        ref={customTableRef}
        columns={columns}
        sortableFields={['name', 'year']}
        defaultOrderBy="name"
        defaultOrderDescending={false}
        requestAdapter={requestAdapter}
        requestFunction={requestFunction}
        responseAdapter={responseAdapter}
      />
    </div>
  );
};
