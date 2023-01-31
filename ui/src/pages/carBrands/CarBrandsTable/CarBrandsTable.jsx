import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { CarBrandService } from '../../../services/carBrand.service';
import { CustomTable } from '../../../components/CustomTable';
import { useConfirmation } from '../../../hooks/useConfirmation';
import { TextInput } from '../../../components/fields/TextInput';
import { useFirstMountState } from '../../../hooks/useFirstMountState';

export const CarBrandsTable = () => {
  const { t } = useTranslation(['carBrands', 'customDialog']);
  const openConfirmation = useConfirmation();
  const navigate = useNavigate();
  const customTableRef = useRef(null);
  const isFirstMount = useFirstMountState();
  const [nameFilter, setNameFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

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
  }, [nameFilter, countryFilter]);

  const deleteCarBrand = async (id) => {
    try {
      await CarBrandService.delete(id);
      reloadTable();
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const deleteCarBrandConfirmation = (id) => {
    openConfirmation({
      title: t('customDialog:customDialog.titleCarBrand'),
      text: t('customDialog:customDialog.textCarBrand'),
      confirmButtonAction: () => {
        deleteCarBrand(id);
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
    if (countryFilter) {
      stringFilters.push({
        fieldName: 'country',
        values: [countryFilter],
        exactMatch: false,
      });
    }
    return CarBrandService.search({
      limit,
      offset,
      sortField,
      descending,
      stringFilters,
    });
  };

  const responseAdapter = ({ carBrands, count }) => ({
    items: carBrands,
    count,
  });

  const columns = [
    {
      accessor: 'name',
      Header: t('carBrands.name'),
    },
    {
      accessor: 'country',
      Header: t('carBrands.country'),
    },
    {
      accessor: 'actions',
      Header: t('carBrands.actions'),
      width: '10%',
      Cell({ row: { original } }) {
        return (
          <Stack direction="row">
            <IconButton
              onClick={() => deleteCarBrandConfirmation(original.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/car-brands/edit/${original.id}`)}
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
            label="Name Filter"
          />
        </div>
        <TextInput
          fullWidth={false}
          value={countryFilter}
          onChange={setCountryFilter}
          label="Country Filter"
        />
      </Stack>
      <CustomTable
        ref={customTableRef}
        columns={columns}
        sortableFields={['name', 'country']}
        defaultOrderBy="name"
        defaultOrderDescending={false}
        requestAdapter={requestAdapter}
        requestFunction={requestFunction}
        responseAdapter={responseAdapter}
      />
    </div>
  );
};
