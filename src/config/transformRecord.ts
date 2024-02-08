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

import _ from 'lodash';
import {
  Attributes,
  DataAtomic,
  DataGroup,
  DataListWrapper,
  RecordLink,
  RecordWrapper
} from '../utils/cora-data/CoraData';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import {
  containsChildWithNameInData,
  getAllChildrenWithNameInData,
  getFirstDataGroupWithNameInData
} from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';
import { FormMetaData } from '../formDefinition/formDefinition';
import { Dependencies } from '../formDefinition/formDefinitionsDep';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { createFormMetaDataPathLookup } from '../utils/structs/metadataPathLookup';
import { createFormMetaData } from '../formDefinition/formMetadata';

/**
 * Detects a DataGroup
 * @param item
 */
export function isDataGroup(item: DataGroup | DataAtomic | RecordLink) {
  return (
    Object.prototype.hasOwnProperty.call(item, 'name') &&
    Object.prototype.hasOwnProperty.call(item, 'children')
  );
}

/**
 * Detects a DataAtomic
 * @param item
 */
export function isDataAtomic(item: DataGroup | DataAtomic | RecordLink) {
  return (
    Object.prototype.hasOwnProperty.call(item, 'name') &&
    Object.prototype.hasOwnProperty.call(item, 'value')
  );
}

/**
 * Detects a RecordLink
 * @param item
 */
export function isRecordLink(item: DataGroup | DataAtomic | RecordLink) {
  if (!isDataGroup(item)) return false;
  const group = item as DataGroup;
  const recordLinkChildren = group.children.filter((child: DataGroup | DataAtomic | RecordLink) => {
    return child.name === 'linkedRecordType' || child.name === 'linkedRecordId';
  });
  return recordLinkChildren.length === 2;
}

export function isRepeating(
  item: DataGroup | DataAtomic | RecordLink,
  currentPath: string,
  formPathLookup?: Record<string, FormMetaData>
) {
  const lookup = formPathLookup ?? {};
  const formComponent = lookup[currentPath];
  let isFormDataRepeating = false;
  if (formComponent) {
    isFormDataRepeating = formComponent.repeat.repeatMin === 0;
  }
  return Object.prototype.hasOwnProperty.call(item, 'repeatId') || isFormDataRepeating;
}

const extractRecordInfoDataGroup = (coraRecordGroup: DataGroup): DataGroup => {
  return getFirstDataGroupWithNameInData(coraRecordGroup, 'recordInfo') as DataGroup;
};

const extractRecordUpdates = (recordInfo: DataGroup): unknown[] => {
  const updates = getAllChildrenWithNameInData(recordInfo, 'updated');
  return updates.map((update) => {
    const updatedGroup = update as DataGroup;
    const updatedBy = extractLinkedRecordIdFromNamedRecordLink(updatedGroup, 'updatedBy');
    const updateAt = getFirstDataAtomicValueWithNameInData(updatedGroup, 'tsUpdated');
    return { updateAt, updatedBy };
  });
};

/**
 * Transforms records
 * @param dependencies
 * @param dataListWrapper
 */
export const transformRecords = (
  dependencies: Dependencies,
  dataListWrapper: DataListWrapper
): unknown[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map((recordWrapper) => transformRecord(dependencies, recordWrapper));
};

/**
 * Transform Record
 * @param dependencies
 * @param recordWrapper
 */
export const transformRecord = (
  dependencies: Dependencies,
  recordWrapper: RecordWrapper
): unknown => {
  const coraRecord = recordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  let createdAt;
  let createdBy;

  const id = extractIdFromRecordInfo(dataRecordGroup);
  const recordInfo = extractRecordInfoDataGroup(dataRecordGroup);

  const recordType = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'type');
  const validationType = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'validationType');

  if (containsChildWithNameInData(recordInfo, 'tsCreated')) {
    createdAt = getFirstDataAtomicValueWithNameInData(recordInfo, 'tsCreated');
  }

  if (containsChildWithNameInData(recordInfo, 'createdBy')) {
    createdBy = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'createdBy');
  }
  const updated = extractRecordUpdates(recordInfo);

  const formMetadata = createFormMetaData(dependencies, validationType, 'update');
  const formPathLookup = createFormMetaDataPathLookup(formMetadata);

  let userRights: string[] = [];
  if (coraRecord.actionLinks !== undefined) {
    userRights = Object.keys(coraRecord.actionLinks);
  }

  const data = traverseDataGroup(dataRecordGroup, formPathLookup);
  return removeEmpty({
    id,
    recordType,
    validationType,
    createdAt,
    createdBy,
    updated,
    userRights,
    data
  });
};

/**
 * Transform object attributes with _ prefix to key
 * @param attributes
 */
export const transformObjectAttributes = (attributes: Attributes | undefined) => {
  if (attributes === undefined) return [];

  return Object.keys(attributes).map((key) => {
    const value = attributes[key];
    return { [`_${key}`]: value };
  });
};

export const traverseDataGroup = (
  dataGroup: DataGroup,
  formPathLookup?: Record<string, FormMetaData>,
  path?: string
) => {
  const validChildren = dataGroup.children.filter((group) => group.name !== 'recordInfo');
  const groupedByName = _.groupBy(validChildren, 'name');
  const groupedEntries = Object.entries(groupedByName);
  path = path === undefined ? dataGroup.name : path;

  // handle attributes on the current group
  const groupAttributes = transformObjectAttributes(dataGroup.attributes);

  const object: unknown[] = [];
  groupedEntries.forEach(([name, groupedChildren]) => {
    const currentPath = path ? `${path}.${name}` : name;

    // iterate over the name array
    let repeating = false;
    let isGroup = false;
    const thisLevelChildren = groupedChildren.map((child) => {
      if (isRecordLink(child) && !isRepeating(child, currentPath, formPathLookup)) {
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(childGroup.attributes);
        const recordId = getFirstDataAtomicValueWithNameInData(childGroup, 'linkedRecordId');
        return { [name]: Object.assign({ value: recordId }, ...recordLinkAttributes) };
      }

      if (isRecordLink(child) && isRepeating(child, currentPath, formPathLookup)) {
        repeating = true;
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(childGroup.attributes);
        const recordId = getFirstDataAtomicValueWithNameInData(childGroup, 'linkedRecordId');
        return Object.assign({ value: recordId }, ...recordLinkAttributes);
      }

      if (isDataGroup(child) && !isRepeating(child, currentPath, formPathLookup)) {
        repeating = false;
        isGroup = true;
        const childGroup = child as DataGroup;
        return traverseDataGroup(childGroup, formPathLookup, currentPath);
      }

      if (isDataGroup(child) && isRepeating(child, currentPath, formPathLookup)) {
        repeating = true;
        isGroup = true;
        const childGroup = child as DataGroup;
        return traverseDataGroup(childGroup, formPathLookup, currentPath);
      }

      if (isDataAtomic(child) && !isRepeating(child, currentPath, formPathLookup)) {
        repeating = false;
        isGroup = false;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(dataAtomic.attributes);
        const { value } = child as DataAtomic;
        return { [name]: Object.assign({ value }, ...atomicAttributes) };
      }

      if (isDataAtomic(child) && isRepeating(child, currentPath, formPathLookup)) {
        repeating = true;
        isGroup = false;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(dataAtomic.attributes);
        const { value } = child as DataAtomic;
        return Object.assign({ value }, ...atomicAttributes);
      }
    });

    if (repeating && !isGroup) {
      object.push({ [name]: thisLevelChildren });
    } else if (repeating && isGroup) {
      object.push({ [name]: thisLevelChildren.map((item) => item[name]) });
    } else {
      object.push(Object.assign({}, ...thisLevelChildren));
    }
  });

  return { [dataGroup.name]: Object.assign({}, ...[...object, ...groupAttributes]) };
};
