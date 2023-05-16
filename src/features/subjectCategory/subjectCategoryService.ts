import { RenderTree } from 'components/RichTree/RichTree';
import { getFlat } from '../../utils';

const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;

const loadSubjectCategoriesAsync = async () => {
  const response = await fetch(`${MOCK_API_URL}/subject-categories`);
  const data: RenderTree = await response.json();
  return getFlat(data, '-').sort((a, b) => a.name.localeCompare(b.name, 'sv'));
};

const subjectCategoryService = {
  loadSubjectCategoriesAsync,
};

export default subjectCategoryService;
