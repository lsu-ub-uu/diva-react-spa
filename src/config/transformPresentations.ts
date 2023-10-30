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
  extractAttributeValueByName,
  extractIdFromRecordInfo
} from '../utils/cora-data/CoraDataTransforms';
import { extractLinkedRecordIdFromNamedRecordLink } from '../config/transformValidationTypes';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { BFFPresentationContainer, BFFPresentation, BFFPresentationGroup } from './bffTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { getChildReferencesListFromGroup } from './transformMetadata';
import {
  containsChildWithNameInData,
  getAllDataAtomicsWithNameInData,
  getAllRecordLinksWithNameInData,
  getFirstChildWithNameInData,
  getFirstDataGroupWithNameInDataAndAttributes
} from '../utils/cora-data/CoraDataUtils';

export const transformCoraPresentations = (
  dataListWrapper: DataListWrapper
): (BFFPresentation | BFFPresentationGroup)[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecordWrappers = dataListWrapper.dataList.data;
  const presentations = coraRecordWrappers.map(transformCoraPresentationToBFFPresentation);
  return presentations.filter((item) => item !== undefined) as (
    | BFFPresentation
    | BFFPresentationGroup
  )[];
};

const transformCoraPresentationToBFFPresentation = (
  coraRecordWrapper: RecordWrapper
): BFFPresentation | BFFPresentationGroup | BFFPresentationContainer | undefined => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const type = extractAttributeValueByName(dataRecordGroup, 'type');

  switch (type) {
    case 'pGroup': {
      return transformCoraPresentationGroupToBFFPresentationGroup(coraRecordWrapper);
    }
    case 'pNumVar': {
      return transformBasicCoraPresentationVariableToBFFPresentation(coraRecordWrapper);
    }
    case 'pVar': {
      return transformCoraPresentationPVarToBFFPresentation(coraRecordWrapper);
    }
    case 'pCollVar': {
      // basic presentation should be enough for collection variable
      return transformBasicCoraPresentationVariableToBFFPresentation(coraRecordWrapper);
    }
    case 'pRecordLink': {
      // basic presentation should be enough for pRecordLink until we deal with linkedPresentations and search
      return transformBasicCoraPresentationVariableToBFFPresentation(coraRecordWrapper);
    }
    case 'container': {
      const drg = coraRecordWrapper.record.data;
      const repeat = extractAttributeValueByName(drg, 'repeat');
      if (repeat === "this") return;
      return transformCoraPresentationContainerToBFFContainer(coraRecordWrapper);
    }
    // TODO add more types here like pResourceLink
    default: {
      return;
    }
  }
};

// Handle pNumVar
const transformBasicCoraPresentationVariableToBFFPresentation = (
  coraRecordWrapper: RecordWrapper
): BFFPresentation => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const presentationOf = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationOf'
  );

  const mode = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'mode');

  let emptyTextId;
  if (containsChildWithNameInData(dataRecordGroup, 'emptyTextId')) {
    emptyTextId = extractLinkedRecordIdFromNamedRecordLink(dataRecordGroup, 'emptyTextId');
  }

  let specifiedLabelTextId;
  if (containsChildWithNameInData(dataRecordGroup, 'specifiedLabelText')) {
    specifiedLabelTextId = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'specifiedLabelText'
    );
  }

  let showLabel;
  if (containsChildWithNameInData(dataRecordGroup, 'showLabel')) {
    showLabel = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'showLabel');
  }

  return removeEmpty({
    id,
    presentationOf,
    mode,
    emptyTextId,
    type,
    specifiedLabelTextId,
    showLabel
  } as BFFPresentation);
};

// Handle pVar
const transformCoraPresentationPVarToBFFPresentation = (
  coraRecordWrapper: RecordWrapper
): BFFPresentation => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const basic = transformBasicCoraPresentationVariableToBFFPresentation(coraRecordWrapper);
  const inputType = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'inputType');

  return removeEmpty({ ...basic, inputType } as BFFPresentation);
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
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const childReferencesList = getChildReferencesListFromGroup(dataRecordGroup);
  const children = childReferencesList.map((childReference) => {
    return transformChildReference(childReference);
  });

  return {
    id,
    presentationOf,
    mode,
    children,
    type
  } as BFFPresentationGroup;
};

// Group Child references
const transformChildReference = (childReference: DataGroup) => {
  const refGroup = getFirstDataGroupWithNameInDataAndAttributes(childReference, 'refGroup');
  const ref = getFirstChildWithNameInData(refGroup, 'ref');
  const childId = extractLinkedRecordIdFromNamedRecordLink(refGroup, 'ref');
  const type = extractAttributeValueByName(ref as DataGroup, 'type');

  const minNumberOfRepeatingToShow = extractAtomicValueByName(
    childReference,
    'minNumberOfRepeatingToShow'
  );
  const textStyle = extractAtomicValueByName(childReference, 'textStyle');
  const presentationSize = extractAtomicValueByName(childReference, 'presentationSize');

  const childStyleAtomics = getAllDataAtomicsWithNameInData(childReference, 'childStyle');
  const childStyle = childStyleAtomics.map((childStyle) => childStyle.value);

  return removeEmpty({
    childId,
    type,
    minNumberOfRepeatingToShow,
    textStyle,
    presentationSize,
    childStyle
  });
};

const transformCoraPresentationContainerToBFFContainer = (
  coraRecordWrapper: RecordWrapper
): BFFPresentationContainer => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const type = extractAttributeValueByName(dataRecordGroup, 'type');

  const presentationRecordLinks = getPresentationOfFromRecordLinks(dataRecordGroup);
  const presentationsOf = presentationRecordLinks.map(
    (presentationRecordLink) => presentationRecordLink.id
  );

  const mode = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'mode');

  let presentationStyle;
  if (containsChildWithNameInData(dataRecordGroup, 'presentationStyle')) {
    presentationStyle = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'presentationStyle');
  }

  const repeat = extractAttributeValueByName(dataRecordGroup, 'repeat');
  const childReferencesList = getChildReferencesListFromGroup(dataRecordGroup);
  const children = childReferencesList.map((childReference) =>
    transformChildReference(childReference)
  );

  return removeEmpty({
    id,
    presentationsOf,
    mode,
    children,
    type,
    repeat,
    presentationStyle
  }) as BFFPresentationContainer;
};

const extractAtomicValueByName = (childReference: DataGroup, nameInData: string) => {
  let atomicValue;
  if (containsChildWithNameInData(childReference, nameInData)) {
    atomicValue = getFirstDataAtomicValueWithNameInData(childReference, nameInData);
  }
  return atomicValue;
};

const getPresentationOfFromRecordLinks = (dataRecordGroup: DataGroup) => {
  const presentationsOfArray = getFirstDataGroupWithNameInDataAndAttributes(
    dataRecordGroup,
    'presentationsOf'
  );

  return getAllRecordLinksWithNameInData(presentationsOfArray, 'presentationOf');
}
