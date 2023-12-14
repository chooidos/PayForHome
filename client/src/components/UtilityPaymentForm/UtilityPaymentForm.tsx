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
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

import { selectors as utilitiesSelectors } from '../../modules/utilities/store';
import useFormData from '../../modules/hooks/network/useFormData';
import { selectors as realtySelectors } from '../../modules/realty/store';
import { UtilityPaymentItem } from '../../modules/payments/types/utilityPayment';
import { AppDispatch } from '../../store';
import { actions } from '../../modules/payments/store';

interface Values {
  realtyName: string;
  utilityName: string;
}

interface UtilityPaymentFormProps {
  onCancel?: () => void;
  values: Values;
}

const UtilityPaymentForm: FC<UtilityPaymentFormProps> = ({
  onCancel,
  values,
}) => {
  const { realtyName, utilityName } = values;
  const [errors, setErrors] = useState<string[]>([]);
  const { register, handleSubmit, setValue, getValues } =
    useForm<UtilityPaymentItem>({ defaultValues: { date: new Date() } });

  const utilitiesList = useSelector(utilitiesSelectors.selectUtility);
  const realtyList = useSelector(realtySelectors.selectRealty);

  const dispatch: AppDispatch = useDispatch();

  const handleModalClose = (errors: string[]) => {
    setErrors(errors);
    if (errors.length === 0) {
      dispatch(
        actions.getUtilityPayment({
          realtyId: realtyList[realtyName].id,
          utilityId: utilitiesList[utilityName].id,
        }),
      );
      onCancel && onCancel();
    }
  };

  const { onSubmit } = useFormData({
    apiUrl: `utilityPaiment/${realtyList[realtyName].id}/${utilitiesList[utilityName].id}`,
    onResponse: handleModalClose,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' spacing={2}>
        <Typography gutterBottom variant='h5' sx={{ mb: 2 }} textAlign='center'>
          Add new payment record
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            sx={{ width: '100%' }}
            label='Date'
            value={moment(getValues('date'))}
            onChange={(e: any) => setValue('date', e.unix())}
            slotProps={{
              textField: {
                variant: 'standard',
              },
            }}
          />
        </LocalizationProvider>
        <TextField
          label='Value'
          variant='standard'
          {...register('value', { required: true })}
        />
        <TextField
          label='Price'
          variant='standard'
          {...register('price', { required: true })}
        />
        <Collapse in={errors.length > 0}>
          {errors.map((error: any) => (
            <Alert severity='error' key={error.message}>
              {error.message}
            </Alert>
          ))}
        </Collapse>
        <Stack direction='row' spacing={2} mt={2}>
          <Button
            type='button'
            variant='outlined'
            startIcon={<Cancel />}
            sx={{ width: '50%' }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='outlined'
            startIcon={<Save />}
            sx={{ width: '50%' }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UtilityPaymentForm;
