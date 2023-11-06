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

export const transformFormPayloadToCora = (data: object): (DataGroup | DataAtomic) => {
  const keys = Object.keys(data);
  const name = keys[0];
  // @ts-ignore
  const value = data[name];
  let children: (DataAtomic | DataGroup)[] = []

  if (Array.isArray(value)) {
    const dataAtomics= value.map((child, repeatId) => {
      // repeating dataAtomic
      return { repeatId: repeatId.toString(), name, value: child['value']} as DataAtomic
    })
    children = dataAtomics;
  } else if (typeof value === 'object' && value.hasOwnProperty('value')) {
    return { name, value: value['value']} as DataAtomic;
  } else {
    children = Object.keys(value).map((childKey) => {
      return transformFormPayloadToCora({[ childKey ]: value[childKey]})
    })
  }
  return ({name, children} as DataGroup);
};
