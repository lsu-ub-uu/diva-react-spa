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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { DataAtomic, DataGroup } from '../utils/cora-data/CoraData';


export const transformNewData = (input: Record<string, any>, parent: string): DataGroup => {
  let name = Object.keys(input)[0];
  const children: (DataGroup  | DataAtomic )[] = [];
  let currentParentName = parent === '' ? name : parent;

  for (const key in input[name]) {
    if (Array.isArray(input[name][key])) {
      input[name][key].forEach((item: { value: string }, index: number) => {
        children.push({ name: key, value: item.value, repeatId: index.toString() });
      });
    } else {
      // this is a leaf
      if (input[name].hasOwnProperty('value')) {
        console.log('is leaf')
        children.push({ name, value: input[name].value } as DataAtomic);
        name = currentParentName;
      } else {
        // group
        children.push({
          name,
          children: [transformNewData(input[name][key], key)],
        });
      }
    }
  }

  return { name, children } as DataGroup;
};
