import {
  TextField, Typography, Box, Stack, Button, Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { registration } from '../../../plugins/store/userSlice';

export const Registration = () => {
  const { t } = useTranslation(['registrationPage', 'validationErrors', 'form']);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  });
  const onSubmit = (value) => {
    dispatch(registration(value));
    reset();
  };
  return (
    <Container maxWidth="sm">
      <Box
        component="div"
        sx={{
          p: 2,
          maxWidth: '995px',
          margin: '10px',
          height: '80vh',
        }}
      >
        <Typography variant="h4" component="h4">{t('registrationPage.title')}</Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register(
              'userName',
              {
                required: true,
                minLength: {
                  value: 5,
                  message: t('validationErrors:validationErrors.minMaxLength', { min: 5, max: 20 }),
                },
                maxLength: 20,
              },
            )}
            focused
            error={!!errors.userName}
            helperText={errors.userName?.message}
            type="text"
            id="userName"
            label={t('form:form.userName')}
            variant="outlined"
            margin="normal"
          />
          <TextField
            {...register(
              'firstName',
              {
                required: true,
                minLength: {
                  value: 5,
                  message: t('validationErrors:validationErrors.minMaxLength', { min: 5, max: 20 }),
                },
                maxLength: 20,
              },
            )}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            type="text"
            id="firstName"
            label={t('form:form.firstName')}
            variant="outlined"
            margin="normal"
          />
          <TextField
            {...register(
              'lastName',
              {
                required: true,
                minLength: {
                  value: 5,
                  message: t('validationErrors:validationErrors.minMaxLength', { min: 5, max: 20 }),
                },
                maxLength: 20,
              },
            )}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            type="text"
            id="lastName"
            label={t('form:form.lastName')}
            variant="outlined"
            margin="normal"
          />
          <TextField
            {...register(
              'email',
              {
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t('validationErrors:validationErrors.email'),
                },
              },
            )}
            error={!!errors.email}
            helperText={errors.email?.message}
            type="text"
            id="Email"
            label={t('form.email')}
            variant="outlined"
            margin="normal"
          />
          <TextField
            {...register('password', {
              minLength: {
                value: 5,
                message: t('validationErrors:validationErrors.minMaxLength', { min: 5, max: 20 }),
              },
              required: true,
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            id="Password"
            label={t('form:form.password')}
            variant="outlined"
            margin="normal"
          />
          <Stack marginTop={2} spacing={5} direction="row" alignItems="center">
            <Button disabled={!isValid} type="submit" variant="contained">{t('form:form.register')}</Button>
            <NavLink to="/login">{t('form:form.login')}</NavLink>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
