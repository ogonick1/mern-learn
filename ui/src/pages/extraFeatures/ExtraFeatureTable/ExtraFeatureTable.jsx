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
import { ExtraFeatureService } from '../../../services/extraFeature.service';
import { TextInput } from '../../../components/fields/TextInput';
import { CustomTable } from '../../../components/CustomTable';
import { useFirstMountState } from '../../../hooks/useFirstMountState';

export const ExtraFeatureTable = () => {
  const openConfirmation = useConfirmation();
  const { t } = useTranslation(['extraFeature', 'customDialog', 'carBrands']);
  const navigate = useNavigate();
  const customTableRef = useRef(null);
  const isFirstMount = useFirstMountState();
  const [titleFilter, setTitleFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');

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
  }, [titleFilter, descriptionFilter]);

  const deleteExtraFeature = async (id) => {
    try {
      await ExtraFeatureService.delete(id);
      reloadTable();
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const deleteExtraFeatureConfirmation = (id) => {
    openConfirmation({
      title: t('customDialog:customDialog.titleExtraFeature'),
      text: t('customDialog:customDialog.textExtraFeature'),
      confirmButtonAction: () => {
        deleteExtraFeature(id);
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

    if (titleFilter) {
      stringFilters.push({
        fieldName: 'title',
        values: [titleFilter],
        exactMatch: false,
      });
    }
    if (descriptionFilter) {
      stringFilters.push({
        fieldName: 'description',
        values: [descriptionFilter],
        exactMatch: false,
      });
    }
    return ExtraFeatureService.search({
      limit,
      offset,
      sortField,
      descending,
      stringFilters,
    });
  };
  const responseAdapter = ({ extraFeature, count }) => ({
    items: extraFeature,
    count,
  });

  const columns = [
    {
      accessor: 'title',
      Header: t('extraFeature:extraFeature.title'),
    },
    {
      accessor: 'description',
      Header: t('extraFeature:extraFeature.description'),
    },
    {
      accessor: 'actions',
      Header: t('extraFeature:extraFeature.actions'),
      width: '10%',
      Cell({ row: { original } }) {
        return (
          <Stack direction="row">
            <IconButton
              onClick={() => deleteExtraFeatureConfirmation(original.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/extra-feature/edit/${original.id}`)}
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
            value={titleFilter}
            onChange={setTitleFilter}
            label={t('extraFeature:extraFeature.titleFilter')}
          />
        </div>
        <TextInput
          fullWidth={false}
          value={descriptionFilter}
          onChange={setDescriptionFilter}
          label={t('extraFeature:extraFeature.descriptionFilter')}
        />
      </Stack>
      <CustomTable
        ref={customTableRef}
        columns={columns}
        sortableFields={['title', 'description']}
        defaultOrderBy="title"
        defaultOrderDescending={false}
        requestAdapter={requestAdapter}
        requestFunction={requestFunction}
        responseAdapter={responseAdapter}
      />
    </div>
  );
};
