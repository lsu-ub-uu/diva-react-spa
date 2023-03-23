import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const subjectCategorySelector = (state: RootState) => {
  return state.subjectCategory;
};

export const getSubjectCategoryDetails = (ids: string[]) =>
  createSelector([subjectCategorySelector], (subjectCategoryState) => {
    return subjectCategoryState.subjectCategories.filter((category) =>
      ids.includes(category.id),
    );
  });
