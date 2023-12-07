import { configureStore } from '@reduxjs/toolkit';

import realtySlice, { RealtyState } from './modules/realty/store/slice';
import utilitySlice, { UtilityState } from './modules/utilities/store/slice';

export const store = configureStore({
  reducer: {
    realty: realtySlice,
    utility: utilitySlice,
  },
});

export type RootState = { realty: RealtyState; utility: UtilityState };
export type AppDispatch = typeof store.dispatch;
