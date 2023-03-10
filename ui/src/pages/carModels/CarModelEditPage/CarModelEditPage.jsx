import {
  Typography, Box, Stack, Button, Container, Grid, IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { CarModelService } from '../../../services/carModel.service';
import { CustomSelect } from '../../../components/fields/CustomSelect';
import { CarBrandService } from '../../../services/carBrand.service';
import { ExtraFeatureService } from '../../../services/extraFeature.service';
import { useBodyTypeOptions } from '../../../hooks/staticOptions/useBodyTypeOptions';
import { useDriveTypeOptions } from '../../../hooks/staticOptions/useDriveTypeOptions';
import { useFuelTypeOptions } from '../../../hooks/staticOptions/useFuelTypeOptions';
import { useGearBoxOptions } from '../../../hooks/staticOptions/useGearBoxOptions';
import { TextInput } from '../../../components/fields/TextInput';
import { getValidationSchema } from './validation.schema';
import {
  mapFormToInsertModel,
  mapModelToFormValues,
} from './carModelEditPage.logic';
import { CustomTextInput } from '../../../components/fields/CustomTextInput';
import { CustomDatePicker } from '../../../components/fields/CustomDatePicker';

const getCarModelOptions = (brandNameFilter = '') => {
  const requestModel = {};
  if (brandNameFilter) {
    requestModel.stringFilters = [
      {
        fieldName: 'name',
        values: [brandNameFilter],
        exactMatch: false,
      },
    ];
  }
  return CarBrandService.search(requestModel)
    .then((result) => {
      return result.carBrands;
    });
};

const getExtraFeaturesOptions = (titleFilter = '') => {
  const requestModel = {};
  if (titleFilter) {
    requestModel.stringFilters = [
      {
        fieldName: 'title',
        values: [titleFilter],
        exactMatch: false,
      },
    ];
  }
  return ExtraFeatureService.search(requestModel)
    .then((result) => {
      return result.extraFeature;
    });
};

export const CarModelEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation('carModel', 'toast', 'carBrands', 'extraFeature', 'validationErrors');
  const navigate = useNavigate();
  const bodyTypeOptions = useBodyTypeOptions();
  const driveTypeOptions = useDriveTypeOptions();
  const fuelTypeOptions = useFuelTypeOptions();
  const gearBoxOptions = useGearBoxOptions();
  const [notUniquePowerUnitsIndexes, setNotUniquePowerUnitsIndexes] = useState([]);

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
    defaultValues: {
      powerUnits: [
        {
          engineVolume: 0,
          fuelType: fuelTypeOptions[0],
          gearBox: gearBoxOptions[0],
          driveType: driveTypeOptions[0],
        },
      ],
    },
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const yearStartWatcher = watch('yearStart');

  useEffect(() => {
    trigger('yearEnd');
  }, [yearStartWatcher]);

  const checkPowerUnitsUnique = () => {
    const powerUnits = getValues('powerUnits');
    const powerUnitsCompoundValues = powerUnits.map((powerUnit) => {
      return `${powerUnit.engineVolume}-${powerUnit.fuelType?.value}-${powerUnit.gearBox?.value}-${powerUnit.driveType?.value}`;
    });
    const innerNotUniquePowerUnitsIndexes = [];
    powerUnitsCompoundValues.forEach((value, index) => {
      if (powerUnitsCompoundValues.indexOf(value) !== powerUnitsCompoundValues.lastIndexOf(value)) {
        innerNotUniquePowerUnitsIndexes.push(index);
      }
    });
    setNotUniquePowerUnitsIndexes(innerNotUniquePowerUnitsIndexes);

    return !innerNotUniquePowerUnitsIndexes.length;
  };

  const {
    fields: powerUnitsFields,
    append: appendPowerUnit,
    remove: removePowerUnit,
  } = useFieldArray({
    control,
    name: 'powerUnits',
  });

  const addPowerUnit = () => {
    appendPowerUnit({
      engineVolume: 0,
      fuelType: fuelTypeOptions[0],
      gearBox: gearBoxOptions[0],
      driveType: driveTypeOptions[0],
    });
  };

  const createCarModel = async (form) => {
    const model = mapFormToInsertModel(form);
    try {
      if (id) {
        await CarModelService.patchModelById(id, model);
      } else {
        await CarModelService.create(model);
      }

      toast.success(id ? t('toast:toast.successfullyUpdated') : t('toast:toast.successfullyCreated'));

      navigate('/car-model');
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const onSubmit = async (value) => {
    if (checkPowerUnitsUnique()) {
      createCarModel(value);
    }
  };

  const getModelById = async (modelId) => {
    try {
      const result = await CarModelService.getModelById(modelId);
      reset(mapModelToFormValues({
        model: result,
        fuelTypeOptions,
        gearBoxOptions,
        driveTypeOptions,
        bodyTypeOptions,
      }));
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };
  useEffect(() => {
    if (id) {
      getModelById(id);
    }
  }, []);

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
                <CustomTextInput name="name" label={t('carModel:carModel.name')} control={control} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  control={control}
                  name="brandOption"
                  searchCallback={getCarModelOptions}
                  id="brandOption"
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  label={t('carBrands:carBrands.title')}
                  getOptionLabel={(option) => option.name || ''}
                  ifNoValue={null}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  control={control}
                  name="yearStart"
                  id="yearStart"
                  label={t('carModel:carModel.yearStart')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  control={control}
                  name="yearEnd"
                  id="yearEnd"
                  label={t('carModel:carModel.yearEnd')}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
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
              <Grid item xs={12} md={6}>
                <CustomSelect
                  ifNoValue={[]}
                  control={control}
                  name="bodyTypes"
                  multiple
                  options={bodyTypeOptions}
                  id="bodyTypes"
                  label={t('carModel:carModel.bodyTypes')}
                  getOptionLabel={(option) => option.title || ''}
                  isOptionEqualToValue={(option, val) => val.value === option.value}
                />
              </Grid>
            </Grid>
            <Typography
              variant="h4"
              component="h4"
            >
              {t('carModel:carModel.powerUnits')}
            </Typography>
            <div>
              {powerUnitsFields.map((powerUnitsField, index) => {
                return (
                  <Grid
                    key={powerUnitsField.id}
                    container
                    spacing={2}
                    marginBottom={3}
                  >
                    <Grid item xs={5} md={2}>
                      <Controller
                        control={control}
                        name={`powerUnits.${index}.engineVolume`}
                        render={({
                          field: {
                            onChange,
                            value,
                            onBlur,
                          },
                          fieldState: { error },
                        }) => {
                          const isFieldValid = error ? false : undefined;
                          const errorText = isFieldValid === false ? error?.message : '';
                          return (
                            <TextInput
                              type="number"
                              onBlur={() => {
                                checkPowerUnitsUnique();
                                onBlur();
                              }}
                              sx={{ marginTop: 2 }}
                              onChange={(newValue) => onChange(newValue || '')}
                              value={value}
                              id={`powerUnits.${index}.engineVolume`}
                              label={t('carModel:carModel.engineVolume')}
                              helperText={errorText || ''}
                              error={!!errorText}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={5} md={3}>
                      <CustomSelect
                        control={control}
                        name={`powerUnits.${index}.fuelType`}
                        id={`powerUnits.${index}.fuelType`}
                        label={t('carModel:carModel.fuelType')}
                        options={fuelTypeOptions}
                        getOptionLabel={(option) => option.title || ''}
                        isOptionEqualToValue={(option, val) => option.value === val.value}
                        ifNoValue={null}
                        checkPowerUnitsUnique={checkPowerUnitsUnique}
                      />
                    </Grid>
                    <Grid item xs={5} md={3}>
                      <CustomSelect
                        control={control}
                        name={`powerUnits.${index}.gearBox`}
                        id={`powerUnits.${index}.gearBox`}
                        label={t('carModel:carModel.gearBox')}
                        options={gearBoxOptions}
                        getOptionLabel={(option) => option.title || ''}
                        isOptionEqualToValue={(option, val) => option.value === val.value}
                        ifNoValue={null}
                        checkPowerUnitsUnique={checkPowerUnitsUnique}
                      />
                    </Grid>
                    <Grid item xs={5} md={3}>
                      <CustomSelect
                        control={control}
                        name={`powerUnits.${index}.driveType`}
                        id={`powerUnits.${index}.driveType`}
                        label={t('carModel:carModel.driveType')}
                        options={driveTypeOptions}
                        getOptionLabel={(option) => option.title || ''}
                        isOptionEqualToValue={(option, val) => option.value === val.value}
                        ifNoValue={null}
                        checkPowerUnitsUnique={checkPowerUnitsUnique}
                      />
                    </Grid>
                    <Grid item xs={2} md={1}>
                      {powerUnitsFields.length !== 1 && (
                        <IconButton
                          style={{ marginTop: 24 }}
                          onClick={() => removePowerUnit(index)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Grid>
                    {notUniquePowerUnitsIndexes.includes(index) && (
                      <Grid item>
                        <div style={{ color: 'red' }}>
                          {t('validationErrors:validationErrors.notUnique')}
                        </div>
                      </Grid>
                    )}
                    {powerUnitsFields.length - 1 !== index && (
                      <Grid item xs={12}>
                        <hr />
                      </Grid>
                    )}
                  </Grid>
                );
              })}
              <Stack spacing={2} direction="row">
                <Button
                  onClick={addPowerUnit}
                  variant="outlined"
                >
                  {t('carModel:carModel.addPowerUnit')}
                </Button>
              </Stack>
            </div>
            <Stack
              marginTop={2}
              spacing={5}
              direction="row"
              alignItems="center"
            >
              <Button
                disabled={((isSubmitted || isDirty) && !isValid)
                  || !!notUniquePowerUnitsIndexes.length}
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
