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

const getCarModelOptions = () => {
  return CarBrandService.search()
    .then((result) => {
      return result.carBrands;
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
      brandId: yup.object()
        .required(t('validationErrors.required')),
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
    console.log(form);
    try {
      await CarModelService.create(form);
      navigate('/car-model');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onSubmit = async (value) => {
    createCarModel(value);
  };
  console.log(isSubmitted, isDirty, isValid, errors);
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
                    InputLabelProps={{ shrink: value }}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ''}
                    id="name"
                    label={t('carModel.name')}
                    variant="outlined"
                    margin="normal"
                    helperText={errorText}
                    error={!!errorText}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="brandId"
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
                    id="brandId"
                    getOptionLabel={(option) => option.name}
                    onChange={onChange}
                    value={value || null}
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
