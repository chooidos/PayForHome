import { FC, useState } from 'react';
import { Cancel, Delete, Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { UtilityItem } from '../../modules/utilities/types/utility';
import { actions } from '../../modules/utilities/store';
import IconPicker, { iconsType } from '../IconPicker/IconPicker';
import useFormData from '../../modules/hooks/network/useFormData';
import { AppDispatch } from '../../store';

interface UtilityFormProps {
  defaultValues?: UtilityItem | undefined;
  onCancel?: () => void;
}

const UtilityForm: FC<UtilityFormProps> = ({ defaultValues, onCancel }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { register, handleSubmit, setValue, getValues } = useForm<UtilityItem>({
    defaultValues,
  });
  const dispatch: AppDispatch = useDispatch();

  const handleModalClose = (errors: string[]) => {
    setErrors(errors);
    if (errors.length === 0) {
      dispatch(actions.getAllUtilities());
      onCancel && onCancel();
    }
  };

  const { onSubmit } = useFormData({
    apiUrl: 'utility',
    defaultValues,
    onResponse: handleModalClose,
  });

  const handleIconSelection = (value: iconsType | null) => {
    setValue('icon', value || 'Circle');
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
        <TextField
          label='Comment'
          variant='standard'
          {...register('comment')}
        />
        <Stack direction='row' alignItems='baseline'>
          <TextField
            label='Price'
            variant='standard'
            {...register('price', { valueAsNumber: true })}
          />
          <Box px={2}>per</Box>
          <TextField label='Units' variant='standard' {...register('units')} />
        </Stack>
        <IconPicker
          onSelect={handleIconSelection}
          defaultValue={defaultValues?.icon}
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register('isCountable')}
              checked={getValues('isCountable')}
            />
          }
          label='Measurable'
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
          {defaultValues && (
            <Button
              type='button'
              variant='outlined'
              startIcon={<Delete />}
              sx={{ width: '50%' }}
              onClick={onCancel}
            >
              Delete
            </Button>
          )}
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
