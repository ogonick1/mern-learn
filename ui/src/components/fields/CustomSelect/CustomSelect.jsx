import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export const CustomSelect = (props) => {
  const {
    ifNoValue,
    name,
    control,
    options,
    searchCallback,
    getOptionLabel,
    id,
    multiple,
    label,
    isOptionEqualToValue,
    checkPowerUnitsUnique,
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
                onBlur={() => {
                  // eslint-disable-next-line no-unused-expressions
                  checkPowerUnitsUnique ? checkPowerUnitsUnique() : onBlur;
                }}
              />
            )}
            value={value || ifNoValue}
            onChange={(action, option) => {
              onChange(option);
            }}
          />
        );
      }}
    />
  );
};

CustomSelect.propTypes = {
  // eslint-disable-next-line
  options: PropTypes.arrayOf(PropTypes.any),
  searchCallback: PropTypes.func,
  getOptionLabel: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isOptionEqualToValue: PropTypes.func,
  onBlur: PropTypes.func,
};
PropTypes.checkPropTypes();
