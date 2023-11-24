import { configureStore } from '@reduxjs/toolkit';
import realtySlice, { RealtyState } from './modules/realty/store/slice';

export const store = configureStore({
  reducer: {
    realty: realtySlice,
  },
});

export type RootState = { realty: RealtyState };
export type AppDispatch = typeof store.dispatch;
