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
import * as console from 'node:console';
import { removeEmpty } from './removeEmpty';
import { FormMetaData } from '../../formDefinition/formDefinition';

export const createFormMetaDataPathLookup = (
  metaDataGroup: FormMetaData,
  path: string = '',
  lookup: Record<string, FormMetaData> = {},
  childWithSameNameInData: string[] = []
) => {
  const childrenWithSameNameInData: string[] = [];
  console.log(
    'childrenWithSameNameInData',
    metaDataGroup.name,
    childrenWithSameNameInData,
    childWithSameNameInData
  );

  path = path ? `${path}.${addAttributesToName(metaDataGroup)}` : metaDataGroup.name;
  console.log(metaDataGroup.name, path);
  if (metaDataGroup.type === 'group') {
    (metaDataGroup.children ?? []).map((child: FormMetaData) => {
      childrenWithSameNameInData.push(child.name);
    });
    console.log('child', childrenWithSameNameInData);
  }
  console.log('hello', metaDataGroup);

  metaDataGroup.children?.forEach((metaData) => {
    createFormMetaDataPathLookup(metaData, path, lookup, childrenWithSameNameInData);
  });
  lookup[path] = removeEmpty({ ...metaDataGroup, children: undefined });
  return lookup;
};

export const addAttributesToName = (metaDataGroup: FormMetaData) => {
  if (metaDataGroup.attributes === undefined) {
    return metaDataGroup.name;
  }
  const nameArray: any[] = [];
  Object.entries(metaDataGroup.attributes).forEach(([key, value]) => {
    nameArray.push(`${key}_${value}`);
  });
  console.log('array', nameArray);
  return `${metaDataGroup.name}_${nameArray.join('_')}`;
};
