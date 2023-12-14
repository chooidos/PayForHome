import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchUtilityPayment } from '../../payments/network-layer/fetchUtilityPayments';

export const getUtilityPayment = createAsyncThunk(
  'realty/utylity/fetchPayment',
  fetchUtilityPayment,
);
