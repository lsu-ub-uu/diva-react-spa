import { RootState } from 'app/store';

export const dummySelector = (state: RootState) => {
  return state.dummy;
};
