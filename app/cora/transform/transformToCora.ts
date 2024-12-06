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

type Data = DataGroup | DataAtomic | RecordLink | undefined;
export const transformToCoraData = (
  lookup: Record<string, FormMetaData>,
  payload: any,
): (DataGroup | DataAtomic | RecordLink)[] => {
  return transformToCoraDataRecursively(lookup, payload).data;
};

const transformToCoraDataRecursively = (
  lookup: Record<string, FormMetaData>,
  payload: any,
  path?: string,
  repeatId?: string,
): {
  data: (DataGroup | DataAtomic | RecordLink)[];
  hasValuableData: boolean;
} => {
  const transformedEntries = Object.entries(payload).map(([key, value]) => {
    if (isAttribute(key)) {
      return { entry: undefined, hasValuableData: false };
    }

    const currentPath = path ? `${path}.${key}` : key;

    return transformEntry(
      lookup,
      getFieldMetadata(lookup, currentPath),
      key,
      value,
      currentPath,
      repeatId,
    );
  });

  return {
    data: transformedEntries
      .flatMap((entry) => entry.entry)
      .filter((entry) => entry !== undefined),
    hasValuableData: transformedEntries.some((entry) => entry.hasValuableData),
  };
};

/**
 * Takes a key and a value and returns an object with  the format { name, attributes, children: [] }
 */
export const transformEntry = (
  lookup: Record<string, FormMetaData>,
  fieldMetadata: FormMetaData,
  key: string,
  value: any,
  path?: string,
  repeatId?: string,
): { entry: Data | Data[]; hasValuableData: boolean } => {
  const attributes = findChildrenAttributes(value);
  const shouldDataHaveRepeatId = fieldMetadata.repeat.repeatMax > 1;

  if (isRepeatingVariable(value)) {
    const entries = value.map((item, index) =>
      transformEntry(
        lookup,
        fieldMetadata,
        key,
        item,
        path,
        shouldDataHaveRepeatId ? index.toString() : undefined,
      ),
    );

    return {
      entry: entries.flatMap((entry) => entry.entry),
      hasValuableData: entries.some((entry) => entry.hasValuableData),
    };
  }

  if (isVariable(value)) {
    const leaf = createLeaf(
      fieldMetadata,
      removeAttributeFromName(key, attributes),
      value.value,
      repeatId,
      attributes,
    );
    return {
      entry: leaf,
      hasValuableData: isValuable(value.value, fieldMetadata),
    };
  }

  const childData = transformToCoraDataRecursively(lookup, value, path);

  if (isOptional(fieldMetadata) && !childData.hasValuableData) {
    return { entry: undefined, hasValuableData: false };
  }

  return {
    entry: createGroup(
      fieldMetadata,
      key,
      attributes,
      repeatId,
      childData.data,
    ),
    hasValuableData: childData.hasValuableData,
  };
};

const isValuable = (value: string, fieldMetadata: FormMetaData) => {
  return !isEmpty(value) && !isFinalValue(fieldMetadata);
};

const getFieldMetadata = (
  lookup: Record<string, FormMetaData>,
  currentPath: string,
): FormMetaData => {
  const fieldMetadata = lookup[currentPath];
  if (fieldMetadata === undefined) {
    throw new Error(`Failed to find path ${currentPath} in lookup`);
  }
  return fieldMetadata;
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

export const isAttribute = (fieldKey: string) => {
  return fieldKey.startsWith('_');
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
  attributes: Attributes | undefined = undefined,
): DataAtomic | RecordLink | undefined => {
  if (isEmpty(value)) {
    return undefined;
  }
  if (
    ['numberVariable', 'textVariable', 'collectionVariable'].includes(
      metaData.type,
    )
  ) {
    const atomic: DataAtomic = {
      name,
      value,
    };

    if (attributes) {
      atomic.attributes = attributes;
    }

    if (repeatId) {
      atomic.repeatId = repeatId;
    }

    return atomic;
  }

  return createRecordLink(
    name,
    metaData.linkedRecordType ?? '',
    value,
    attributes,
    repeatId,
  );
};

const createGroup = (
  metaData: FormMetaData,
  key: string,
  attributes: undefined | ({} & Record<string, string>),
  repeatId: string | undefined,
  childData: any,
) => {
  const group: DataGroup = {
    name: removeAttributeFromName(key, attributes),
    children: childData,
  };

  if (attributes) {
    group.attributes = attributes;
  }

  if (repeatId) {
    group.repeatId = repeatId;
  }
  return group;
};

export const createRecordLink = (
  name: string,
  linkedRecordType: string,
  linkedRecordId: string,
  attributes: Attributes | undefined = undefined,
  repeatId: string | undefined = undefined,
): RecordLink => {
  const recordLink: RecordLink = {
    name,
    children: [
      generateAtomicValue('linkedRecordType', linkedRecordType),
      generateAtomicValue('linkedRecordId', linkedRecordId),
    ],
  };

  if (attributes) {
    recordLink.attributes = attributes;
  }

  if (repeatId) {
    recordLink.repeatId = repeatId;
  }

  return recordLink;
};

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
    createRecordLink('updatedBy', 'user', userId),
    generateAtomicValue('tsUpdated', updatedAt),
  ];
  return removeEmpty({ name, children, repeatId: '0' }) as DataGroup;
};
