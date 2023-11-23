import { Autocomplete, Box, TextField } from "@mui/material";
import { CountryType, countries } from "../../shared/constants/countries";
import { forwardRef } from "react";

const CountrySelector = forwardRef((props: any, ref) => {
  return (
    <Autocomplete
      ref={ref}
      autoHighlight
      disablePortal
      options={countries}
      getOptionLabel={(option: CountryType) => option.label}
      renderOption={(props, option: CountryType) => (
        <Box
          component='li'
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
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
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label='Choose a country'
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          {...props}
        />
      )}
    />
  );
});

export default CountrySelector;
