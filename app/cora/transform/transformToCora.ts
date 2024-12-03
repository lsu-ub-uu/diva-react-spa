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

import {
  Attributes,
  DataAtomic,
  DataGroup,
  RecordLink,
} from '@/cora/cora-data/CoraData';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { FormMetaData } from '@/data/formDefinition/formDefinition';
import { containsChildWithNameInData } from '@/cora/cora-data/CoraDataUtils';
import { isEmpty } from 'lodash-es';

export const transformToCoraData = (
  lookup: Record<string, FormMetaData>,
  payload: any,
): (DataGroup | DataAtomic)[] => {
  const [result] = transformToCoraDataRecursively(lookup, payload);
  return result;
};

const transformToCoraDataRecursively = (
  lookup: Record<string, FormMetaData>,
  payload: any,
  path?: string,
  repeatId?: string,
  hasSiblings?: boolean,
): [(DataGroup | DataAtomic)[], boolean] => {
  let hasValuableData = false;
  const result: (DataGroup | DataAtomic)[] = [];
  Object.keys(payload).forEach((fieldKey) => {
    const value = payload[fieldKey];
    const currentPath = path ? `${path}.${fieldKey}` : fieldKey;
    const siblingsWithSameNameInData =
      hasSiblingsWithSameNameInData(value) || hasSiblings;

    if (isNotAttribute(fieldKey)) {
      const fieldMetadata = lookup[currentPath];
      if (fieldMetadata === undefined) {
        throw new Error(`Failed to find path ${currentPath} in lookup`);
      }
      const shouldDataHaveRepeatId = fieldMetadata.repeat.repeatMax > 1;

      if (isRepeatingVariable(value)) {
        const transformedItems = value
          .map((item: DataGroup | DataAtomic, index: number) => {
            if (isVariable(item)) {
              const atomic = item as DataAtomic;
              const attributes = findChildrenAttributes(atomic);

              if (!isEmpty(atomic.value)) {
                hasValuableData = !isFinalValue(fieldMetadata);
                return createLeaf(
                  fieldMetadata,
                  removeAttributeFromName(fieldKey, attributes),
                  atomic.value,
                  shouldDataHaveRepeatId ? index.toString() : undefined,
                  attributes,
                );
              }
            } else {
              const group = item as DataGroup;
              const attributes = findChildrenAttributes(group);

              const [childData, childrenHasValuableData] =
                transformToCoraDataRecursively(
                  lookup,
                  group,
                  currentPath,
                  repeatId,
                );

              const canBeRemoved =
                isOptional(fieldMetadata) && !childrenHasValuableData;

              if (!canBeRemoved) {
                return removeEmpty({
                  name: removeAttributeFromName(fieldKey, attributes),
                  attributes,
                  repeatId: shouldDataHaveRepeatId
                    ? index.toString()
                    : undefined,
                  children: childData,
                } as DataGroup);
              }
            }
          })
          .filter((value) => value !== undefined);
        result.push(...transformedItems);
        // Remove items that do not hold valuable data
      } else if (isNonRepeatingVariable(value)) {
        const attributes = findChildrenAttributes(value);
        if (!isEmpty(value.value)) {
          hasValuableData = !isFinalValue(fieldMetadata);
          result.push(
            createLeaf(
              fieldMetadata,
              removeAttributeFromName(fieldKey, attributes),
              value.value,
              undefined,
              attributes,
            ),
          );
        }
      } else {
        const attributes = findChildrenAttributes(value);
        const [childData, childrenHasValuableData] =
          transformToCoraDataRecursively(
            lookup,
            value,
            currentPath,
            repeatId,
            siblingsWithSameNameInData,
          );

        const canBeRemoved =
          isOptional(fieldMetadata) && !childrenHasValuableData;
        // TODO Remove group if repeat 1-X and at least one sibling has valuableData
        if (!canBeRemoved) {
          result.push(
            removeEmpty({
              name: removeAttributeFromName(fieldKey, attributes),
              attributes,
              children: childData,
            }),
          );
        }
      }
    }
  });
  return [result, hasValuableData];
};

const isFinalValue = (currentMetadataLookup: FormMetaData) => {
  return currentMetadataLookup.finalValue !== undefined;
};
const isOptional = (fieldMetadata: FormMetaData) => {
  return fieldMetadata.repeat.repeatMin === 0;
};

export const hasSiblingsWithSameNameInData = (value: any) => {
  const stripedNames = Object.keys(value).map((names) => {
    return names.split('_')[0];
  });
  return (
    stripedNames.filter(
      (item, index) => !(stripedNames.indexOf(item) === index),
    ).length > 0
  );
};

export const isNotAttribute = (fieldKey: string) => {
  return !fieldKey.startsWith('_');
};

export const isRepeatingVariable = (value: any) => {
  return Array.isArray(value);
};

export const isVariable = (item: DataGroup | DataAtomic) => {
  return 'value' in item;
};

export const isNonRepeatingVariable = (value: any) => {
  return typeof value === 'object' && value !== null && 'value' in value;
};

export const findChildrenAttributes = (obj: any) => {
  const attributesArray: Record<string, string>[] = [];
  Object.keys(obj).forEach((key) => {
    if (Object.hasOwn(obj, key) && key.startsWith('_')) {
      const value = obj[key];
      attributesArray.push({ [key.substring(1)]: value });
    }
  });
  if (!attributesArray.length) {
    return undefined;
  }
  return Object.assign({}, ...attributesArray);
};

export const createLeaf = (
  metaData: FormMetaData,
  name: string,
  value: string,
  repeatId: string | undefined = undefined,
  inAttributes: Attributes | undefined = undefined,
): DataAtomic | RecordLink => {
  if (
    ['numberVariable', 'textVariable', 'collectionVariable'].includes(
      metaData.type,
    )
  ) {
    return removeEmpty({
      name,
      value,
      attributes: inAttributes,
      repeatId,
    } as DataAtomic);
  }
  return generateRecordLink(
    name,
    metaData.linkedRecordType ?? '',
    value,
    inAttributes,
    repeatId,
  );
};

export const generateRecordLink = (
  name: string,
  linkedRecordType: string,
  linkedRecordId: string,
  inAttributes: Attributes | undefined = undefined,
  repeatId: string | undefined = undefined,
): RecordLink =>
  removeEmpty({
    name,
    attributes: inAttributes,
    children: [
      generateAtomicValue('linkedRecordType', linkedRecordType),
      generateAtomicValue('linkedRecordId', linkedRecordId),
    ],
    repeatId,
  });

export const generateAtomicValue = (name: string, value: any): DataAtomic => ({
  name,
  value,
});

export const removeAttributeFromName = (
  name: string,
  value: { [key: string]: string } | undefined,
) => {
  if (value === undefined) {
    return name;
  }
  return name.split('_')[0];
};

export const doesRecordInfoExist = (dataGroup: DataGroup) => {
  return containsChildWithNameInData(dataGroup, 'recordInfo');
};

export const generateLastUpdateInfo = (userId: string, updatedAt: string) => {
  const name = 'updated';
  const children = [
    generateRecordLink('updatedBy', 'user', userId),
    generateAtomicValue('tsUpdated', updatedAt),
  ];
  return removeEmpty({ name, children, repeatId: '0' }) as DataGroup;
};
