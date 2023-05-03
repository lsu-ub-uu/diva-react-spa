import { RenderTree } from 'components/RichTree/RichTree';
import { SelectItem } from 'components';

const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;

function getFlat(node: RenderTree): SelectItem[] {
  return [
    { id: node.id, name: node.name, disabled: node.disabled } as SelectItem,
  ].concat(...(node.children?.map(getFlat) ?? []));
}

const loadSubjectCategoriesAsync = async () => {
  const response = await fetch(`${MOCK_API_URL}/subject-categories`);
  const data: RenderTree = await response.json();
  const flatten = getFlat(data).sort((a, b) =>
    a.name.localeCompare(b.name, 'sv'),
  );
  return flatten;
};

const subjectCategoryService = {
  loadSubjectCategoriesAsync,
};

export default subjectCategoryService;
