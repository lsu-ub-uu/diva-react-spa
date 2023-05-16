import { RenderTree } from 'components/RichTree/RichTree';
import { getFlat } from '../../utils';

// const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

export const loadResearchSubjectsAsync = async () => {
  const response = await fetch(`${BFF_API_URL}/researchsubjects/list`);
  const data: RenderTree = await response.json();
  return getFlat(data, '-').sort((a, b) => a.name.localeCompare(b.name, 'sv'));
};

const researchSubjectService = {
  loadResearchSubjectsAsync,
};

export default researchSubjectService;
