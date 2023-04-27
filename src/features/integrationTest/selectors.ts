import { RootState } from 'app/store';

export const integrationTestSelector = (state: RootState) => {
  return state.integrationTest;
};
