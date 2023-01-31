import {
  TextField, Typography, Box, Stack, Button, Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CarBrandService } from '../../../services/carBrand.service';

export const CarBrandEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation(['carBrands', 'toast', 'validationErrors']);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'all',
  });
  const createCarBrand = async (form) => {
    try {
      if (id) {
        await CarBrandService.patchCarBrandById(id, form);
      } else {
        await CarBrandService.create(form);
      }
      navigate('/car-brands');
      toast.success(id ? t('toast:toast.successfullyUpdated') : t('toast:toast.successfullyCreated'));
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };
  const getCarBrandById = async (carBrandId) => {
    try {
      const result = await CarBrandService.getCarBrandById(carBrandId);
      reset({
        name: result.name,
        country: result.country,
      });
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const onSubmit = async (value) => {
    createCarBrand(value);
  };
  useEffect(() => {
    if (id) {
      getCarBrandById(id);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        component="div"
        sx={{ margin: '15px' }}
      >
        <Typography variant="h4" component="h4">{id ? t('carBrands:carBrands.titleEdit') : t('carBrands:carBrands.titleCreate')}</Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register(
              'name',
              {
                minLength: {
                  value: 3,
                  message: t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 20 }),
                },
                maxLength: {
                  value: 20,
                  message: t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 20 }),
                },
                required: true,
              },
            )}
            focused
            error={!!errors.name}
            helperText={errors.name?.message}
            type="text"
            id="name"
            label={t('carBrands:carBrands.name')}
            variant="outlined"
            margin="normal"
          />
          <TextField
            {...register('country', {
              minLength: {
                value: 3,
                message: t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 20 }),
              },
              maxLength: {
                value: 20,
                message: t('validationErrors.minMaxLength', { min: 3, max: 20 }),
              },
              required: true,
            })}
            error={!!errors.country}
            helperText={errors.country?.message}
            type="text"
            id="country"
            label={t('carBrands:carBrands.country')}
            variant="outlined"
            margin="normal"
            focused
          />
          <Stack
            marginTop={2}
            spacing={5}
            direction="row"
            alignItems="center"
          >
            <Button disabled={!isValid} type="submit" variant="contained">
              {t('carBrands:carBrands.save')}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
