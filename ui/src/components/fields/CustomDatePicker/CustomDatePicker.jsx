import { TextField } from '@mui/material';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

export const CustomDatePicker = (props) => {
  const {
    maxDate,
    minDate,
    dateFormat,
    showYearPicker = true,
    control,
    name,
    label,
    id,
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
          <ReactDatePicker
            maxDate={maxDate || new Date()}
            minDate={minDate || new Date(1970)}
            customInput={(
              <TextField
                onBlur={onBlur}
                label={label}
                fullWidth
                error={!!errorText}
                helperText={errorText}
              />
            )}
            selected={value}
            onChange={onChange}
            value={value || new Date()}
            showYearPicker={showYearPicker}
            dateFormat={dateFormat || 'yyyy'}
            id={id}
          />
        );
      }}
    />
  );
};
