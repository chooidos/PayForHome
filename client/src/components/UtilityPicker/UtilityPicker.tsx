import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { FC } from 'react';

import { selectors } from '../../modules/utilities/store';
import { renderIcon } from '../IconPicker/IconPicker';

interface UtilityPickerProps {
  onSelect?: (value: any) => void;
}

const UtilityPicker: FC<UtilityPickerProps> = ({ onSelect }) => {
  const utilitiesList = useSelector(selectors.selectUtility);
  const utilitiesListArr = utilitiesList ? Object.keys(utilitiesList) : [];

  const handleSelection = (e: any, value: any) => {
    onSelect && onSelect(utilitiesList[value]);
  };

  return (
    <Autocomplete
      options={utilitiesListArr}
      onChange={handleSelection}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ '& > svg': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {renderIcon(utilitiesList[option].icon)}
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label='Utilities'
          placeholder='select utilities'
        />
      )}
    />
  );
};

export default UtilityPicker;
