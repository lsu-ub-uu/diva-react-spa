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
  BFFAttributeReference,
  BFFGuiElement,
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationChildReference,
  BFFPresentationContainer,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFValidationType
} from 'config/bffTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { Dependencies } from './formDefinitionsDep';
import { convertStylesToGridColSpan } from '../utils/cora-data/CoraDataUtilsPresentations';
import { createBFFMetadataReference } from './formMetadata';
import { createBFFPresentationReference } from './formPresentation';

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

export const createLinkedRecordDefinition = (
  dependencies: Dependencies,
  presentationLinkId: string
) => {
  const { metadataPool, presentationPool } = dependencies;

  const presentationLink = presentationPool.get(presentationLinkId) as BFFPresentationRecordLink;
  const { presentationId } = presentationLink.linkedRecordPresentations[0];
  const presentationGroup = presentationPool.get(presentationId);
  const metadataGroup = metadataPool.get(presentationGroup.presentationOf) as BFFMetadataGroup;

  const form = createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    metadataGroup,
    presentationGroup
  );

  return {
    form
  };
};

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
  metadataKey: keyof BFFValidationType,
  presentationKey: keyof BFFValidationType
) => {
  const { validationTypePool, metadataPool, presentationPool } = dependencies;
  const validationType = validationTypePool.get(validationTypeId);

  const metadataId = validationType[metadataKey];
  const metadataGroup = metadataPool.get(metadataId) as BFFMetadataGroup;

  const presentationId = validationType[presentationKey];
  const presentationGroup = presentationPool.get(presentationId) as BFFPresentationGroup;

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
  presentationKey: keyof BFFRecordType
) => {
  const { validationTypePool, metadataPool, presentationPool, recordTypePool } = dependencies;
  const validationType = validationTypePool.get(validationTypeId);

  const recordType = recordTypePool.get(validationType.validatesRecordTypeId);
  const metadataGroup = metadataPool.get(recordType.metadataId) as BFFMetadataGroup;
  const presentationId = recordType[presentationKey] as string;
  const presentationGroup = presentationPool.get(presentationId) as BFFPresentationGroup;
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
  metadataGroup: BFFMetadataGroup,
  presentationGroup: BFFPresentationGroup
) => {
  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  const formRootPresentationReference = createBFFPresentationReference(presentationGroup.id);
  return createPresentationWithStuff(
    dependencies,
    [formRootReference],
    formRootPresentationReference
  );
};

const createComponentsFromChildReferences = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[]
): unknown => {
  const { presentationPool } = dependencies;
  return presentationChildReferences.map((presentationChildReference) => {
    const presentationChildType = presentationChildReference.type;

    if (presentationChildType === 'text') {
      return createText(presentationChildReference, presentationChildType);
    }

    if (presentationChildType === 'guiElement') {
      return createGuiElement(presentationChildReference, presentationPool);
    }

    return createPresentation(dependencies, metadataChildReferences, presentationChildReference);
  });
};

const createPresentation = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference
) => {
  const { metadataPool, presentationPool } = dependencies;
  let metadataOverrideId;
  const presentationChildId = presentationChildReference.childId;
  const presentation: BFFPresentation = presentationPool.get(presentationChildId);
  if (presentation.type !== 'container') {
    if (!metadataChildReferences.some((mcr) => mcr.childId === presentation.presentationOf)) {
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
  }
  return createPresentationWithStuff(
    dependencies,
    metadataChildReferences,
    presentationChildReference,
    metadataOverrideId
  );
};

export const findMetadataChildReferenceByNameInDataAndAttributes = (
  metadataPool: any,
  metadataChildReferences: BFFMetadataChildReference[],
  metadataFromCurrentPresentation: any
): BFFMetadataChildReference | undefined => {
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

const differentNameInData = (metadataCandidate: any, metadataFromCurrentPresentation: any) => {
  return metadataCandidate.nameInData !== metadataFromCurrentPresentation.nameInData;
};

const differentNumberOfAttributes = (
  metadataCandidate: any,
  metadataFromCurrentPresentation: any
) => {
  return (
    metadataCandidate.attributeReferences?.length !==
    metadataFromCurrentPresentation.attributeReferences?.length
  );
};

const noAttributesToCompare = (metadataCandidate: any) => {
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
  const currentPresentationAttributes = getAttributesForAttributeReferences(
    metadataPool,
    metadataFromCurrentPresentation.attributeReferences
  );
  const candidateAttributes = getAttributesForAttributeReferences(
    metadataPool,
    metadataCandidate.attributeReferences
  );
  return firstAttributesExistsInSecond(candidateAttributes, currentPresentationAttributes);
};

export const getAttributesForAttributeReferences = (
  metadataPool: any,
  attributeReferences: BFFAttributeReference[]
): Record<string, string[]> => {
  const attributesArray = attributeReferences.map((attributeReference) => {
    const attributeCollectionVar = metadataPool.get(
      attributeReference.refCollectionVarId
    ) as BFFMetadataCollectionVariable;

    if (attributeCollectionVar.finalValue) {
      return { [attributeCollectionVar.nameInData]: [attributeCollectionVar.finalValue] };
    }

    const itemCollection = createCollectionVariableOptions(metadataPool, attributeCollectionVar);
    const itemCollectionValues = itemCollection.map((item) => item.value);
    return { [attributeCollectionVar.nameInData]: itemCollectionValues };
  });
  return Object.assign({}, ...attributesArray);
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
  presentationChildReference: BFFPresentationChildReference,
  presentationChildType: string
) => {
  const presentationChildId = presentationChildReference.childId;
  return {
    name: presentationChildId,
    type: presentationChildType,
    textStyle: presentationChildReference.textStyle,
    childStyle: presentationChildReference.childStyle,
    gridColSpan: convertStylesToGridColSpan(presentationChildReference.childStyle ?? [])
  };
};
const createGuiElement = (
  presentationChildReference: BFFPresentationChildReference,
  presentationPool: any
) => {
  const presentationChildId = presentationChildReference.childId;
  const presentation: BFFGuiElement = presentationPool.get(presentationChildId);
  return {
    name: presentationChildId,
    type: presentation.type,
    url: presentation.url,
    elementText: presentation.elementText,
    presentAs: presentation.presentAs,
    childStyle: presentationChildReference.childStyle,
    gridColSpan: convertStylesToGridColSpan(presentationChildReference.childStyle ?? [])
  };
};

const createCollectionVariableOptions = (
  metadataPool: any,
  collectionVariable: BFFMetadataCollectionVariable
) => {
  const collection = metadataPool.get(
    collectionVariable.refCollection
  ) as BFFMetadataItemCollection;
  const itemReferences = collection.collectionItemReferences;
  return itemReferences.map((itemRef) => {
    const collectionItem = metadataPool.get(itemRef.refCollectionItemId) as BFFMetadata;
    const label = collectionItem.textId;
    const value = collectionItem.nameInData;
    return { value, label }; // todo handle disabled?
  });
};

const createAttributes = (
  metadataVariable:
    | BFFMetadataCollectionVariable
    | BFFMetadataNumberVariable
    | BFFMetadataTextVariable
    | BFFMetadataRecordLink
    | BFFMetadataGroup,
  metadataPool: any,
  options: unknown[] | undefined,
  variablePresentationMode: 'input' | 'output'
) => {
  return metadataVariable.attributeReferences?.map((attributeReference) => {
    const refCollectionVar = metadataPool.get(
      attributeReference.refCollectionVarId
    ) as BFFMetadataCollectionVariable;

    const fakePresentation: BFFPresentation = {
      id: 'someFakeId',
      presentationOf: refCollectionVar.id,
      type: 'pCollVar',
      mode: variablePresentationMode,
      emptyTextId: 'initialEmptyValueText'
    };

    const { finalValue } = refCollectionVar;
    const commonParameters = createCommonParameters(refCollectionVar, fakePresentation);
    options = createCollectionVariableOptions(metadataPool, refCollectionVar);
    return removeEmpty({ ...commonParameters, options, finalValue });
  });
};

const createPresentationWithStuff = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
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
  // let childStyle;
  // let gridColSpan;

  const { childStyle } = presentationChildReference;
  const gridColSpan = convertStylesToGridColSpan(presentationChildReference.childStyle ?? []);
  const presentationChildId = presentationChildReference.childId;
  const presentation: BFFPresentation = presentationPool.get(presentationChildId);

  // containers does not have presentationOf, it has presentationsOf
  if (presentation.type !== 'container') {
    metadataId = metadataOverrideId ?? presentation.presentationOf;
    metaDataChildRef = findMetadataChildReferenceById(metadataId, metadataChildReferences);
    repeat = createRepeat(presentationChildReference, metaDataChildRef);
    metadata = metadataPool.get(metadataId) as BFFMetadata;
    commonParameters = createCommonParameters(metadata, presentation);
  }

  if (presentation.type === 'pVar') {
    const textVariable = metadata as BFFMetadataTextVariable;
    finalValue = textVariable.finalValue;
    const pattern = textVariable.regEx;
    validation = { type: 'regex', pattern };

    if (textVariable.attributeReferences !== undefined) {
      attributes = createAttributes(textVariable, metadataPool, undefined, presentation.mode);
    }
  }

  if (presentation.type === 'pNumVar') {
    const numberVariable = metadata as BFFMetadataNumberVariable;
    finalValue = numberVariable.finalValue;
    const min = parseInt(numberVariable.min, 10);
    const max = parseInt(numberVariable.max, 10);
    const warningMin = parseInt(numberVariable.warningMin, 10);
    const warningMax = parseInt(numberVariable.warningMax, 10);
    const numberOfDecimals = parseInt(numberVariable.numberOfDecimals, 10);
    validation = { type: 'number', min, max, warningMin, warningMax, numberOfDecimals };

    if (numberVariable.attributeReferences !== undefined) {
      attributes = createAttributes(numberVariable, metadataPool, undefined, presentation.mode);
    }
  }

  if (presentation.type === 'pCollVar') {
    const collectionVariable = metadata as BFFMetadataCollectionVariable;
    finalValue = collectionVariable.finalValue;
    options = createCollectionVariableOptions(metadataPool, collectionVariable);

    if (collectionVariable.attributeReferences !== undefined) {
      attributes = createAttributes(collectionVariable, metadataPool, options, presentation.mode);
    }
  }

  if (presentation.type === 'pRecordLink') {
    const recordLink = metadata as BFFMetadataRecordLink;
    // todo more stuff around the record link presentation
    // what about linkedRecordType
    // const presentationGroup: BFFPresentationGroup = presentationPool.get(presentation.);
    recordLinkType = recordLink.linkedRecordType;

    if (recordLink.attributeReferences !== undefined) {
      attributes = createAttributes(recordLink, metadataPool, options, presentation.mode);
    }
  }

  if (presentation.type === 'container') {
    // @ts-ignore
    const presentationContainer = presentation as BFFPresentationContainer;
    const name = presentation.id; // container does not have a nameInData so use id instead.
    const { type } = presentation;
    const { mode } = presentation;
    containerType = presentationContainer.repeat === 'children' ? 'surrounding' : 'repeating';
    presentationStyle = presentationContainer.presentationStyle;

    let filteredChildRefs: BFFMetadataChildReference[] = [];

    if (presentationContainer.repeat === 'children') {
      // surrounding Container
      const metadataIds =
        (presentationContainer as BFFPresentationSurroundingContainer).presentationsOf ?? [];

      // perform nameInData lookup
      filteredChildRefs = metadataChildReferences.filter((childRef) => {
        return metadataIds.includes(childRef.childId);
      });
    } else if (presentationContainer.repeat === 'this') {
      // repeating Container
      metadataId = presentationContainer.presentationOf;
      metaDataChildRef = findMetadataChildReferenceById(metadataId, metadataChildReferences);
      filteredChildRefs = [metaDataChildRef];
    }

    commonParameters = { type, name, mode };
    components = createComponentsFromChildReferences(
      dependencies,
      filteredChildRefs,
      presentationContainer.children
    );
  }

  if (presentation.type === 'pGroup') {
    const group = metadata as BFFMetadataGroup;
    const presentationGroup: BFFPresentationGroup = presentationPool.get(presentation.id);
    presentationStyle = presentationGroup.presentationStyle;

    if (group.attributeReferences !== undefined) {
      attributes = createAttributes(group, metadataPool, undefined, presentation.mode);
    }

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
    recordLinkType
  });
};

const findMetadataChildReferenceById = (
  childId: string,
  metadataChildReferences: BFFMetadataChildReference[]
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
  presentationChildReference: BFFPresentationChildReference,
  metaDataChildRef: BFFMetadataChildReference
) => {
  const minNumberOfRepeatingToShow = getMinNumberOfRepeatingToShow(presentationChildReference);

  const repeatMin = parseInt(metaDataChildRef.repeatMin, 10);
  const repeatMax = determineRepeatMax(metaDataChildRef.repeatMax);

  return { minNumberOfRepeatingToShow, repeatMin, repeatMax };
};

export const determineRepeatMax = (value: string) => {
  const infiniteNumberOfRepeat = 'X';
  if (value === infiniteNumberOfRepeat) {
    return Number.MAX_VALUE;
  }
  return parseInt(value, 10);
};

const getMinNumberOfRepeatingToShow = (
  presentationChildReference: BFFPresentationChildReference
) => {
  let minNumberOfRepeatingToShow;
  if (presentationChildReference.minNumberOfRepeatingToShow !== undefined) {
    minNumberOfRepeatingToShow = parseInt(
      presentationChildReference.minNumberOfRepeatingToShow,
      10
    );
  }
  return minNumberOfRepeatingToShow;
};

const createCommonParameters = (
  metadata: BFFMetadata,
  presentation: BFFPresentation | BFFPresentationGroup
) => {
  const name = metadata.nameInData;
  const { type } = metadata;
  const placeholder = presentation.emptyTextId;
  const { mode } = presentation;
  const { inputType } = presentation;
  const tooltip = { title: metadata.textId, body: metadata.defTextId };
  let label = metadata.textId;
  let showLabel = true;
  let headlineLevel;

  if (presentation.specifiedLabelTextId) {
    label = presentation.specifiedLabelTextId;
  }
  if (Object.prototype.hasOwnProperty.call(presentation, 'specifiedHeadlineTextId')) {
    const presentationGroup = presentation as BFFPresentationGroup;
    if (presentationGroup.specifiedHeadlineTextId !== undefined) {
      label = presentationGroup.specifiedHeadlineTextId;
    }
  }
  if (Object.prototype.hasOwnProperty.call(presentation, 'specifiedHeadlineLevel')) {
    const presentationGroup = presentation as BFFPresentationGroup;
    if (presentationGroup.specifiedHeadlineLevel !== undefined) {
      headlineLevel = presentationGroup.specifiedHeadlineLevel;
    }
  }
  if (Object.prototype.hasOwnProperty.call(presentation, 'showHeadline')) {
    const presentationGroup = presentation as BFFPresentationGroup;
    if (presentationGroup.showHeadline === 'false') {
      showLabel = false;
    }
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
