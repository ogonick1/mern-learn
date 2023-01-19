import {
  TextField, Typography, Box, Stack, Button, Container,
} from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nanoid } from 'nanoid';
import { CarModelService } from '../../services/carModel.service';
import { CustomSelect } from '../../components/fields/CustomSelect';
import { CarBrandService } from '../../services/carBrand.service';
import { ExtraFeatureService } from '../../services/extraFeature.service';
import { useBodyTypeOptions } from '../../hooks/staticOptions/useBodyTypeOptions';
import { useDriveTypeOptions } from '../../hooks/staticOptions/useDriveTypeOptions';
import { useFuelTypeOptions } from '../../hooks/staticOptions/useFuelTypeOptions';
import { useGearBoxOptions } from '../../hooks/staticOptions/useGearBoxOptions';

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

  const schema = yup
    .object()
    .shape({
      name: yup.string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.minMaxLength', { min: 3, max: 20 }))
        .max(20, t('validationErrors.minMaxLength', { min: 3, max: 20 })),
      yearStart: yup.number()
        .min(1970)
        .required(),
      yearEnd: yup.number()
        .optional()
        .when('yearStart', (yearStart, field) => (yearStart ? field.min(yup.ref('yearStart')) : field)),
      brandOption: yup.object()
        .required(t('validationErrors.required')),
      extraFeaturesOptions: yup.array(),
      powerUnits: yup.array(),
      bodyTypes: yup.array(),
    });

  const {
    handleSubmit,
    control,
    formState: {
      isDirty,
      isValid,
      isSubmitted,
    },
  } = useForm({
    defaultValues: {
      powerUnits: [
        {
          engineVolume: 1600,
          fuelType: 'GAS_PETROL',
          gearBox: 'AUTOMATIC',
          driveType: 'BACK',
        },
      ],
    },
    mode: 'all',
    resolver: yupResolver(schema),
  });

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
      engineVolume: 1600,
      fuelType: 'GAS_PETROL',
      gearBox: 'AUTOMATIC',
      driveType: 'BACK',
    });
  };

  const createCarModel = async (form) => {
    const model = {
      name: form.name,
      brandId: form.brandOption._id,
      extraFeaturesIds: form.extraFeaturesOptions.map(({ _id }) => _id),
      yearStart: form.yearStart || null,
      yearEnd: form.yearEnd,
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
    createCarModel(value);
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
            <Stack
              marginTop={1}
              spacing={3}
              direction="row"
            >
              <Box
                component="div"
                sx={{ margin: '15px', width: '33vw' }}
              >
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
                        // TODO
                        // InputLabelProps={{ shrink: value }}
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
                <Controller
                  control={control}
                  name="brandOption"
                  render={({
                    field: {
                      onChange, value,
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
                        value={value || null}
                      />
                    );
                  }}
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  spacing={2}
                >
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
                        <TextField
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          type="number"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ''}
                          id="yearStart"
                          label={t('carModel.yearStart')}
                          helperText={errorText || ''}
                          error={!!errorText}
                        />
                      );
                    }}
                  />
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
                        <TextField
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          type="number"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ''}
                          id="yearEnd"
                          label={t('carModel.yearEnd')}
                          margin="normal"
                          helperText={errorText || ''}
                          error={!!errorText}
                        />
                      );
                    }}
                  />
                </Stack>
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
                      />
                    );
                  }}
                />
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
                      />
                    );
                  }}
                />
              </Box>
              {powerUnitsFields.map((powerUnitsField, index) => {
                return (
                  <Box
                    key={nanoid()}
                    component="div"
                    sx={{ margin: '15px' }}
                  >
                    <Controller
                      control={control}
                      name={`powerUnits.${index}.engineVolume`}
                      render={({
                        field: {
                          onChange, value,
                        },
                        fieldState: { error },
                      }) => {
                        const isFieldValid = error ? false : undefined;
                        const errorText = isFieldValid === false ? error?.message : '';
                        return (
                          <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            type="number"
                            // TODO
                            // InputLabelProps={{ shrink: value }}
                            sx={{ marginTop: 2 }}
                            onChange={onChange}
                            value={value || ''}
                            id={`powerUnits.${index}.engineVolume`}
                            label={t('carModel.engineVolume')}
                            variant="outlined"
                            helperText={errorText || ''}
                            error={!!errorText}
                            fullWidth
                          />
                        );
                      }}
                    />
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
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            onChange={onChange}
                            value={value || null}
                          />
                        );
                      }}
                    />
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
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            onChange={onChange}
                            value={value || null}
                          />
                        );
                      }}
                    />
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
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            onChange={onChange}
                            value={value || null}
                          />
                        );
                      }}
                    />
                    {powerUnitsFields.length !== 1 && (
                      <Button onClick={() => removePowerUnit(index)}>
                        {t('carModel.remove')}
                      </Button>
                    )}
                    {index === 0 && (
                      <Button onClick={addPowerUnit}>
                        {t('carModel.addPowerUnits')}
                      </Button>
                    )}
                  </Box>
                );
              })}

            </Stack>

            <Stack
              marginTop={2}
              spacing={5}
              direction="row"
              alignItems="center"
            >
              <Button disabled={(isSubmitted || isDirty) && !isValid} type="submit" variant="contained">
                {t('extraFeature.save')}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </div>
  );
};
