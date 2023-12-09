import { FC, useState } from 'react';
import { Cancel, Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Collapse,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import CountrySelector from '../CountrySelector/CountrySelector';
import { RealtyItem } from '../../modules/realty/types/realty';
import useFormData from '../../modules/hooks/network/useFormData';
import { actions } from '../../modules/realty/store';
import { AppDispatch } from '../../store';

interface RealtyFormProps {
  defaultValues?: RealtyItem | undefined;
  onCancel?: () => void;
}

const RealtyForm: FC<RealtyFormProps> = ({ defaultValues, onCancel }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { register, handleSubmit } = useForm<RealtyItem>({
    defaultValues,
  });
  const dispatch: AppDispatch = useDispatch();

  const handleModalClose = (errors: string[]) => {
    setErrors(errors);
    if (errors.length === 0) {
      dispatch(actions.getAllRealty());
      onCancel && onCancel();
    }
  };

  const { onSubmit } = useFormData({
    apiUrl: 'realty',
    defaultValues,
    onResponse: handleModalClose,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' spacing={2}>
        <Typography gutterBottom variant='h5' component='div'>
          {defaultValues ? 'Edit' : 'Add'} realty
        </Typography>
        <TextField
          error={errors.length > 0}
          required
          label='Name'
          variant='standard'
          {...register('name', { required: true })}
        />
        <CountrySelector
          {...register('country')}
          defaultValue={defaultValues?.country}
        />
        <TextField label='City' variant='standard' {...register('city')} />
        <TextField
          label='Address'
          variant='standard'
          {...register('address')}
        />
        <Collapse in={errors.length > 0}>
          {errors.map((error: any) => (
            <Alert severity='error' key={error.message}>
              {error.message}
            </Alert>
          ))}
        </Collapse>
        <Stack direction='row-reverse' spacing={2}>
          <Button
            type='submit'
            variant='outlined'
            startIcon={<Save />}
            sx={{ width: '50%' }}
          >
            Save
          </Button>
          {onCancel && (
            <Button
              type='button'
              variant='outlined'
              startIcon={<Cancel />}
              sx={{ width: '50%' }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default RealtyForm;
