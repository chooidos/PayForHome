import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Cancel, Save } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  CardContent,
  Collapse,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import CountrySelector from '../CountrySelector/CountrySelector';
import { api_server_url } from '../../shared/constants/serverType';
import { RealtyItem } from '../../modules/realty/types/realty';
import { useDispatch } from 'react-redux';
import { actions } from '../../modules/realty/store';

interface RealtyFormProps {
  defaultValues?: RealtyItem | undefined;
  onCancel?: () => void;
}

const RealtyForm: FC<RealtyFormProps> = (props) => {
  const { defaultValues, onCancel } = props;
  const [errors, setErrors] = useState([]);

  const { register, handleSubmit } = useForm<RealtyItem>({
    defaultValues,
  });
  const dispatch = useDispatch();

  const handleSubmitSuccess = () => {
    setErrors([]);
    dispatch(actions.getAllRealty() as any);
    onCancel && onCancel();
  };

  const handleSubmitError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      setErrors(err.response?.data.message.errors);
    }
  };

  const onSubmit: SubmitHandler<RealtyItem> = async (data) => {
    const url = defaultValues
      ? `${api_server_url}/api/realty/${defaultValues.name}`
      : `${api_server_url}/api/realty`;

    try {
      defaultValues ? await axios.put(url, data) : await axios.post(url, data);

      handleSubmitSuccess();
    } catch (err: any) {
      handleSubmitError(err);
    }
  };

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
