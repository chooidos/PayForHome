import { RootState } from '../../../store';

export const selectUtility = (state: RootState) => state.utility.list;
