import { RenderTree } from 'components/RichTree/RichTree';
import { SelectItem } from 'components';

const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;

function getFlat(node: RenderTree): SelectItem[] {
  return [
    { id: node.id, name: node.name, disabled: node.disabled } as SelectItem,
  ].concat(...(node.children?.map(getFlat) ?? []));
}

export const loadResearchSubjectsAsync = async () => {
  const response = await fetch(`${MOCK_API_URL}/research-subjects`);
  const data: RenderTree = await response.json();
  return getFlat(data).sort((a, b) => a.name.localeCompare(b.name, 'sv'));
};

const researchSubjectService = {
  loadResearchSubjectsAsync,
};

export default researchSubjectService;
