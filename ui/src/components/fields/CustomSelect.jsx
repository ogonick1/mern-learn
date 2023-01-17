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
    onChange,
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
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
      id={id}
      options={searchCallback ? internalOptions : options}
      loading={loading}
      {...(getOptionLabel ? { getOptionLabel } : {})}
      renderInput={(params) => <TextField {...params} label="Movie" />}
      value={value}
      onChange={(val) => {
        console.log(val);
        onChange(val);
      }}
    />
  );
};
