import { RootState } from 'app/store';

export const publicationsSelector = (state: RootState) => {
  return state.publications;
};
