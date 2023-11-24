import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllRealty } from "../network-layer";
import { RealtyItem } from "../types/realty";

export const getAllRealty = createAsyncThunk<
  RealtyItem[],
  void,
  {
    rejectValue: {
      error: {
        message: string;
      };
    };
  }
>("realty/fetchAllRealy", fetchAllRealty);
