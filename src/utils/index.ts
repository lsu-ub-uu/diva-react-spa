import { RenderTree } from 'components/RichTree/RichTree';
import { SelectItem } from 'components';

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

export { getFlat, getTree };
