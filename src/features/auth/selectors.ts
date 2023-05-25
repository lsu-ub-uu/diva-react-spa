import { RootState } from 'app/store';

export const authStateSelector = (state: RootState) => {
  return state.auth;
};
