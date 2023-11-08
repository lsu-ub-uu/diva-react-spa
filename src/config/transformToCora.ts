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


export const transformToCoraData = (obj: any, parentName?: string, repeatId?: string): (DataGroup | DataAtomic)[] => {
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }

  const result: (DataGroup | DataAtomic)[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        value.forEach((item: { value: string }, index: number) => {
          result.push({ name: key, value: item.value, repeatId: index.toString() });
        });
      } else {
        if (typeof value === 'object' && value !== null && 'value' in value) {
          // If the value is a leaf node, add it to the result array
          result.push({
            name: key,
            value: value.value,
          } as DataAtomic);
        } else {
          // If Group
          result.push({
            name: key,
            children: transformToCoraData(value, key, repeatId),
          });
        }
      }
    }
  }
  return result;
}
