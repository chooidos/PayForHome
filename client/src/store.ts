import { configureStore } from '@reduxjs/toolkit';

import realtySlice, { RealtyState } from './modules/realty/store/slice';
import utilitySlice, { UtilityState } from './modules/utilities/store/slice';
import utilityPaymentSlice, {
  utilityPaymentState,
} from './modules/payments/store/slice';

export const store = configureStore({
  reducer: {
    realty: realtySlice,
    utility: utilitySlice,
    utilityPayment: utilityPaymentSlice,
  },
});

export type RootState = {
  realty: RealtyState;
  utility: UtilityState;
  utilityPayment: utilityPaymentState;
};
export type AppDispatch = typeof store.dispatch;
