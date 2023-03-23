import { RootState } from 'app/store';

export const subjectCategorySelector = (state: RootState) => {
  return state.subjectCategory;
};
