import {
  TextField, Typography, Box, Stack, Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './index.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { login } from '../../plugins/store/userSlice';

export const Login = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    dispatch(login(value));
    reset();
  };
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);
  return (
    <Box
      component="div"
      sx={{
        p: 2,
        maxWidth: '995px',
        margin: '10px',
        height: '80vh',
      }}
    >
      <Typography variant="h4" component="h4">{t('loginPage.title')}</Typography>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register(
            'email',
            {
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: t('validationErrors.email'),
              },
            },
          )}
          focused
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
              message: t('validationErrors.minMaxLength', { min: 5, max: 20 }),
            },
            required: true,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
          id="Password"
          label={t('form.password')}
          variant="outlined"
          margin="normal"
        />
        <Stack marginTop={2} spacing={5} direction="row" alignItems="center">
          <Button disabled={!isValid} type="submit" variant="contained">{t('form.login')}</Button>
          <NavLink to="/registration">{t('form.register')}</NavLink>
        </Stack>
      </form>
    </Box>
  );
};
