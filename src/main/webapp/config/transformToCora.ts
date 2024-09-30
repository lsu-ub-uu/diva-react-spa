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
  repeatId?: string,
  hasSiblings?: boolean
): (DataGroup | DataAtomic | RecordLink)[] => {
  const result: (DataGroup | DataAtomic)[] = [];
  Object.keys(payload).forEach((fieldKey) => {
    const value = payload[fieldKey];
    const currentPath = path ? `${path}.${fieldKey}` : fieldKey;
    const checkIfHasSiblings = siblingWithSameNameInData(value) || hasSiblings;

    if (isNotAttribute(fieldKey)) {
      const currentMetadataLookup = lookup[currentPath];
      const shouldDataHaveRepeatId = currentMetadataLookup.repeat.repeatMax > 1;
      if (isRepeatingVariable(value)) {
        value.forEach((item: DataGroup | DataAtomic, index: number) => {
          if (isVariable(item)) {
            const atomic = item as DataAtomic;
            const attributes = findChildrenAttributes(atomic);
            result.push(
              createLeaf(
                currentMetadataLookup,
                removeAttributeFromName(fieldKey, attributes),
                atomic.value,
                shouldDataHaveRepeatId ? index.toString() : undefined,
                attributes
              )
            );
          } else {
            const group = item as DataGroup;
            const attributes = findChildrenAttributes(group);
            result.push(
              removeEmpty({
                name: removeAttributeFromName(fieldKey, attributes),
                attributes,
                repeatId: shouldDataHaveRepeatId ? index.toString() : undefined,
                children: transformToCoraData(lookup, group, currentPath, repeatId)
              } as DataGroup)
            );
          }
        });
      } else if (isNonRepeatingVariable(value)) {
        const attributes = findChildrenAttributes(value);
        result.push(
          createLeaf(
            currentMetadataLookup,
            removeAttributeFromName(fieldKey, attributes),
            value.value,
            undefined,
            attributes
          )
        );
      } else {
        // If Group
        const attributes = findChildrenAttributes(value);
        result.push(
          removeEmpty({
            name: removeAttributeFromName(fieldKey, attributes),
            attributes,
            children: transformToCoraData(lookup, value, currentPath, repeatId, checkIfHasSiblings)
          } as DataGroup)
        );
      }
    }
  });
  return result;
};

const siblingWithSameNameInData = (value: any) => {
  const stripedNames = Object.keys(value).map((names) => {
    return names.split('_')[0];
  });
  return stripedNames.filter((item, index) => !(stripedNames.indexOf(item) === index)).length > 0;
};

export const removeAttributeFromName = (
  name: string,
  value: { [key: string]: string } | undefined
) => {
  if (value === undefined) {
    return name;
  }
  return name.split('_')[0];
};

const isNotAttribute = (fieldKey: string) => {
  return !fieldKey.startsWith('_');
};

const isRepeatingVariable = (value: any) => {
  return Array.isArray(value);
};

const isVariable = (item: DataGroup | DataAtomic) => {
  return 'value' in item;
};

const isNonRepeatingVariable = (value: any) => {
  return typeof value === 'object' && value !== null && 'value' in value;
};
