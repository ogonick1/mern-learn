import {
  TextField, Typography, Box, Stack, Button, Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import { CarBrandService } from '../../services/carBrand.service';
import 'react-toastify/dist/ReactToastify.css';

export const CreateCarBrand = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  });
  const notify = (text) => {
    toast.error(text);
  };
  const createCarBrand = async (value) => {
    try {
      await CarBrandService.create(value);
    } catch (error) {
      notify(error.response.data.message);
    }
  };
  const onSubmit = (value) => {
    createCarBrand(value);
    reset();
  };
  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Box
        component="div"
        sx={{ margin: '15px' }}
      >
        <Typography variant="h4" component="h4">{t('createCarBrand.title')}</Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register(
              'name',
              {
                minLength: {
                  value: 3,
                  message: t('validationErrors.minMaxLength', { min: 3, max: 20 }),
                },
                maxLength: {
                  value: 20,
                  message: t('validationErrors.minMaxLength', { min: 3, max: 20 }),
                },
                required: true,
              },
            )}
            focused
            error={!!errors.name}
            helperText={errors.name?.message}
            type="text"
            id="name"
            label={t('createCarBrand.name')}
            variant="outlined"
            margin="normal"
          />
          <TextField
            {...register('country', {
              minLength: {
                value: 3,
                message: t('validationErrors.minMaxLength', { min: 3, max: 20 }),
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
            label={t('createCarBrand.country')}
            variant="outlined"
            margin="normal"
          />
          <Stack marginTop={2} spacing={5} direction="row" alignItems="center">
            <Button disabled={!isValid} type="submit" variant="contained">{t('createCarBrand.create')}</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
