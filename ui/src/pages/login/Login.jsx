import {
  TextField, Typography, Box, Stack, Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './index.scss';
import AuthService from '../../services/authService';

export const Login = () => {
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
    dispatch(AuthService.login(value));
    reset();
  };
  return (
    <Box
      component="div"
      sx={{
        p: 2,
        maxWidth: '995px',
        margin: '10px',
        height: '100vh',
      }}
    >
      <Typography variant="h4" component="h4">Login</Typography>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register(
            'email',
            {
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'enter corect email',
              },
            },
          )}
          focused
          error={!!errors.email}
          helperText={errors.email?.message}
          type="text"
          id="Email"
          label="Enter Email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          {...register('password', {
            minLength: {
              value: 5,
              message: 'min 5 symbols',
            },
            required: true,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
          id="Password"
          label="Enter Password"
          variant="outlined"
          margin="normal"
        />
        <Stack marginTop={2} spacing={2} direction="row">
          <Button disabled={!isValid} type="submit" variant="contained">Login</Button>
          <Button variant="outlined">Registration page</Button>
        </Stack>
      </form>
    </Box>
  );
};
