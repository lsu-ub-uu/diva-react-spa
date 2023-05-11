import { RenderTree } from 'components/RichTree/RichTree';
import { SelectItem } from 'components';

// const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;
// const BFF_API_URL = 'https://cora.epc.ub.uu.se/diva/spaclientbff/api';
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

function getFlat(node: RenderTree): SelectItem[] {
  return [
    { id: node.id, name: node.name, disabled: node.disabled } as SelectItem,
  ].concat(...(node.children?.map(getFlat) ?? []));
}

const loadSubjectCategoriesAsync = async () => {
  const response = await fetch(`${BFF_API_URL}/subjectcategories/list`);
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
