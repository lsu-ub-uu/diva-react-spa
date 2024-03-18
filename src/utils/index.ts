/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

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
