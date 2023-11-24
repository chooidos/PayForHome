import { RootState } from "../../../store";

export const selectRealty = (state: RootState) => state.realty.list;
