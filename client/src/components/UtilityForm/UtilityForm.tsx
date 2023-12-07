import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Cancel, Save } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { api_server_url } from '../../shared/constants/serverType';
import { AppDispatch } from '../../store';
import { UtilityItem } from '../../modules/utilities/types/utility';
import { actions } from '../../modules/utilities/store';

interface UtilityFormProps {
  defaultValues?: UtilityItem | undefined;
  onCancel?: () => void;
}

const UtilityForm: FC<UtilityFormProps> = ({ defaultValues, onCancel }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { register, handleSubmit } = useForm<UtilityItem>({
    defaultValues,
  });
  const dispatch: AppDispatch = useDispatch();

  const handleSubmitSuccess = () => {
    setErrors([]);
    dispatch(actions.getAllUtilities());
    onCancel && onCancel();
  };

  const handleSubmitError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      setErrors(err.response?.data.message.errors);
    }
  };

  const onSubmit: SubmitHandler<UtilityItem> = async (data) => {
    console.log(data);

    const url = defaultValues
      ? `${api_server_url}/api/utility/${defaultValues.name}`
      : `${api_server_url}/api/utility`;

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
          {defaultValues ? 'Edit' : 'Add'} utility
        </Typography>
        <TextField
          error={errors.length > 0}
          required
          label='Name'
          variant='standard'
          {...register('name', { required: true })}
        />
        <FormControlLabel
          control={<Checkbox {...register('isCountable')} />}
          label='Measurable'
        />
        <TextField
          label='Comment'
          variant='standard'
          {...register('comment')}
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

export default UtilityForm;
