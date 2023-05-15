import { RenderTree } from 'components/RichTree/RichTree';
import { SelectItem } from 'components';

const MOCK_API_URL = `${window.location.protocol}//${window.location.host}`;

function getFlat(node: RenderTree, parentId: string | null): SelectItem[] {
  return [
    {
      id: node.id,
      name: node.name,
      disabled: node.disabled,
      parentId,
    } as SelectItem,
  ].concat(...(node.children?.map((n) => getFlat(n, node.id)) ?? []));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(items: SelectItem[], id: string | null): RenderTree[] {
  return items
    .filter((item) => item.parentId === id)
    .map(
      (item) =>
        ({
          id: item.id,
          name: item.name,
          children: getTree(items, item.id),
        } as RenderTree),
    );
}

export const loadResearchSubjectsAsync = async () => {
  const response = await fetch(`${MOCK_API_URL}/research-subjects`);
  const data: RenderTree = await response.json();
  return getFlat(data, '-').sort((a, b) => a.name.localeCompare(b.name, 'sv'));
};

const researchSubjectService = {
  loadResearchSubjectsAsync,
};

export default researchSubjectService;
