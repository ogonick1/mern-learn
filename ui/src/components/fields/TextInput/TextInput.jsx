import { TextField } from '@mui/material';

const isValidWhileInputNumber = (value) => {
  if (value === '' || value === '-') {
    return true;
  }
  const rgxValid = /^-?\d+(\.\d+)?$/;
  const rgxLastSymbolDot = /^-?\d+(\.)?$/;

  return rgxValid.test(value) || rgxLastSymbolDot.test(value);
};

export const TextInput = (props) => {
  const {
    sx,
    onChange,
    value,
    id,
    label,
    variant = 'outlined',
    helperText,
    error,
    fullWidth = true,
    placeholder,
    type = 'text',
    rows,
    disabled,
    onBlur,
    numberValidator,
  } = props;

  const onChangeInner = (event) => {
    const { target } = event;
    if (type === 'number') {
      const newValue = target.value.replace(',', '.');
      if ((numberValidator && numberValidator(newValue))
        || (!numberValidator && isValidWhileInputNumber(newValue))) {
        onChange(newValue);
      }
    } else {
      onChange(target.value);
    }
  };

  const onBlurInner = () => {
    if (type === 'number' && value.trim() !== '') {
      const number = Number(value);
      if (Number.isNaN(number)) {
        onChange('');
      } else {
        onChange(String(number));
      }
    }

    if (onBlur) {
      onBlur();
    }
  };

  return (
    <TextField
      sx={{ marginTop: 2 }}
      onChange={onChangeInner}
      onBlur={onBlurInner}
      value={value}
      id={id}
      label={label}
      placeholder={placeholder || label}
      variant={variant}
      helperText={helperText}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      rows={rows}
      {...(type === 'textarea' ? { rows, type } : {})}
    />
  );
};
