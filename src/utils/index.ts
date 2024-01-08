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
import { Account } from 'components/Layout/Header/Login';

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

const devAccounts: Account[] = [
  {
    appToken: '2e57eb36-55b9-4820-8c44-8271baab4e8e',
    idInUserStorage: 'coraUser:490742519075086',
    idFromLogin: 'coraUser:490742519075086',
    lastName: 'DiVA',
    firstName: 'Everything',
  },
  {
    appToken: '0c240296-0315-4e48-a991-4e6350e73413',
    idInUserStorage: 'coraUser:491055276494310',
    idFromLogin: 'coraUser:491055276494310',
    lastName: 'Admin',
    firstName: 'System',
  },
  {
    appToken: '89ad2b42-785a-4421-a647-f959cdb85f4a',
    idInUserStorage: 'coraUser:491144693381458',
    idFromLogin: 'coraUser:491144693381458',
    lastName: 'UU',
    firstName: 'domainAdmin',
  },
  {
    appToken: '765b4fcd-43b4-433a-bf7f-8e929f94d3fe',
    idInUserStorage: 'coraUser:491201365536105',
    idFromLogin: 'coraUser:491201365536105',
    lastName: 'KTH',
    firstName: 'domainAdmin',
  },
];

export { getFlat, getTree, devAccounts };
