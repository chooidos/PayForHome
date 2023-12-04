import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RealtyItem } from '../types/realty';
import { getAllRealty } from './actions';

export type RealtyState = {
  list: Record<string, RealtyItem>;
  error: string | undefined;
};

export const realtySlice = createSlice({
  name: 'realtySlice',
  initialState: {} as RealtyState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllRealty.fulfilled,
        (state, action: PayloadAction<RealtyItem[]>) => {
          state.list = action.payload.reduce(
            (items: any, item: any) => ({
              ...items,
              [item.name]: item,
            }),
            {},
          );
        },
      )
      .addCase(getAllRealty.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default realtySlice.reducer;
