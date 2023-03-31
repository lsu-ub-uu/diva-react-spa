import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { SelectItem } from '../../components';

export const subjectCategorySelector = (state: RootState) => {
  return state.subjectCategory;
};

// Currently, used in Autocomplete
export const subjectCategoryWithIdSelector = (state: RootState) => {
  return state.subjectCategory.subjectCategories.map(
    (item) =>
      ({
        id: item.id,
        name: `${item.name} ${item.id}`,
        disabled: item.disabled,
      } as SelectItem),
  );
};

export const getSubjectCategoryDetails = (ids: string[]) =>
  createSelector([subjectCategorySelector], (subjectCategoryState) => {
    return subjectCategoryState.subjectCategories.filter((category) =>
      ids.includes(category.id),
    );
  });
