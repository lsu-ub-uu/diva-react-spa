import { RenderTree } from 'components/RichTree/RichTree';
import { getFlat } from '../../utils';

const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;

export const loadResearchSubjectsAsync = async () => {
  const response = await fetch(`${MOCK_API_URL}/research-subjects`);
  const data: RenderTree = await response.json();
  return getFlat(data, '-').sort((a, b) => a.name.localeCompare(b.name, 'sv'));
};

const researchSubjectService = {
  loadResearchSubjectsAsync,
};

export default researchSubjectService;
