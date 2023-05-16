import { RootState } from 'app/store';
import { SelectItem } from 'components';

export const researchSubjectSelectItemsSelector = (state: RootState) => {
  return state.researchSubject.researchSubjects
    .filter((i) => i.id !== 'root')
    .map(
      (item) =>
        ({
          id: item.id,
          name: `${item.name}`,
          disabled: item.disabled,
        } as SelectItem),
    );
};

export const researchSubjectSelector = (state: RootState) => {
  return state.researchSubject;
};
