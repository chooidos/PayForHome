import { Add, Bolt } from '@mui/icons-material';
import { Chip, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { RealtyItem } from '../../modules/realty/types/realty';
import { renderIcon } from '../IconPicker/IconPicker';

interface RealtyUtilitiesListProps {
  realty: RealtyItem;
}

const RealtyUtilitiesList: FC<RealtyUtilitiesListProps> = ({ realty }) => {
  return (
    <Stack spacing={1}>
      <Typography variant='body2'>Utilities</Typography>
      <Stack spacing={0.5} direction='row' useFlexGap flexWrap='wrap'>
        {realty.utilities?.map(() => (
          <Chip
            color='primary'
            // icon={}
            label='asdasd'
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default RealtyUtilitiesList;
