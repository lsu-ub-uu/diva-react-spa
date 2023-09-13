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

import { removeEmpty } from '../utils/structs/removeEmpty';
import { DataGroup, DataListWrapper, RecordWrapper } from '../utils/cora-data/CoraData';
import {
  extractAttributeValueByName,
  extractIdFromRecordInfo
} from '../utils/cora-data/CoraDataTransforms';
import {
  containsChildWithNameInData,
  getFirstChildWithNameInData,
  getFirstDataGroupWithNameInDataAndAttributes
} from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { BFFPresentationGroup } from './bffTypes';
import { getChildReferencesListFromGroup } from './transformMetadata';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';

export const transformCoraPresentationGroups = (
  dataListWrapper: DataListWrapper
): BFFPresentationGroup[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecordWrappers = dataListWrapper.dataList.data;
  return coraRecordWrappers.map(transformCoraPresentationGroupToBFFPresentationGroup);
};

const transformCoraPresentationGroupToBFFPresentationGroup = (
  coraRecordWrapper: RecordWrapper
): BFFPresentationGroup => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const presentationOf = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationOf'
  );
  const mode = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'mode');

  const childReferencesList = getChildReferencesListFromGroup(dataRecordGroup);
  const children = childReferencesList.map((childReference) => {
    return transformChildReference(childReference);
  });

  return {
    id,
    mode,
    presentationOf,
    children
  } as BFFPresentationGroup;
};

const transformChildReference = (childReference: DataGroup) => {
  const refGroup = getFirstDataGroupWithNameInDataAndAttributes(childReference, 'refGroup');
  const ref = getFirstChildWithNameInData(refGroup, 'ref');
  const childId = extractLinkedRecordIdFromNamedRecordLink(refGroup, 'ref');
  const type = extractAttributeValueByName(ref as DataGroup, 'type');

  let minNumberOfRepeatingToShow;
  if (containsChildWithNameInData(childReference, 'minNumberOfRepeatingToShow')) {
    minNumberOfRepeatingToShow = getFirstDataAtomicValueWithNameInData(
      childReference,
      'minNumberOfRepeatingToShow'
    );
  }

  return removeEmpty({ childId, type, minNumberOfRepeatingToShow });
};
