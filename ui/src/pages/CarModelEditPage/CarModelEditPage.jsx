import {
  TextField, Typography, Box, Stack, Button, Container,
} from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CarModelService } from '../../services/carModel.service';
import { CustomSelect } from '../../components/fields/CustomSelect';
import { CarBrandService } from '../../services/carBrand.service';
import { ExtraFeatureService } from '../../services/extraFeature.service';

const bodyTypeEnum = [
  'SEDAN',
  'STATION_WAGON',
  'HATCHBACK',
  'COUPE',
];

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

  const bodyTypeOptions = bodyTypeEnum.map((value) => ({
    title: t(`enum.bodyType.${value}`),
    value,
  }));

  const schema = yup
    .object()
    .shape({
      name: yup.string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.minMaxLength', { min: 3, max: 20 }))
        .max(20, t('validationErrors.minMaxLength', { min: 3, max: 20 })),
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
      yearStart: 1960,
      yearEnd: 2020,
      powerUnits: form.powerUnits,
      // powerUnits: form.powerUnits.map((powerUnit) => ({
      //   engineVolume: powerUnit.engineVolume,
      //   fuelType: powerUnit.fuelType.value,
      //   gearBox: powerUnit.gearBox.value,
      //   driveType: powerUnit.driveType.value,
      // })),
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
      <Container maxWidth="sm">
        <Box
          component="div"
          sx={{ margin: '15px' }}
        >
          <Typography variant="h4" component="h4">{t('carModel.title')}</Typography>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                    label={t('carModel.name')}
                    variant="outlined"
                    margin="normal"
                    helperText={errorText || ''}
                    error={!!errorText}
                  />
                );
              }}
            />
            <br />
            <br />
            <br />
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
                    label="CAR BRAND"
                    getOptionLabel={(option) => option.name || ''}
                    onChange={onChange}
                    value={value || null}
                  />
                );
              }}
            />
            <br />
            <br />
            <br />
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
                    label="EXTRA FEATURES"
                    getOptionLabel={(option) => option.title || ''}
                    isOptionEqualToValue={(option, val) => val._id === option._id}
                    onChange={onChange}
                    value={value || []}
                  />
                );
              }}
            />
            <br />
            <br />
            <br />
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
                    label="bodyTypes"
                    getOptionLabel={(option) => option.title || ''}
                    isOptionEqualToValue={(option, val) => val.value === option.value}
                    onChange={onChange}
                    value={value || []}
                  />
                );
              }}
            />
            <br />
            <br />
            <br />
            {powerUnitsFields.map((powerUnitsField, index) => {
              return (
                <div key={powerUnitsField.id}>
                  <hr />
                  <Controller
                    control={control}
                    name={`powerUnits.${index}.engineVolume`}
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
                          id={`powerUnits.${index}.engineVolume`}
                          label="engineVolume"
                          variant="outlined"
                          margin="normal"
                          helperText={errorText || ''}
                          error={!!errorText}
                        />
                      );
                    }}
                  />
                  <br />
                  <br />
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
                          label="fuelType"
                          options={[
                            'PETROL',
                            'DIESEL',
                            'GAS',
                            'HYBRID',
                            'ELECTRO',
                            'GAS_PETROL',
                          ]}
                          // getOptionLabel={(option) => option.title || ''}
                          onChange={onChange}
                          value={value || null}
                        />
                      );
                    }}
                  />
                  <br />
                  <br />
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
                          label="gearBox"
                          options={[
                            'MECHANICAL',
                            'AUTOMATIC',
                          ]}
                          onChange={onChange}
                          value={value || null}
                        />
                      );
                    }}
                  />
                  <br />
                  <br />
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
                          label="driveType"
                          options={[
                            'FRONT',
                            'BACK',
                            'FULL',
                          ]}
                          onChange={onChange}
                          value={value || null}
                        />
                      );
                    }}
                  />
                  {powerUnitsFields.length !== 1 && (
                    <Button onClick={() => removePowerUnit(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
            <Button onClick={addPowerUnit}>Add Power Unit</Button>
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
