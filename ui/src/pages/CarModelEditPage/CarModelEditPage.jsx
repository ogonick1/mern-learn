import {
  TextField, Typography, Box, Stack, Button, Container, Autocomplete,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CarModelService } from '../../services/carModel.service';
import { CustomSelect } from '../../components/fields/CustomSelect';
import { CarBrandService } from '../../services/carBrand.service';
import { ExtraFeatureService } from '../../services/extraFeature.service';

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
    });

  const {
    handleSubmit,
    control,
    reset,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitted,
    },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const createCarModel = async (form) => {
    const model = {
      name: form.name,
      brandId: form.brandOption._id,
      extraFeaturesIds: form.extraFeaturesOptions.map(({ _id }) => _id),
      yearStart: 1960,
      yearEnd: 2020,
      powerUnits: [{
        engineVolume: 1600,
        fuelType: 'GAS_PETROL',
        gearBox: 'AUTOMATIC',
        driveType: 'BACK',
      }],
      bodyTypes: ['SEDAN'],
    };

    console.log(model);

    try {
      // await CarModelService.create(model);
      // navigate('/car-model');
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
