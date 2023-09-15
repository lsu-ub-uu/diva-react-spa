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

import { DataGroup, DataListWrapper, RecordWrapper } from '../utils/cora-data/CoraData';
import {
  extractIdFromRecordInfo,
  extractAttributeValueByName
} from '../utils/cora-data/CoraDataTransforms';
import {
  containsChildWithNameInData,
  getAllDataGroupsWithNameInDataAndAttributes,
  getFirstDataGroupWithNameInData
} from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';
import { BFFMetadata, BFFMetadataGroup, BFFMetadataGroupChild, BFFMetadataTextVariable } from './bffTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';

export const transformMetadata = (dataListWrapper: DataListWrapper): BFFMetadata[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoraRecordToBFFMetaData);
};

const transformCoraRecordToBFFMetaData = (coraRecordWrapper: RecordWrapper): BFFMetadata => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  return transformRecordGroupMetadataToBFF(dataRecordGroup) as BFFMetadata;
};

const transformRecordGroupMetadataToBFF = (dataRecordGroup: DataGroup) => {
  let metadata = transformBasicMetadata(dataRecordGroup);

  switch (metadata.type) {
    case 'group': {
      return transformMetadataGroup(dataRecordGroup, metadata);
    }
    // TODO add more types
    default: {
      return transformTextVariable(dataRecordGroup, metadata);
    }
  }
};

const transformTextVariable = (dataRecordGroup: DataGroup, metadata: BFFMetadata): BFFMetadata => {
  if (containsChildWithNameInData(dataRecordGroup, 'finalValue')) {
    const finalValue = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'finalValue');
    metadata = { ...metadata, finalValue } as BFFMetadata;
  }

  const regEx = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'regEx');
  return { ...metadata, regEx } as BFFMetadataTextVariable;
};

const transformBasicMetadata = (dataRecordGroup: DataGroup) => {
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const nameInData = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'nameInData');
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const textId = extractLinkedRecordIdFromNamedRecordLink(dataRecordGroup, 'textId');
  const defTextId = extractLinkedRecordIdFromNamedRecordLink(dataRecordGroup, 'defTextId');

  return {
    id,
    nameInData,
    type,
    textId,
    defTextId
  } as BFFMetadata;
};

const transformMetadataGroup = (dataRecordGroup: DataGroup, metadata: BFFMetadata) => {
  const childReferencesList = getChildReferencesListFromGroup(dataRecordGroup);

  const children: BFFMetadataGroupChild[] = childReferencesList.map((childReference) => {
    return transformChildReference(childReference);
  });

  return {
    ...metadata,
    children
  } as BFFMetadataGroup;
};
export const getChildReferencesListFromGroup = (dataRecordGroup: DataGroup) => {
  const childReferences = getFirstDataGroupWithNameInData(dataRecordGroup, 'childReferences');

  return getAllDataGroupsWithNameInDataAndAttributes(childReferences, 'childReference');
};

const transformChildReference = (childReference: DataGroup) : BFFMetadataGroupChild => {
  const childId = extractLinkedRecordIdFromNamedRecordLink(childReference, 'ref');
  const repeatMin = getFirstDataAtomicValueWithNameInData(childReference, 'repeatMin');
  const repeatMax = getFirstDataAtomicValueWithNameInData(childReference, 'repeatMax');

  let recordPartConstraint;
  if (containsChildWithNameInData(childReference, 'recordPartConstraint')) {
    recordPartConstraint = getFirstDataAtomicValueWithNameInData(
      childReference,
      'recordPartConstraint'
    );
  }

  return removeEmpty({ childId, repeatMin, repeatMax, recordPartConstraint }) as BFFMetadataGroupChild;
};
