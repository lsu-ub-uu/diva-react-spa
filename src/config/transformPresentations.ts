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

import { DataListWrapper, RecordWrapper } from '../utils/cora-data/CoraData';
import {
  extractAttributeValueByName,
  extractIdFromRecordInfo
} from '../utils/cora-data/CoraDataTransforms';
import { extractLinkedRecordIdFromNamedRecordLink } from '../config/transformValidationTypes';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { BFFPresentation } from './bffTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';

export const transformCoraPresentations = (dataListWrapper: DataListWrapper): BFFPresentation[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecordWrappers = dataListWrapper.dataList.data;
  return coraRecordWrappers.map(transformCoraPresentationToBFFPresentation);
};

const transformCoraPresentationToBFFPresentation = (
  coraRecordWrapper: RecordWrapper
): BFFPresentation => {
  const dataRecordGroup = coraRecordWrapper.record.data;

  const id = extractIdFromRecordInfo(dataRecordGroup);
  const presentationOf = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationOf'
  );
  const mode = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'mode');
  const inputType = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'inputType');
  let emptyTextId;
  try {
    emptyTextId = extractLinkedRecordIdFromNamedRecordLink(dataRecordGroup, 'emptyTextId');
  } catch (error: unknown) {
    //@ts-ignore
    console.error('id: ', id, 'error: ', error.message);
  }
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  return removeEmpty({ id, presentationOf, mode, inputType, emptyTextId, type } as BFFPresentation);
};
