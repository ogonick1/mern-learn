/* eslint-disable */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Container, Grid, Stack, Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomDatePicker } from '../../../components/fields/CustomDatePicker';
import { CustomSelect } from '../../../components/fields/CustomSelect';
import { CustomTextInput } from '../../../components/fields/CustomTextInput';
import { useBodyTypeOptions } from '../../../hooks/staticOptions/useBodyTypeOptions';
import { useDriveTypeOptions } from '../../../hooks/staticOptions/useDriveTypeOptions';
import { useFuelTypeOptions } from '../../../hooks/staticOptions/useFuelTypeOptions';
import { useGearBoxOptions } from '../../../hooks/staticOptions/useGearBoxOptions';
import { CarService } from '../../../services/car.service';
import { CarModelService } from '../../../services/carModel.service';
import { mapCarToFormValues, mapFormToInsertModel } from './carEditPage.logic';
import { getValidationSchema } from './validation.schema';
import { useOptionsHelper } from './useOptionsHelper';

export const CarEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation('carModel', 'toast', 'carBrands', 'extraFeature', 'validationErrors');
  const navigate = useNavigate();

  const schema = getValidationSchema(t);
  const {
    getPowerUnitOptionLabel,
    getBodyTypeOptionLabel,
  } = useOptionsHelper();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
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

  const carModelOptionWatcher = watch('carModelOption');

  const onSubmit = async (formValues) => {
    const model = mapFormToInsertModel(formValues);
    try {
      if (id) {
        await CarService.patchCarById(id, model);
      } else {
        await CarService.create(model);
      }

      toast.success(id ? t('toast:toast.successfullyUpdated') : t('toast:toast.successfullyCreated'));

      navigate('/car');
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const getCarById = async (model) => {
    try {
      const result = await CarService.getCarById(model);
      reset(mapCarToFormValues(result));
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

  const optionsByCarModel = useMemo(() => {
    return {
      powerUnitOptions: carModelOptionWatcher?.powerUnits || [],
      bodyTypeOptions: carModelOptionWatcher?.bodyTypes || [],
      extraFeaturesOptions: carModelOptionWatcher?.extraFeaturesIds || [],
    };
  }, [carModelOptionWatcher]);

  useEffect(() => {
    const selectedPowerUnit = getValues('powerUnit');
    const selectedBodyType = getValues('bodyType');
    const selectedExtraFeaturesOptions = getValues('extraFeaturesOptions');

    const isPowerUnitInCarModel = optionsByCarModel.powerUnitOptions
      .some((powerUnitOption) => getPowerUnitOptionLabel(powerUnitOption)
        === getPowerUnitOptionLabel(selectedPowerUnit));

    const isBodyTypeInCarModel = optionsByCarModel.bodyTypeOptions
      .some((bodyTypeOption) => selectedBodyType === bodyTypeOption);

    if (!isPowerUnitInCarModel) {
      setValue('powerUnit', null);
    }
    if (!isBodyTypeInCarModel) {
      setValue('bodyType', null);
    }

    const allowedExtraFeaturesIds = optionsByCarModel.extraFeaturesOptions.map(({ id }) => id);
    const newExtraFeaturesOptions = (selectedExtraFeaturesOptions || [])
      .filter(({ id }) => allowedExtraFeaturesIds.includes(id));

    setValue('extraFeaturesOptions', newExtraFeaturesOptions);
  }, [optionsByCarModel]);

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
                  name="carModelOption"
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
                  control={control}
                  name="powerUnit"
                  id="powerUnit"
                  label={t('car:car.powerUnit')}
                  options={optionsByCarModel.powerUnitOptions}
                  getOptionLabel={getPowerUnitOptionLabel}
                  isOptionEqualToValue={(option, val) => getPowerUnitOptionLabel(option) === getPowerUnitOptionLabel(val)}
                  ifNoValue={null}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <CustomDatePicker
                  maxDate={new Date(yearEnd.toString())}
                  minDate={new Date(yearStart.toString())}
                  control={control}
                  name="year"
                  id="year"
                  label={t('carModel:carModel.year')}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  ifNoValue={null}
                  control={control}
                  name="bodyType"
                  options={optionsByCarModel.bodyTypeOptions}
                  getOptionLabel={getBodyTypeOptionLabel}
                  id="bodyType"
                  label={t('car:car.bodyType')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  ifNoValue={[]}
                  control={control}
                  name="extraFeaturesOptions"
                  multiple
                  options={optionsByCarModel.extraFeaturesOptions}
                  id="extraFeaturesOptions"
                  label={t('extraFeature:extraFeature.title')}
                  getOptionLabel={(option) => option.title || ''}
                  isOptionEqualToValue={(option, val) => val.id === option.id}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <CustomTextInput
                  control={control}
                  name="color"
                  label={t('car:car.color')}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <CustomTextInput
                  control={control}
                  name="plateNumber"
                  label={t('car:car.plateNumber')}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <CustomDatePicker
                  showYearPicker={false}
                  minDate={new Date(yearRegistration)}
                  control={control}
                  name="plateNumberRegistrationDate"
                  id="plateNumberRegistrationDate"
                  label={t('car:car.plateNumberRegistrationDate')}
                  dateFormat="dd/MM/yyyy"
                /> */}
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
