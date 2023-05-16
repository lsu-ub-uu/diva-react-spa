import { RenderTree } from 'components/RichTree/RichTree';
import { getFlat } from '../../utils';

// const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;
// const BFF_API_URL = 'https://cora.epc.ub.uu.se/diva/spaclientbff/api';
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

const loadSubjectCategoriesAsync = async () => {
  const response = await fetch(`${BFF_API_URL}/subjectcategories/list`);
  const data: RenderTree = await response.json();
  return getFlat(data, '-').sort((a, b) => a.name.localeCompare(b.name, 'sv'));
};

const subjectCategoryService = {
  loadSubjectCategoriesAsync,
};

export default subjectCategoryService;
