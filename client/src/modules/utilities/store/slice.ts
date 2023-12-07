import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getAllUtilities } from './actions';
import { UtilityItem } from '../types/utility';

export type UtilityState = {
  list: Record<string, UtilityItem>;
  error: string | undefined;
};

export const utilitySlice = createSlice({
  name: 'utilitySlice',
  initialState: {} as UtilityState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUtilities.fulfilled,
        (state, action: PayloadAction<UtilityItem[]>) => {
          state.list = action.payload.reduce(
            (items: any, item: any) => ({
              ...items,
              [item.name]: item,
            }),
            {},
          );
        },
      )
      .addCase(getAllUtilities.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default utilitySlice.reducer;
