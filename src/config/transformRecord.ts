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
import { Attributes, DataAtomic, DataGroup, RecordLink, RecordWrapper } from '../utils/cora-data/CoraData';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import {
  getAllChildrenWithNameInData,
  getFirstDataGroupWithNameInData,
} from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';

export function isDataGroup(item: DataGroup | DataAtomic | RecordLink) {
  return Object.prototype.hasOwnProperty.call(item, 'name') && Object.prototype.hasOwnProperty.call(item, 'children');
}

export function isDataAtomic(item: DataGroup | DataAtomic | RecordLink) {
  return Object.prototype.hasOwnProperty.call(item, 'name') && Object.prototype.hasOwnProperty.call(item, 'value');
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
}

export const transformRecord = (
  recordWrapper: RecordWrapper,
): unknown => {
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

  return { id, recordType, validationType, createdAt, createdBy, updated, userRights };
};

const transformObjectAttributes = (attrObject: Attributes | undefined) => {
  let attributesArray = [];
  for (const key in attrObject) {
    attributesArray.push({ [`_${key}`]: attrObject[key] });
  }
  return attributesArray;
};


export const traverseDataGroup = (dataGroup: DataGroup) => {
  const children = dataGroup.children;

  const childNames = children.map((child) => child.name);
  const uniqueChildNames = _.uniq(childNames);
  const countChildNames = _.countBy(childNames);
  // todo check if childNames occur more than on time.
  // console.log(countChildNames);

  // handle attributes on the current group
  const groupAttributes = transformObjectAttributes(dataGroup.attributes)

  const object: unknown[] = children.map((child) => {
    if (isDataGroup(child)) {
      const childGroup = (child as DataGroup);
      return traverseDataGroup(childGroup);
    }

    // handle repeating. 

    // handle leafs // todo recordLinks
    if (isDataAtomic(child)) {
      const dataAtomic = child as DataAtomic;
      const atomicAttributes = transformObjectAttributes(dataAtomic.attributes)
      const value = (child as DataAtomic).value;
      return {[child.name]: Object.assign({value}, ...atomicAttributes)};
    }
  })
  return {[dataGroup.name]: Object.assign({}, ...[...object, ...groupAttributes])};
}



