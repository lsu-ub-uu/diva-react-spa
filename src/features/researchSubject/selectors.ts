import { RootState } from 'app/store';

export const researchSubjectSelector = (state: RootState) => {
  return state.researchSubject;
};
