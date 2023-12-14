import { RootState } from '../../../store';

export const selectutilityPayment = (state: RootState) =>
  state.utilityPayment.list;
