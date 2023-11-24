import { FC } from 'react';

import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { RealtyItem } from '../../modules/realty/types/realty';
import { Bolt, Delete, Edit, Info, Save } from '@mui/icons-material';

interface RealtyInfoCardProps {
  realty: RealtyItem;
  onEdit?: (realty: RealtyItem) => void;
  onDelete?: (realty: RealtyItem) => void;
}

const RealtyInfoCard: FC<RealtyInfoCardProps> = (props) => {
  const { realty, onEdit, onDelete } = props;
  return (
    <Card sx={{ width: 300 }} raised>
      <CardContent>
        <Stack
          direction='column'
          justifyContent='space-between'
          spacing={2}
          sx={{ height: '200px' }}
        >
          <Box>
            <Typography gutterBottom variant='h5' component='div'>
              {realty.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              Country: {realty.country || 'not set'}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              City: {realty.city || 'not set'}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              Address: {realty.address || 'not set'}
            </Typography>
          </Box>
          <Stack spacing={0.5} direction='row' useFlexGap flexWrap='wrap'>
            <Chip color='primary' icon={<Bolt />} label='asdasd' />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack
          justifyContent='space-between'
          direction='row'
          sx={{ width: '100%' }}
        >
          {onDelete && (
            <IconButton
              size='small'
              color='primary'
              onClick={() => onDelete(realty)}
            >
              <Delete />
            </IconButton>
          )}
          {onEdit && (
            <IconButton
              size='small'
              color='primary'
              onClick={() => onEdit(realty)}
            >
              <Edit />
            </IconButton>
          )}
          <IconButton size='small' color='primary'>
            <Info />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default RealtyInfoCard;
