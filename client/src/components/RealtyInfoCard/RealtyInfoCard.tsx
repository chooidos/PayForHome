import { FC } from 'react';
import {
  Box,
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

const RealtyInfoCard: FC<RealtyInfoCardProps> = ({
  realty,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => onDelete && onDelete(realty);
  const handleEdit = () => onEdit && onEdit(realty);

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
            {renderProperty('Country', realty.country || 'not set')}
            {renderProperty('City', realty.city || 'not set')}
            {renderProperty('Address', realty.address || 'not set')}
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
            <IconButton size='small' color='primary' onClick={handleDelete}>
              <Delete />
            </IconButton>
          )}
          {onEdit && (
            <IconButton size='small' color='primary' onClick={handleEdit}>
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

const renderProperty = (label: string, value: string) => (
  <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
    {label}: {value}
  </Typography>
);

export default RealtyInfoCard;
