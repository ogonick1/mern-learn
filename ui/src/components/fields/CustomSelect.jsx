import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
    <Autocomplete
      sx={{ marginBottom: 2, marginTop: 2 }}
      id={id}
      multiple={multiple}
      options={searchCallback ? internalOptions : options}
      loading={loading}
      {...(getOptionLabel ? { getOptionLabel } : {})}
      {...(isOptionEqualToValue ? { isOptionEqualToValue } : {})}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
      onChange={(action, option) => {
        onChange(option);
      }}
    />
  );
};
