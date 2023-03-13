import { RootState } from 'app/store';

export const publicationTypeSelector = (state: RootState) => {
  return state.publicationType;
};
