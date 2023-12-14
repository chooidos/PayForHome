import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { getUtilityPayment } from './actions';
import { UtilityPaymentItem } from '../types/utilityPayment';

export type utilityPaymentState = {
  list: UtilityPaymentItem[];
  error: string | undefined;
};

export const utilityPaymentSlice = createSlice({
  name: 'utilityPaymentSlice',
  initialState: {} as utilityPaymentState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUtilityPayment.fulfilled,
        (state, action: PayloadAction<UtilityPaymentItem[]>) => {
          state.list = action.payload.map((payment) => ({
            ...payment,
            date: moment(payment.date).format('ll'),
          }));
        },
      )
      .addCase(getUtilityPayment.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default utilityPaymentSlice.reducer;
