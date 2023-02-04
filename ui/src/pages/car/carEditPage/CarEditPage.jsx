import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Container, Grid, Stack, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomDatePicker } from '../../../components/fields/CustomDatePicker';
import { CustomSelect } from '../../../components/fields/CustomSelect';
import { CustomTextInput } from '../../../components/fields/CustomTextInput';
import { CarService } from '../../../services/car.service';
import { CarModelService } from '../../../services/carModel.service';
import { mapCarToFormValues, mapFormToInsertModel } from './carEditPage.logic';
import { getValidationSchema } from './validation.schema';

export const CarEditPage = () => {
  const [modelId, setModelId] = useState('');
  const { id } = useParams();
  const { t } = useTranslation('carModel', 'toast', 'carBrands', 'extraFeature', 'validationErrors');
  const navigate = useNavigate();

  const schema = getValidationSchema(t);

  const {
    handleSubmit,
    control,
    getValues,
    trigger,
    watch,
    reset,
    formState: {
      isDirty,
      isValid,
      isSubmitted,
    },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const createCar = async (form) => {
    const model = mapFormToInsertModel(form);
    try {
      if (id) {
        await CarService.patchCarById(id, model);
      } else {
        await CarService.create(model);
      }

      toast.success(id ? t('toast:toast.successfullyUpdated') : t('toast:toast.successfullyCreated'));

      navigate('/car-model');
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const onSubmit = async (value) => {
    createCar(value);
  };

  const getCarById = async (model) => {
    try {
      const result = await CarService.getCarById(model);
      reset(mapCarToFormValues({
        model: result,
      }));
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  useEffect(() => {
    if (id) {
      getCarById(id);
    }
  }, []);
  const getCarModelOptions = (modelNameFilter = '') => {
    const requestModel = {};
    if (modelNameFilter) {
      requestModel.stringFilters = [
        {
          fieldName: 'name',
          values: [modelNameFilter],
          exactMatch: false,
        },
      ];
    }
    return CarModelService.search(requestModel)
      .then((result) => {
        return result.carModels;
      });
  };

  const modelStartWatcher = watch('carModel');
  useEffect(() => {
    setModelId(getValues('carModel'));
  }, [modelStartWatcher]);

  const getExtraFeaturesOptions = () => {
    return CarModelService.getModelById()
      .then((result) => {
        return result.extraFeaturesIds;
      });
  };
  return (
    <div>
      <Container>
        <Box
          component="div"
          sx={{ margin: '15px' }}
        >
          <Typography
            variant="h4"
            component="h4"
          >
            {t('carModel:carModel.title')}
          </Typography>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={2}
            >
              <Grid item xs={12} md={6}>
                <CustomSelect
                  control={control}
                  name="carModel"
                  searchCallback={getCarModelOptions}
                  id="carModel"
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  label={t('carModel:carModel.title')}
                  getOptionLabel={(option) => option.name || ''}
                  ifNoValue={null}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  ifNoValue={[]}
                  control={control}
                  name="extraFeaturesOptions"
                  multiple
                  searchCallback={getExtraFeaturesOptions}
                  id="extraFeaturesOptions"
                  label={t('extraFeature:extraFeature.title')}
                  getOptionLabel={(option) => option.title || ''}
                  isOptionEqualToValue={(option, val) => val.id === option.id}
                />
              </Grid>
            </Grid>

            <Stack
              marginTop={2}
              spacing={5}
              direction="row"
              alignItems="center"
            >
              <Button
                disabled={(isSubmitted || isDirty) && !isValid}
                type="submit"
                variant="contained"
              >
                {t('carBrands:carBrands.save')}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </div>
  );
};
