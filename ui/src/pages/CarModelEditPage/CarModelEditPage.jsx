import {
  TextField, Typography, Box, Stack, Button, Container, Grid, IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import { CarModelService } from '../../services/carModel.service';
import { CustomSelect } from '../../components/fields/CustomSelect';
import { CarBrandService } from '../../services/carBrand.service';
import { ExtraFeatureService } from '../../services/extraFeature.service';
import { useBodyTypeOptions } from '../../hooks/staticOptions/useBodyTypeOptions';
import { useDriveTypeOptions } from '../../hooks/staticOptions/useDriveTypeOptions';
import { useFuelTypeOptions } from '../../hooks/staticOptions/useFuelTypeOptions';
import { useGearBoxOptions } from '../../hooks/staticOptions/useGearBoxOptions';
import { TextInput } from '../../components/fields/TextInput';

const getCarModelOptions = () => {
  return CarBrandService.search()
    .then((result) => {
      return result.carBrands;
    });
};

const getExtraFeaturesOptions = () => {
  return ExtraFeatureService.search()
    .then((result) => {
      return result.extraFeature;
    });
};

export const CarModelEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const bodyTypeOptions = useBodyTypeOptions();
  const driveTypeOptions = useDriveTypeOptions();
  const fuelTypeOptions = useFuelTypeOptions();
  const gearBoxOptions = useGearBoxOptions();
  const [notUniquePowerUnitsIndexes, setNotUniquePowerUnitsIndexes] = useState([]);

  const schema = yup
    .object()
    .shape({
      name: yup.string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.minMaxLength', { min: 3, max: 20 }))
        .max(20, t('validationErrors.minMaxLength', { min: 3, max: 20 })),
      yearStart: yup.date('error')
        .typeError()
        .min(1970)
        .required(t('validationErrors.required')),
      yearEnd: yup.date()
        .optional()
        .typeError()
        .when('yearStart', (yearStart, field) => (yearStart ? field.min(yup.ref('yearStart'), t('validationErrors.yearsEnd')) : field)),
      brandOption: yup.object()
        .required(t('validationErrors.required')),
      extraFeaturesOptions: yup.array(),
      powerUnits: yup.array()
        .of(
          yup.object().shape({
            engineVolume: yup.number(t('validationErrors.volume'))
              .typeError(t('validationErrors.volume'))
              .min(0, t('validationErrors.volume'))
              .integer(t('validationErrors.volume'))
              .max(10000, t('validationErrors.volume')),
            fuelType: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors.required')),
            gearBox: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors.required')),
            driveType: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors.required')),
          }),
        ),
      bodyTypes: yup.array().min(1, t('validationErrors.required')).required(t('validationErrors.required')),
    });
  const {
    handleSubmit,
    control,
    getValues,
    trigger,
    watch,
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
    const model = {
      name: form.name,
      brandId: form.brandOption._id,
      extraFeaturesIds: form.extraFeaturesOptions.map(({ _id }) => _id),
      yearStart: form.yearStart?.getFullYear(),
      yearEnd: form.yearEnd?.getFullYear(),
      powerUnits: form.powerUnits.map((powerUnit) => ({
        engineVolume: powerUnit.engineVolume,
        fuelType: powerUnit.fuelType.value,
        gearBox: powerUnit.gearBox.value,
        driveType: powerUnit.driveType.value,
      })),
      bodyTypes: form.bodyTypes.map(({ value }) => value),
    };
    try {
      await CarModelService.create(model);
      navigate('/car-model');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onSubmit = async (value) => {
    if (checkPowerUnitsUnique()) {
      createCarModel(value);
    }
  };

  return (
    <div>
      <Container>
        <Box
          component="div"
          sx={{ margin: '15px' }}
        >
          <Typography variant="h4" component="h4">{t('carModel.title')}</Typography>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="name"
                  render={({
                    field: {
                      onChange, onBlur, value,
                    },
                    fieldState: { error },
                  }) => {
                    const isFieldValid = error ? false : undefined;
                    const errorText = isFieldValid === false ? error?.message : '';
                    return (
                      <TextField
                        // InputLabelProps={{ shrink: value }}
                        sx={{ marginBottom: 2, marginTop: 2 }}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        id="name"
                        fullWidth
                        label={t('carModel.name')}
                        helperText={errorText || ''}
                        error={!!errorText}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="brandOption"
                  render={({
                    field: {
                      onChange, onBlur, value,
                    },
                    fieldState: { error },
                  }) => {
                    const isFieldValid = error ? false : undefined;
                    const errorText = isFieldValid === false ? error?.message : '';
                    return (
                      <CustomSelect
                        searchCallback={getCarModelOptions}
                        id="brandOption"
                        label={t('carBrands.title')}
                        getOptionLabel={(option) => option.name || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || null}
                        errorText={errorText}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="yearStart"
                  render={({
                    field: {
                      onChange, onBlur, value,
                    },
                    fieldState: { error },
                  }) => {
                    const isFieldValid = error ? false : undefined;
                    const errorText = isFieldValid === false ? error?.message : '';
                    return (
                      <DatePicker
                        maxDate={new Date()}
                        customInput={(
                          <TextField
                            onBlur={onBlur}
                            label={t('carModel.yearStart')}
                            fullWidth
                            error={!!errorText}
                            helperText={errorText}
                          />
                        )}
                        selected={value}
                        onChange={onChange}
                        value={value || new Date()}
                        showYearPicker
                        label="qdwqwd"
                        dateFormat="yyyy"
                        id="yearStart"
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="yearEnd"
                  render={({
                    field: {
                      onChange, onBlur, value,
                    },
                    fieldState: { error },
                  }) => {
                    const isFieldValid = error ? false : undefined;
                    const errorText = isFieldValid === false ? error?.message : '';
                    return (
                      <DatePicker
                        maxDate={new Date()}
                        customInput={(
                          <TextField
                            onBlur={onBlur}
                            label={t('carModel.yearEnd')}
                            fullWidth
                            error={!!errorText}
                            helperText={errorText}
                          />
                        )}
                        selected={value}
                        onChange={onChange}
                        value={value || new Date()}
                        showYearPicker
                        dateFormat="yyyy"
                        id="yearEnd"
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="extraFeaturesOptions"
                  render={({
                    field: {
                      onChange, onBlur, value,
                    },
                    fieldState: { error },
                  }) => {
                    const isFieldValid = error ? false : undefined;
                    const errorText = isFieldValid === false ? error?.message : '';
                    return (
                      <CustomSelect
                        multiple
                        searchCallback={getExtraFeaturesOptions}
                        id="extraFeaturesOptions"
                        label={t('extraFeature.title')}
                        getOptionLabel={(option) => option.title || ''}
                        isOptionEqualToValue={(option, val) => val._id === option._id}
                        onChange={onChange}
                        value={value || []}
                        onBlur={onBlur}
                        errorText={errorText}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="bodyTypes"
                  render={({
                    field: {
                      onChange, onBlur, value,
                    },
                    fieldState: { error },
                  }) => {
                    const isFieldValid = error ? false : undefined;
                    const errorText = isFieldValid === false ? error?.message : '';
                    return (
                      <CustomSelect
                        multiple
                        options={bodyTypeOptions}
                        id="bodyTypes"
                        label={t('carModel.bodyTypes')}
                        getOptionLabel={(option) => option.title || ''}
                        isOptionEqualToValue={(option, val) => val.value === option.value}
                        onChange={onChange}
                        value={value || []}
                        onBlur={onBlur}
                        errorText={errorText}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
            <Typography variant="h4" component="h4">{t('carModel.powerUnits')}</Typography>
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
                              label={t('carModel.engineVolume')}
                              helperText={errorText || ''}
                              error={!!errorText}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={5} md={3}>
                      <Controller
                        control={control}
                        name={`powerUnits.${index}.fuelType`}
                        render={({
                          field: {
                            onChange, onBlur, value,
                          },
                          fieldState: { error },
                        }) => {
                          const isFieldValid = error ? false : undefined;
                          const errorText = isFieldValid === false ? error?.message : '';
                          return (
                            <CustomSelect
                              id={`powerUnits.${index}.fuelType`}
                              label={t('carModel.fuelType')}
                              options={fuelTypeOptions}
                              getOptionLabel={(option) => option.title || ''}
                              isOptionEqualToValue={(option, val) => option.value === val.value}
                              onChange={onChange}
                              value={value || null}
                              onBlur={() => {
                                checkPowerUnitsUnique();
                                onBlur();
                              }}
                              errorText={errorText}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={5} md={3}>
                      <Controller
                        control={control}
                        name={`powerUnits.${index}.gearBox`}
                        render={({
                          field: {
                            onChange, onBlur, value,
                          },
                          fieldState: { error },
                        }) => {
                          const isFieldValid = error ? false : undefined;
                          const errorText = isFieldValid === false ? error?.message : '';
                          return (
                            <CustomSelect
                              id={`powerUnits.${index}.gearBox`}
                              label={t('carModel.gearBox')}
                              options={gearBoxOptions}
                              getOptionLabel={(option) => option.title || ''}
                              isOptionEqualToValue={(option, val) => option.value === val.value}
                              onChange={onChange}
                              value={value || null}
                              onBlur={() => {
                                checkPowerUnitsUnique();
                                onBlur();
                              }}
                              errorText={errorText}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={5} md={3}>
                      <Controller
                        control={control}
                        name={`powerUnits.${index}.driveType`}
                        render={({
                          field: {
                            onChange, onBlur, value,
                          },
                          fieldState: { error },
                        }) => {
                          const isFieldValid = error ? false : undefined;
                          const errorText = isFieldValid === false ? error?.message : '';
                          return (
                            <CustomSelect
                              id={`powerUnits.${index}.driveType`}
                              label={t('carModel.driveType')}
                              options={driveTypeOptions}
                              getOptionLabel={(option) => option.title || ''}
                              isOptionEqualToValue={(option, val) => option.value === val.value}
                              onChange={onChange}
                              value={value || null}
                              onBlur={() => {
                                checkPowerUnitsUnique();
                                onBlur();
                              }}
                              errorText={errorText}
                            />
                          );
                        }}
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
                          Params for this Power Unit is not unique
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
                  {t('carModel.addPowerUnit')}
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
                {t('extraFeature.save')}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </div>
  );
};
