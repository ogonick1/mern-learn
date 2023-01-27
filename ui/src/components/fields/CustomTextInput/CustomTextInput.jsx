import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const CustomTextInput = (props) => {
  const {
    control,
    name,
    label,
  } = props;
  return (
    <Controller
      control={control}
      name={name}
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
            sx={{ marginBottom: 2, marginTop: 2 }}
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
            id={name}
            fullWidth
            label={label}
            helperText={errorText || ''}
            error={!!errorText}
          />
        );
      }}
    />
  );
};
