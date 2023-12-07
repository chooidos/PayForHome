import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAllUtilities } from '../network-layer';
import { UtilityItem } from '../types/utility';

export const getAllUtilities = createAsyncThunk<
  UtilityItem[],
  void,
  {
    rejectValue: {
      error: {
        message: string;
      };
    };
  }
>('utility/fetchAllUtilities', fetchAllUtilities);
