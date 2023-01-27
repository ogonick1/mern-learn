import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const CustomSelect = (props) => {
  const {
    options,
    searchCallback,
    getOptionLabel,
    id,
    value,
    multiple,
    onChange,
    label,
    isOptionEqualToValue,
    errorText,
    onBlur,
  } = props;
  const [internalOptions, setInternalOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const getOptions = async () => {
    setLoading(true);
    try {
      if (searchCallback) {
        const result = await searchCallback();
        setInternalOptions(result);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchCallback) {
      getOptions();
    }
  }, []);
  console.log(value);
  console.log(options);
  return (
    <Autocomplete
      sx={{ marginBottom: 2, marginTop: 2 }}
      id={id}
      multiple={multiple}
      options={searchCallback ? internalOptions : options}
      loading={loading}
      {...(getOptionLabel ? { getOptionLabel } : {})}
      {...(isOptionEqualToValue ? { isOptionEqualToValue } : {})}
      renderInput={(params) => (
        <TextField
          error={!!errorText}
          helperText={errorText || ''}
          {...params}
          label={label}
          onBlur={onBlur}
        />
      )}
      value={value}
      onChange={(action, option) => {
        onChange(option);
      }}
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object]),
  searchCallback: PropTypes.func,
  getOptionLabel: PropTypes.oneOfType([PropTypes.object]),
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isOptionEqualToValue: PropTypes.oneOfType([PropTypes.object]),
  errorText: PropTypes.string,
  onBlur: PropTypes.func,
};
PropTypes.checkPropTypes();
