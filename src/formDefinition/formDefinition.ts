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

import * as TYPES from 'config/bffTypes';
import {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataGroup,
  BFFPresentationChildReference,
  BFFPresentationGroup
} from 'config/bffTypes';
import * as console from 'console';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { Dependencies } from './formDefinitionsDep';
import {
  convertStylesToShortName,
  convertChildStylesToGridColSpan,
  convertChildStylesToShortName
} from '../utils/cora-data/CoraDataUtilsPresentations';
import { createBFFMetadataReference } from './formMetadata';
import { createBFFPresentationReference } from './formPresentation';
import { Lookup } from '../utils/structs/lookup';
import { createNumberVariableValidation, createTextVariableValidation } from './formValidation';
import { getGroupsFromPresentationLinkId } from '../controllers/recordController';

interface FormMetaDataRepeat {
  repeatMin: number;
  repeatMax: number;
}

export interface FormMetaData {
  type:
    | 'group'
    | 'numberVariable'
    | 'resourceLink'
    | 'recordLink'
    | 'textVariable'
    | 'collectionVariable';
  name: string;
  repeat: FormMetaDataRepeat;
  children?: FormMetaData[];
  linkedRecordType?: string;
}

/**
 * Creates a Linked Record definition
 * @param dependencies
 * @param metadataGroup
 * @param presentationGroup
 */
export const createLinkedRecordDefinition = (
  dependencies: Dependencies,
  metadataGroup: BFFMetadataGroup,
  presentationGroup: BFFPresentationGroup
) => {
  // const { metadataPool, presentationPool } = dependencies;

  const form = createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    metadataGroup,
    presentationGroup
  );

  return {
    form
  };
};

/**
 * Creates a complete form definition
 * @param dependencies
 * @param validationTypeId
 * @param mode
 */
export const createFormDefinition = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: 'create' | 'update' | 'view' | 'list'
) => {
  switch (mode) {
    case 'create':
      return {
        validationTypeId,
        form: createFormDefinitionForCreate(dependencies, validationTypeId)
      };

    case 'update':
      return {
        validationTypeId,
        form: createFormDefinitionForUpdate(dependencies, validationTypeId)
      };
    case 'list':
      return {
        validationTypeId,
        form: createFormDefinitionForList(dependencies, validationTypeId)
      };

    default:
      return {
        validationTypeId,
        form: createFormDefinitionForView(dependencies, validationTypeId)
      };
  }
};

const createFormDefinitionForCreate = (dependencies: Dependencies, validationTypeId: string) => {
  const metadataKey = 'newMetadataGroupId';
  const presentationKey = 'newPresentationGroupId';

  return createFormDefinitionFromValidationTypeUsingKeys(
    dependencies,
    validationTypeId,
    metadataKey,
    presentationKey
  );
};

const createFormDefinitionFromValidationTypeUsingKeys = (
  dependencies: Dependencies,
  validationTypeId: string,
  metadataKey: keyof TYPES.BFFValidationType,
  presentationKey: keyof TYPES.BFFValidationType
) => {
  const { validationTypePool, metadataPool, presentationPool } = dependencies;
  const validationType = validationTypePool.get(validationTypeId);

  const metadataId = validationType[metadataKey];
  const metadataGroup = metadataPool.get(metadataId) as TYPES.BFFMetadataGroup;

  const presentationId = validationType[presentationKey];
  const presentationGroup = presentationPool.get(presentationId) as TYPES.BFFPresentationGroup;

  return createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    metadataGroup,
    presentationGroup
  );
};

const createFormDefinitionForUpdate = (dependencies: Dependencies, validationTypeId: string) => {
  const metadataKey = 'metadataGroupId';
  const presentationKey = 'presentationGroupId';

  return createFormDefinitionFromValidationTypeUsingKeys(
    dependencies,
    validationTypeId,
    metadataKey,
    presentationKey
  );
};

const createFormDefinitionForList = (dependencies: Dependencies, validationTypeId: string) => {
  const presentationKey = 'listPresentationViewId';

  return createFormDefinitionFromRecordTypeUsingKey(
    dependencies,
    validationTypeId,
    presentationKey
  );
};

const createFormDefinitionFromRecordTypeUsingKey = (
  dependencies: Dependencies,
  validationTypeId: string,
  presentationKey: keyof TYPES.BFFRecordType
) => {
  const { validationTypePool, metadataPool, presentationPool, recordTypePool } = dependencies;
  const validationType = validationTypePool.get(validationTypeId);

  const recordType = recordTypePool.get(validationType.validatesRecordTypeId);
  const metadataGroup = metadataPool.get(recordType.metadataId) as TYPES.BFFMetadataGroup;
  const presentationId = recordType[presentationKey] as string;
  const presentationGroup = presentationPool.get(presentationId) as TYPES.BFFPresentationGroup;
  return createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    metadataGroup,
    presentationGroup
  );
};

const createFormDefinitionForView = (dependencies: Dependencies, validationTypeId: string) => {
  const presentationKey = 'presentationViewId';

  return createFormDefinitionFromRecordTypeUsingKey(
    dependencies,
    validationTypeId,
    presentationKey
  );
};

const createDefinitionFromMetadataGroupAndPresentationGroup = (
  dependencies: Dependencies,
  metadataGroup: TYPES.BFFMetadataGroup,
  presentationGroup: TYPES.BFFPresentationGroup
) => {
  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  const formRootPresentationReference = createBFFPresentationReference(presentationGroup.id);
  return createDetailedPresentationBasedOnPresentationType(
    dependencies,
    [formRootReference],
    formRootPresentationReference
  );
};

const createComponentsFromChildReferences = (
  dependencies: Dependencies,
  metadataChildReferences: TYPES.BFFMetadataChildReference[],
  presentationChildReferences: TYPES.BFFPresentationChildReference[]
): unknown => {
  return presentationChildReferences.map((presentationChildReference) => {
    return createComponentFromChildReference(
      dependencies,
      metadataChildReferences,
      presentationChildReference
    );
  });
};

const createComponentFromChildReference = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference
) => {
  const presentationChildType = presentationChildReference.type;

  if (presentationChildType === 'text') {
    return createText(presentationChildReference, presentationChildType);
  }

  if (presentationChildType === 'guiElement') {
    return createGuiElement(presentationChildReference, dependencies.presentationPool);
  }

  return createFormPartsForGroupOrVariable(
    dependencies,
    metadataChildReferences,
    presentationChildReference
  );
};
const createFormPartsForGroupOrVariable = (
  dependencies: Dependencies,
  metadataChildReferences: TYPES.BFFMetadataChildReference[],
  presentationChildReference: TYPES.BFFPresentationChildReference
) => {
  const { metadataPool, presentationPool } = dependencies;
  let metadataOverrideId;
  const presentationChildId = presentationChildReference.childId;
  const presentation: TYPES.BFFPresentation = presentationPool.get(presentationChildId);
  if (
    presentation.type !== 'container' &&
    noIdMatchForChildRefAndPresentationOf(metadataChildReferences, presentation)
  ) {
    const metadataFromCurrentPresentation = metadataPool.get(presentation.presentationOf);
    const foundMetadataChildReference = findMetadataChildReferenceByNameInDataAndAttributes(
      metadataPool,
      metadataChildReferences,
      metadataFromCurrentPresentation
    );

    if (!foundMetadataChildReference) {
      return undefined;
    }
    const foundMetadata = metadataPool.get(foundMetadataChildReference.childId);
    metadataOverrideId = foundMetadata.id;
  }
  return createDetailedPresentationBasedOnPresentationType(
    dependencies,
    metadataChildReferences,
    presentationChildReference,
    metadataOverrideId
  );
};

const noIdMatchForChildRefAndPresentationOf = (
  metadataChildReferences: TYPES.BFFMetadataChildReference[],
  presentation: TYPES.BFFPresentation
) => {
  return !metadataChildReferences.some((mcr) => mcr.childId === presentation.presentationOf);
};

export const findMetadataChildReferenceByNameInDataAndAttributes = (
  metadataPool: any,
  metadataChildReferences: TYPES.BFFMetadataChildReference[],
  metadataFromCurrentPresentation: any
): TYPES.BFFMetadataChildReference | undefined => {
  return metadataChildReferences.find((metadataChildReferenceCandidate) => {
    const metadataCandidate = metadataPool.get(metadataChildReferenceCandidate.childId);

    if (differentNameInData(metadataCandidate, metadataFromCurrentPresentation)) {
      return false;
    }

    if (differentNumberOfAttributes(metadataCandidate, metadataFromCurrentPresentation)) {
      return false;
    }

    if (noAttributesToCompare(metadataCandidate)) {
      return true;
    }

    return attributesMatch(metadataPool, metadataCandidate, metadataFromCurrentPresentation);
  });
};

const differentNameInData = (
  metadataCandidate:
    | TYPES.BFFMetadataCollectionVariable
    | TYPES.BFFMetadataNumberVariable
    | TYPES.BFFMetadataTextVariable
    | TYPES.BFFMetadataRecordLink
    | TYPES.BFFMetadataGroup,
  metadataFromCurrentPresentation:
    | TYPES.BFFMetadataCollectionVariable
    | TYPES.BFFMetadataNumberVariable
    | TYPES.BFFMetadataTextVariable
    | TYPES.BFFMetadataRecordLink
    | TYPES.BFFMetadataGroup
) => {
  return metadataCandidate.nameInData !== metadataFromCurrentPresentation.nameInData;
};

const differentNumberOfAttributes = (
  metadataCandidate:
    | TYPES.BFFMetadataCollectionVariable
    | TYPES.BFFMetadataNumberVariable
    | TYPES.BFFMetadataTextVariable
    | TYPES.BFFMetadataRecordLink
    | TYPES.BFFMetadataGroup,
  metadataFromCurrentPresentation:
    | TYPES.BFFMetadataCollectionVariable
    | TYPES.BFFMetadataNumberVariable
    | TYPES.BFFMetadataTextVariable
    | TYPES.BFFMetadataRecordLink
    | TYPES.BFFMetadataGroup
) => {
  return (
    metadataCandidate.attributeReferences?.length !==
    metadataFromCurrentPresentation.attributeReferences?.length
  );
};

const noAttributesToCompare = (
  metadataCandidate:
    | TYPES.BFFMetadataCollectionVariable
    | TYPES.BFFMetadataNumberVariable
    | TYPES.BFFMetadataTextVariable
    | TYPES.BFFMetadataRecordLink
    | TYPES.BFFMetadataGroup
) => {
  return (
    metadataCandidate.attributeReferences?.length === undefined ||
    metadataCandidate.attributeReferences?.length === 0
  );
};

const attributesMatch = (
  metadataPool: any,
  metadataCandidate: any,
  metadataFromCurrentPresentation: any
) => {
  const currentPresentationAttributes = getAttributesByAttributeReferences(
    metadataPool,
    metadataFromCurrentPresentation.attributeReferences
  );
  const candidateAttributes = getAttributesByAttributeReferences(
    metadataPool,
    metadataCandidate.attributeReferences
  );
  return firstAttributesExistsInSecond(candidateAttributes, currentPresentationAttributes);
};

/**
 * Gets attributes by attribute references
 * @param metadataPool
 * @param attributeReferences
 */
export const getAttributesByAttributeReferences = (
  metadataPool: any,
  attributeReferences: TYPES.BFFAttributeReference[]
): Record<string, string[]> => {
  const attributesArray = attributeReferences.map((attributeReference) => {
    const attributeCollectionVar = metadataPool.get(
      attributeReference.refCollectionVarId
    ) as TYPES.BFFMetadataCollectionVariable;

    if (attributeCollectionVar.finalValue) {
      return { [attributeCollectionVar.nameInData]: [attributeCollectionVar.finalValue] };
    }

    const itemCollection = createCollectionVariableOptions(metadataPool, attributeCollectionVar);
    const itemCollectionValues = itemCollection.map((item) => item.value);
    return { [attributeCollectionVar.nameInData]: itemCollectionValues };
  });
  return Object.assign({}, ...attributesArray);
};

const createCollectionVariableOptions = (
  metadataPool: any,
  collectionVariable: TYPES.BFFMetadataCollectionVariable
) => {
  const collection = metadataPool.get(
    collectionVariable.refCollection
  ) as TYPES.BFFMetadataItemCollection;
  const itemReferences = collection.collectionItemReferences;
  return itemReferences.map((itemRef) => {
    const collectionItem = metadataPool.get(itemRef.refCollectionItemId) as TYPES.BFFMetadata;
    const label = collectionItem.textId;
    const value = collectionItem.nameInData;
    return { value, label };
  });
};

export const firstAttributesExistsInSecond = (
  inAttributes1: Record<string, string[]> | undefined,
  inAttributes2: Record<string, string[]> | undefined
) => {
  const attributes1 = inAttributes1 ?? {};
  const attributes2 = inAttributes2 ?? {};

  const attributeKeys1 = Object.keys(attributes1);
  const attributeKeys2 = Object.keys(attributes2);

  if (attributeKeys1.length !== attributeKeys2.length) {
    return false;
  }
  if (attributeKeys1.length === 0) {
    return true;
  }

  return existingFirstAttributesExistsInSecond(attributes1, attributes2);
};

const existingFirstAttributesExistsInSecond = (
  attributes1: Record<string, string[]>,
  attributes2: Record<string, string[]>
) => {
  const attributeKeys1 = Object.keys(attributes1);
  const checkAttributeExistsInAttributes2 = createCheckFunction(attributes1, attributes2);
  return attributeKeys1.every(checkAttributeExistsInAttributes2);
};

const createCheckFunction = (
  attributes1: Record<string, string[]>,
  attributes2: Record<string, string[]>
) => {
  return (attributeKey: string) => {
    const attributeValues1 = attributes1[attributeKey];
    const attributeValues2 = attributes2[attributeKey];
    if (attributeValues2 === undefined) {
      return false;
    }
    const functionAttribute2ContainsValue = createValueCheckFunction(attributeValues2);
    return attributeValues1.every(functionAttribute2ContainsValue);
  };
};

const createValueCheckFunction = (attributeValues2: string[]) => {
  return (attributeValue: string) => {
    return attributeValues2.indexOf(attributeValue) > -1;
  };
};

const createText = (
  presentationChildReference: TYPES.BFFPresentationChildReference,
  presentationChildType: string
) => {
  const presentationChildId = presentationChildReference.childId;
  return {
    name: presentationChildId,
    type: presentationChildType,
    textStyle: presentationChildReference.textStyle,
    childStyle: convertChildStylesToShortName(presentationChildReference.childStyle),
    gridColSpan: convertChildStylesToGridColSpan(presentationChildReference.childStyle ?? [])
  };
};

const createGuiElement = (
  presentationChildReference: TYPES.BFFPresentationChildReference,
  presentationPool: any
) => {
  const presentationChildId = presentationChildReference.childId;
  const presentation: TYPES.BFFGuiElement = presentationPool.get(presentationChildId);
  return {
    name: presentationChildId,
    type: presentation.type,
    url: presentation.url,
    elementText: presentation.elementText,
    presentAs: presentation.presentAs,
    childStyle: convertChildStylesToShortName(presentationChildReference.childStyle),
    gridColSpan: convertChildStylesToGridColSpan(presentationChildReference.childStyle ?? [])
  };
};

/**
 * Helper method to create a presentation for collection var.
 *
 * @remarks
 *
 * Used for creating a presentation for attributes since Cora
 * lacks support for this.
 *
 * @param id
 * @param presentationOf
 * @param mode
 */
const createPresentationForCollectionVar = (
  id: string,
  presentationOf: string,
  mode: 'input' | 'output'
): TYPES.BFFPresentation => ({
  id,
  presentationOf,
  type: 'pCollVar',
  mode,
  emptyTextId: 'initialEmptyValueText'
});

const createAttributes = (
  metadataVariable:
    | TYPES.BFFMetadataCollectionVariable
    | TYPES.BFFMetadataNumberVariable
    | TYPES.BFFMetadataTextVariable
    | TYPES.BFFMetadataRecordLink
    | TYPES.BFFMetadataGroup,
  metadataPool: any,
  options: unknown[] | undefined,
  variablePresentationMode: 'input' | 'output'
) => {
  return metadataVariable.attributeReferences?.map((attributeReference) => {
    const refCollectionVar = metadataPool.get(
      attributeReference.refCollectionVarId
    ) as TYPES.BFFMetadataCollectionVariable;

    const presentation = createPresentationForCollectionVar(
      'someFakeId',
      refCollectionVar.id,
      variablePresentationMode
    );
    const { finalValue } = refCollectionVar;
    const commonParameters = createCommonParameters(refCollectionVar, presentation);
    options = createCollectionVariableOptions(metadataPool, refCollectionVar);
    return removeEmpty({ ...commonParameters, options, finalValue });
  });
};

const getContainerType = (presentationContainer: TYPES.BFFPresentationContainer) => {
  return presentationContainer.repeat === 'children' ? 'surrounding' : 'repeating';
};

const createDetailedPresentationBasedOnPresentationType = (
  dependencies: Dependencies,
  metadataChildReferences: TYPES.BFFMetadataChildReference[],
  presentationChildReference: TYPES.BFFPresentationChildReference,
  metadataOverrideId?: string
) => {
  const { metadataPool, presentationPool } = dependencies;
  let validation;
  let options;
  let finalValue;
  let attributes;
  let components;
  let containerType;
  let presentationStyle;
  let metadataId;
  let metaDataChildRef;
  let repeat;
  let metadata;
  let commonParameters;
  let recordLinkType;
  let presentationRecordLinkId;
  let search;

  // const { childStyle } = presentationChildReference;
  const childStyle = convertChildStylesToShortName(presentationChildReference.childStyle);
  const gridColSpan = convertChildStylesToGridColSpan(presentationChildReference.childStyle ?? []);
  const presentationChildId = presentationChildReference.childId;
  const presentation: TYPES.BFFPresentation = presentationPool.get(presentationChildId);

  // containers does not have presentationOf, it has presentationsOf
  if (presentation.type !== 'container') {
    metadataId = metadataOverrideId ?? presentation.presentationOf;
    metaDataChildRef = findMetadataChildReferenceById(metadataId, metadataChildReferences);
    repeat = createRepeat(presentationChildReference, metaDataChildRef);
    metadata = metadataPool.get(metadataId) as TYPES.BFFMetadata;
    commonParameters = createCommonParameters(metadata, presentation);
  }

  if (presentation.type === 'pVar') {
    const textVariable = metadata as TYPES.BFFMetadataTextVariable;
    validation = createTextVariableValidation(textVariable);
    finalValue = textVariable.finalValue;
    attributes = checkForAttributes(textVariable, metadataPool, undefined, presentation);
  }

  if (presentation.type === 'pNumVar') {
    const numberVariable = metadata as TYPES.BFFMetadataNumberVariable;
    validation = createNumberVariableValidation(numberVariable);
    finalValue = numberVariable.finalValue;
    attributes = checkForAttributes(numberVariable, metadataPool, undefined, presentation);
  }

  if (presentation.type === 'pCollVar') {
    const collectionVariable = metadata as TYPES.BFFMetadataCollectionVariable;
    finalValue = collectionVariable.finalValue;
    options = createCollectionVariableOptions(metadataPool, collectionVariable);
    attributes = checkForAttributes(collectionVariable, metadataPool, options, presentation);
  }

  if (presentation.type === 'pRecordLink') {
    const recordLink = metadata as TYPES.BFFMetadataRecordLink;
    recordLinkType = recordLink.linkedRecordType;
    const presentationRecordLink = presentation as TYPES.BFFPresentationRecordLink;
    if (presentationRecordLink.search !== undefined) {
      search = presentationRecordLink.search;
    }
    // if (presentationRecordLink.linkedRecordPresentations !== undefined) {
    //   presentationRecordLinkId =
    //     presentationRecordLink.linkedRecordPresentations.map(
    //       (linkedPresentation) => linkedPresentation.presentationId
    //     ) ?? [];
    // }
    // console.log('pRecordLink', presentationRecordLink);
    presentationRecordLinkId = presentation.id;
    attributes = checkForAttributes(recordLink, metadataPool, options, presentation);
  }

  if (presentation.type === 'container') {
    const presentationContainer = presentation as TYPES.BFFPresentationContainer;
    const name = presentation.id; // container does not have a nameInData so use id instead.
    const { type, mode } = presentation;
    containerType = getContainerType(presentationContainer);
    presentationStyle = convertStylesToShortName(presentationContainer.presentationStyle ?? '');

    let definitionFilteredChildRefs: TYPES.BFFMetadataChildReference[] = [];

    if (containerType === 'surrounding') {
      const presentationMetadataIds =
        (presentationContainer as TYPES.BFFPresentationSurroundingContainer).presentationsOf ?? [];
      definitionFilteredChildRefs = metadataChildReferences.filter((definitionChildRef) => {
        if (checkIfPresentationIncludesMetadataId(presentationMetadataIds, definitionChildRef)) {
          return true;
        }

        return matchPresentationWithMetadata(
          metadataPool,
          presentationMetadataIds,
          definitionChildRef
        );
      });
    } else if (containerType === 'repeating') {
      metadataId = presentationContainer.presentationOf;
      metaDataChildRef = findMetadataChildReferenceById(metadataId, metadataChildReferences);
      definitionFilteredChildRefs = [metaDataChildRef];
    }

    commonParameters = { type, name, mode };
    components = createComponentsFromChildReferences(
      dependencies,
      definitionFilteredChildRefs,
      presentationContainer.children
    );
  }

  if (presentation.type === 'pGroup') {
    const group = metadata as TYPES.BFFMetadataGroup;
    const presentationGroup: TYPES.BFFPresentationGroup = presentationPool.get(presentation.id);
    presentationStyle = convertStylesToShortName(presentationGroup.presentationStyle ?? '');
    attributes = checkForAttributes(group, metadataPool, options, presentation);

    // skip children for recordInfo group for now
    if (group.nameInData !== 'recordInfo') {
      components = createComponentsFromChildReferences(
        dependencies,
        group.children,
        presentationGroup.children
      );
    }
  }

  return removeEmpty({
    ...commonParameters,
    validation,
    repeat,
    options,
    finalValue,
    attributes,
    components,
    presentationStyle,
    containerType,
    childStyle,
    gridColSpan,
    recordLinkType,
    presentationRecordLinkId,
    search
  });
};
const findMetadataChildReferenceById = (
  childId: string,
  metadataChildReferences: TYPES.BFFMetadataChildReference[]
) => {
  const metaDataChildRef = metadataChildReferences.find(
    (reference) => reference.childId === childId
  );
  if (metaDataChildRef === undefined) {
    throw new Error(`Child reference with childId [${childId}] does not exist`);
  }
  return metaDataChildRef;
};

const createRepeat = (
  presentationChildReference: TYPES.BFFPresentationChildReference,
  metaDataChildRef: TYPES.BFFMetadataChildReference
) => {
  const minNumberOfRepeatingToShow = getMinNumberOfRepeatingToShow(presentationChildReference);

  const repeatMin = parseInt(metaDataChildRef.repeatMin);
  const repeatMax = determineRepeatMax(metaDataChildRef.repeatMax);

  return { minNumberOfRepeatingToShow, repeatMin, repeatMax };
};

const createCommonParameters = (
  metadata: TYPES.BFFMetadata,
  presentation: TYPES.BFFPresentation | TYPES.BFFPresentationGroup
) => {
  const name = metadata.nameInData;
  const { type } = metadata;
  const placeholder = presentation.emptyTextId;
  const { mode, inputType } = presentation;
  const tooltip = { title: metadata.textId, body: metadata.defTextId };
  let label = presentation.specifiedLabelTextId
    ? presentation.specifiedLabelTextId
    : metadata.textId;
  let showLabel = true;
  let headlineLevel;

  const presentationGroup = presentation as TYPES.BFFPresentationGroup;

  if (
    checkIfSpecifiedHeadlineTextIdExist(presentationGroup) &&
    presentationGroup.specifiedHeadlineTextId !== undefined
  ) {
    label = presentationGroup.specifiedHeadlineTextId;
  }

  if (
    checkIfSpecifiedHeadlineLevelExist(presentationGroup) &&
    presentationGroup.specifiedHeadlineLevel !== undefined
  ) {
    headlineLevel = presentationGroup.specifiedHeadlineLevel;
  }

  if (checkIfShowHeadlineExist(presentationGroup) && presentationGroup.showHeadline === 'false') {
    showLabel = false;
  }

  if (presentation.showLabel && presentation.showLabel === 'false') {
    showLabel = false;
  }

  return removeEmpty({
    name,
    type,
    placeholder,
    mode,
    inputType,
    tooltip,
    label,
    headlineLevel,
    showLabel
  });
};

function matchPresentationWithMetadata(
  metadataPool: Lookup<string, TYPES.BFFMetadata>,
  presentationMetadataIds: string[],
  definitionChildRef: TYPES.BFFMetadataChildReference
) {
  const metadataFromCurrentPresentation = metadataPool.get(presentationMetadataIds[0]);

  return findMetadataChildReferenceByNameInDataAndAttributes(
    metadataPool,
    [definitionChildRef],
    metadataFromCurrentPresentation
  );
}

const checkIfPresentationIncludesMetadataId = (
  presentationMetadataIds: string[],
  definitionChildRef: TYPES.BFFMetadataChildReference
) => {
  return presentationMetadataIds.includes(definitionChildRef.childId);
};

const checkForAttributes = (
  metadataVariable:
    | TYPES.BFFMetadataCollectionVariable
    | TYPES.BFFMetadataNumberVariable
    | TYPES.BFFMetadataTextVariable
    | TYPES.BFFMetadataRecordLink
    | TYPES.BFFMetadataGroup,
  metadataPool: Lookup<string, TYPES.BFFMetadata>,
  options: any,
  presentation: TYPES.BFFPresentation
) => {
  let attributes;
  if (metadataVariable.attributeReferences !== undefined) {
    attributes = createAttributes(metadataVariable, metadataPool, options, presentation.mode);
  }
  return attributes;
};

export const determineRepeatMax = (value: string) => {
  const infiniteNumberOfRepeat = 'X';
  if (value === infiniteNumberOfRepeat) {
    return Number.MAX_VALUE;
  }
  return parseInt(value);
};

const getMinNumberOfRepeatingToShow = (
  presentationChildReference: TYPES.BFFPresentationChildReference
) => {
  let minNumberOfRepeatingToShow;
  if (presentationChildReference.minNumberOfRepeatingToShow !== undefined) {
    minNumberOfRepeatingToShow = parseInt(presentationChildReference.minNumberOfRepeatingToShow);
  }
  return minNumberOfRepeatingToShow;
};

const checkIfSpecifiedHeadlineTextIdExist = (presentation: TYPES.BFFPresentationGroup) => {
  return Object.prototype.hasOwnProperty.call(presentation, 'specifiedHeadlineTextId');
};

const checkIfSpecifiedHeadlineLevelExist = (presentation: TYPES.BFFPresentationGroup) => {
  return Object.prototype.hasOwnProperty.call(presentation, 'specifiedHeadlineLevel');
};

const checkIfShowHeadlineExist = (presentation: TYPES.BFFPresentationGroup) => {
  return Object.prototype.hasOwnProperty.call(presentation, 'showHeadline');
};
