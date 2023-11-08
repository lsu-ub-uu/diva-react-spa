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
import { removeEmpty } from '../utils/structs/removeEmpty';

const findChildrenAttributes = (obj: any) => {
  let attributesArray= [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key.startsWith('_')) {
      const value = obj[key];
      attributesArray.push({ [key.substring(1)]: value })
    }
  }
  if (!attributesArray.length) return undefined;
  return Object.assign({}, ...attributesArray);
}

export const transformToCoraData = (obj: any, parentName?: string, repeatId?: string): (DataGroup | DataAtomic)[] => {
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }

  const result: (DataGroup | DataAtomic)[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (!key.startsWith('_')) {
        if (Array.isArray(value)) {
          value.forEach((item: (DataGroup | DataAtomic), index: number) => {
            if ('value' in item) {
              const atomic = item as DataAtomic;
              result.push({
                name: key,
                value: atomic.value,
                attributes: findChildrenAttributes(atomic),
                repeatId: index.toString()
              });
            } else {
              const group = item as DataGroup;
              result.push({
                name: key,
                attributes: findChildrenAttributes(group),
                repeatId: index.toString(),
                children: transformToCoraData(group, key, repeatId),
              });
            }
          });
        } else {
          if (typeof value === 'object' && value !== null && 'value' in value) {
            result.push({
              name: key,
              attributes: findChildrenAttributes(value),
              value: value.value,
            } as DataAtomic);
          } else {
            // If Group
            result.push(removeEmpty({
              name: key,
              attributes: findChildrenAttributes(value),
              children: transformToCoraData(value, key, repeatId),
            }));
          }
        }
      }
    }
  }
  return result;
}
