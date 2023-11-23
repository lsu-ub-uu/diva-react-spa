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
  RecordLink,
  RecordWrapper,
} from '../utils/cora-data/CoraData';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import {
  getAllChildrenWithNameInData,
  getFirstDataGroupWithNameInData
} from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';

export function isDataGroup(item: DataGroup | DataAtomic | RecordLink) {
  return (
    Object.prototype.hasOwnProperty.call(item, 'name') &&
    Object.prototype.hasOwnProperty.call(item, 'children')
  );
}

export function isDataAtomic(item: DataGroup | DataAtomic | RecordLink) {
  return (
    Object.prototype.hasOwnProperty.call(item, 'name') &&
    Object.prototype.hasOwnProperty.call(item, 'value')
  );
}

export function isRecordLink(item: DataGroup | DataAtomic | RecordLink) {
  if (!isDataGroup(item)) return false;
  const group = (item as DataGroup);
  const recordLinkChildren = group.children.filter((child: DataGroup | DataAtomic | RecordLink) => {
    return (child.name === 'linkedRecordType' || child.name === 'linkedRecordId');
  });
  return recordLinkChildren.length === 2;
}

export function isRepeating(item: DataGroup | DataAtomic | RecordLink) {
  return Object.prototype.hasOwnProperty.call(item, 'repeatId');
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

export const transformRecord = (recordWrapper: RecordWrapper): unknown => {
  const coraRecord = recordWrapper.record;
  const dataRecordGroup = coraRecord.data;

  const id = extractIdFromRecordInfo(dataRecordGroup);
  const recordInfo = extractRecordInfoDataGroup(dataRecordGroup);

  const recordType = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'type');
  const validationType = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'validationType');
  const createdAt = getFirstDataAtomicValueWithNameInData(recordInfo, 'tsCreated');
  const createdBy = extractLinkedRecordIdFromNamedRecordLink(recordInfo, 'createdBy');
  const updated = extractRecordUpdates(recordInfo);

  let userRights: string[] = [];
  if (coraRecord.actionLinks !== undefined) {
    userRights = Object.keys(coraRecord.actionLinks);
  }

  let data = traverseDataGroup(dataRecordGroup);

  return { id, recordType, validationType, createdAt, createdBy, updated, userRights, data };
};

const transformObjectAttributes = (attrObject: Attributes | undefined) => {
  let attributesArray = [];
  for (const key in attrObject) {
    attributesArray.push({ [`_${key}`]: attrObject[key] });
  }
  return attributesArray;
};

export const traverseDataGroup = (dataGroup: DataGroup) => {
  const validChildren = dataGroup.children.filter((group) => group.name !== 'recordInfo');
  const groupedByName = _.groupBy(validChildren, 'name');
  const groupedEntries = Object.entries(groupedByName);

  // handle attributes on the current group
  const groupAttributes = transformObjectAttributes(dataGroup.attributes);

  let object: unknown[] = [];
  groupedEntries.forEach(([name, groupedChildren]) => {

    // iterate over the name array
    let repeating = false;
    let isGroup = false;
    const thisLevelChildren = groupedChildren.map((child) => {

      if (isRecordLink(child) && !isRepeating(child)) {
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(childGroup.attributes);
        const recordId = getFirstDataAtomicValueWithNameInData(childGroup, 'linkedRecordId')
        return { [name]: Object.assign({ value: recordId }, ...recordLinkAttributes) }
      }

      if (isRecordLink(child) && isRepeating(child)) {
        repeating = true;
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(childGroup.attributes);
        const recordId = getFirstDataAtomicValueWithNameInData(childGroup, 'linkedRecordId')
        return Object.assign({ value: recordId }, ...recordLinkAttributes);
      }

      if (isDataGroup(child) && !isRepeating(child)) {
        const childGroup = child as DataGroup;
        return traverseDataGroup(childGroup);
      }

      if (isDataGroup(child) && isRepeating(child)) {
        repeating = true;
        isGroup = true;
        const childGroup = child as DataGroup;
        return traverseDataGroup(childGroup);
      }

      if (isDataAtomic(child) && !isRepeating(child)) {
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(dataAtomic.attributes);
        const value = (child as DataAtomic).value;
        return { [name]: Object.assign({ value }, ...atomicAttributes) }
      }
      
      if (isDataAtomic(child) && isRepeating(child)) {
        repeating = true;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(dataAtomic.attributes);
        const value = (child as DataAtomic).value;
        return Object.assign({ value }, ...atomicAttributes)
      }
    }); // end map

    // each unique name on that level
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
