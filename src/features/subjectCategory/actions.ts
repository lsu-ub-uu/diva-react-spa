import { AppThunk } from 'app/store';
import { RenderTree } from 'components/RichTree/RichTree';
import { SelectItem } from 'components';
import { hasError, update, updating } from './subjectCategorySlice';

const URL = `${window.location.protocol}//${window.location.host}`;

function getFlat(node: RenderTree): SelectItem[] {
  return [{ id: node.id, name: node.name } as SelectItem].concat(
    ...(node.children?.map(getFlat) ?? []),
  );
}

export const loadSubjectCategoriesAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      // Will read tree NOT normalized, this is probably a temporary solution
      const url = `${URL}/subject-categories`;
      const response = await fetch(url);
      const data: RenderTree = await response.json();
      const flatten = getFlat(data).sort((a, b) =>
        a.name.localeCompare(b.name, 'sv'),
      );
      dispatch(update(flatten));
    } catch (e) {
      dispatch(hasError('Error occurred fetching subject categories'));
    } finally {
      if (callback) callback();
    }
  };
