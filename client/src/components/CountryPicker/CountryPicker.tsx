import { forwardRef, useMemo } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';

import { CountryType, countries } from '../../shared/constants/countries';

const CountryPicker = forwardRef((props: any, ref) => {
  const { defaultValue: propDefValue, ...others } = props;

  const defaultValue = useMemo(
    () => countries.find((v) => v.label === propDefValue),
    [countries, propDefValue],
  );

  const renderOption = (props: any, option: CountryType) => (
    <Box
      key={option.code}
      component='li'
      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
      {...props}
    >
      <img
        loading='lazy'
        width='20'
        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
        alt=''
      />
      {option.label}
    </Box>
  );

  return (
    <Autocomplete
      ref={ref}
      autoHighlight
      disablePortal
      defaultValue={defaultValue}
      options={countries}
      getOptionLabel={(option: CountryType) => option.label}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label='Choose a country'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          {...others}
        />
      )}
    />
  );
});

export default CountryPicker;
