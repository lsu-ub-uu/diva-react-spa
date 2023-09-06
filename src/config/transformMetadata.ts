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
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '../utils/cora-data/CoraData';
import {
  extractIdFromRecordInfo,
  extractAttributeValueByName,
} from '../utils/cora-data/CoraDataTransforms';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';

interface BFFMetadata {
  id: string;
  nameInData: string;
  type:
    | 'group'
    | 'numberVariable'
    | 'resourceLink'
    | 'collectionItem'
    | 'recordLink'
    | 'textVariable'
    | 'collectionVariable'
    | 'itemCollection';
  textId: string;
  defTextId: string;
}
interface BFFMetadataTextVariable extends BFFMetadata {
  regEx: string;
  finalValue?: string;
}

export const transformMetadata = (
  dataListWrapper: DataListWrapper,
): BFFMetadata[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoraRecordToBFFMetaData);
};

const transformCoraRecordToBFFMetaData = (
  coraRecordWrapper: RecordWrapper,
): BFFMetadata => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  return transformRecordGroupToBFF(dataRecordGroup) as BFFMetadata;
};

const transformRecordGroupToBFF = (dataRecordGroup: DataGroup) => {
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const nameInData = getFirstDataAtomicValueWithNameInData(
    dataRecordGroup,
    'nameInData',
  );
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const textId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'textId',
  );
  const defTextId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'defTextId',
  );

  const regEx = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'regEx');

  const finalValue = getFirstDataAtomicValueWithNameInData(
    dataRecordGroup,
    'finalValue',
  );

  let metadata = {
    id,
    nameInData,
    type,
    textId,
    defTextId,
  } as BFFMetadata;

  if (finalValue) {
    metadata = { ...metadata, finalValue } as BFFMetadata;
  }

  switch (type) {
    case 'textVariable':
      return { ...metadata, regEx } as BFFMetadataTextVariable;
    default:
      return metadata;
      break;
  }
};
