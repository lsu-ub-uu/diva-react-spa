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

import * as console from 'console';
import { Attributes, DataAtomic, DataGroup, RecordLink } from '../utils/cora-data/CoraData';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { FormMetaData } from '../formDefinition/formDefinition';

export const injectRecordInfoIntoDataGroup = (
  dataGroup: DataGroup,
  validationTypeId: string,
  dataDivider: string,
  recordId?: string,
  recordType?: string,
  userId?: string,
  lastUpdate?: string,
  createdBy?: string,
  tsCreated?: string
): DataGroup => {
  dataGroup.children = [
    generateRecordInfo(
      validationTypeId,
      dataDivider,
      recordId,
      recordType,
      userId,
      lastUpdate,
      createdBy,
      tsCreated
    ),
    ...dataGroup.children
  ];
  return dataGroup;
};

export const generateRecordInfo = (
  validationType: string,
  dataDivider: string,
  recordId?: string,
  recordType?: string,
  userId?: string,
  lastUpdate?: string,
  createdBy?: string,
  tsCreated?: string
): DataGroup => {
  const name = 'recordInfo';
  const children = [
    recordId ? generateAtomicValue('id', recordId) : undefined,
    generateRecordLink('dataDivider', 'system', dataDivider),
    generateRecordLink('validationType', 'validationType', validationType),
    recordType ? generateRecordLink('type', 'recordType', recordType) : undefined,
    userId && lastUpdate ? generateLastUpdateInfo(userId, lastUpdate) : undefined,
    tsCreated ? generateAtomicValue('tsCreated', tsCreated) : undefined,
    createdBy ? generateRecordLink('createdBy', 'user', createdBy) : undefined
  ];
  return removeEmpty({ name, children }) as DataGroup;
};

export const generateLastUpdateInfo = (userId: string, updatedAt: string) => {
  const name = 'updated';
  const children = [
    generateRecordLink('updatedBy', 'user', userId),
    generateAtomicValue('tsUpdated', updatedAt)
  ];
  return removeEmpty({ name, children, repeatId: '0' }) as DataGroup;
};

export const findChildrenAttributes = (obj: any) => {
  const attributesArray: Record<string, string>[] = [];
  Object.keys(obj).forEach((key) => {
    if (Object.hasOwn(obj, key) && key.startsWith('_')) {
      const value = obj[key];
      attributesArray.push({ [key.substring(1)]: value });
    }
  });
  if (!attributesArray.length) return undefined;
  return Object.assign({}, ...attributesArray);
};

export const generateAtomicValue = (name: string, value: any): DataAtomic => ({
  name,
  value
});

export const generateRecordLink = (
  name: string,
  linkedRecordType: string,
  linkedRecordId: string,
  inAttributes: Attributes | undefined = undefined,
  repeatId: string | undefined = undefined
): RecordLink =>
  removeEmpty({
    name,
    attributes: inAttributes,
    children: [
      generateAtomicValue('linkedRecordType', linkedRecordType),
      generateAtomicValue('linkedRecordId', linkedRecordId)
    ],
    repeatId
  });

export const createLeaf = (
  metaData: FormMetaData,
  name: string,
  value: string,
  repeatId: string | undefined = undefined,
  inAttributes: Attributes | undefined = undefined
): DataAtomic | RecordLink => {
  if (['numberVariable', 'textVariable', 'collectionVariable'].includes(metaData.type)) {
    return removeEmpty({
      name,
      value,
      attributes: inAttributes,
      repeatId
    } as DataAtomic);
  }
  return generateRecordLink(name, metaData.linkedRecordType ?? '', value, inAttributes, repeatId);
};

export const transformToCoraData = (
  lookup: Record<string, FormMetaData>,
  payload: any,
  path?: string,
  repeatId?: string
): (DataGroup | DataAtomic | RecordLink)[] => {
  const result: (DataGroup | DataAtomic)[] = [];
  console.log('p', payload);
  Object.keys(payload).forEach((fieldKey) => {
    console.log('1', fieldKey);
    const newFieldKey = fieldKey.split('_')[0];
    console.log('newFieldKey', newFieldKey);
    const value = payload[fieldKey];
    console.log('value', value);
    const currentPath = path ? `${path}.${fieldKey}` : fieldKey;
    if (!fieldKey.startsWith('_')) {
      const currentMetadataLookup = lookup[currentPath];
      const shouldDataHaveRepeatId = currentMetadataLookup.repeat.repeatMax > 1;

      if (Array.isArray(value)) {
        value.forEach((item: DataGroup | DataAtomic, index: number) => {
          if ('value' in item) {
            const atomic = item as DataAtomic;
            const attributes = findChildrenAttributes(atomic);
            result.push(
              createLeaf(
                currentMetadataLookup,
                fieldKey,
                atomic.value,
                shouldDataHaveRepeatId ? index.toString() : undefined,
                attributes
              )
            );
          } else {
            const group = item as DataGroup;
            result.push(
              removeEmpty({
                name: fieldKey,
                attributes: findChildrenAttributes(group),
                repeatId: shouldDataHaveRepeatId ? index.toString() : undefined,
                children: transformToCoraData(lookup, group, currentPath, repeatId)
              } as DataGroup)
            );
          }
        });
      } else if (typeof value === 'object' && value !== null && 'value' in value) {
        console.log('herer', newFieldKey);
        const attributes = findChildrenAttributes(value);
        result.push(
          createLeaf(currentMetadataLookup, newFieldKey, value.value, undefined, attributes)
        );
      } else {
        // If Group
        result.push(
          removeEmpty({
            name: fieldKey,
            attributes: findChildrenAttributes(value),
            children: transformToCoraData(lookup, value, currentPath, repeatId)
          } as DataGroup)
        );
      }
    }
  });
  return result;
};
