import {
  BFFGuiElement,
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationChildReference,
  BFFPresentationSurroundingContainer,
  BFFPresentationGroup,
  BFFValidationType,
  BFFPresentationContainer,
  BFFMetadataRecordLink,
  BFFAttributeReference,
  BFFRecordType
} from 'config/bffTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { Dependencies } from './formDefinitionsDep';

export const convertStylesToGridColSpan = (styles: string[]): number => {
  const DEFAULT_COLSPAN = 12;
  const convertedColSpans = styles.length
    ? styles.map((style) => {
        switch (style) {
          case 'oneChildStyle':
            return 1;
          case 'twoChildStyle':
            return 2;
          case 'threeChildStyle':
            return 3;
          case 'fourChildStyle':
            return 4;
          case 'fiveChildStyle':
            return 5;
          case 'sixChildStyle':
            return 6;
          case 'sevenChildStyle':
            return 7;
          case 'eightChildStyle':
            return 8;
          case 'nineChildStyle':
            return 9;
          case 'tenChildStyle':
            return 10;
          case 'elevenChildStyle':
            return 11;
          case 'twelveChildStyle':
            return DEFAULT_COLSPAN;
          default:
            return null;
        }
      })
    : [DEFAULT_COLSPAN];

  const cleaned = removeEmpty(convertedColSpans)[0];
  return cleaned ?? DEFAULT_COLSPAN;
};

export const createFormMetaData = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: 'update' | 'create'
): FormMetaData => {
  const validationPool = dependencies.validationTypePool;
  const { metadataPool } = dependencies;
  const validationType: BFFValidationType = validationPool.get(validationTypeId);

  let metadataGroup: BFFMetadataGroup;
  if (mode === 'create') {
    metadataGroup = metadataPool.get(validationType.newMetadataGroupId) as BFFMetadataGroup;
  } else {
    metadataGroup = metadataPool.get(validationType.metadataGroupId) as BFFMetadataGroup;
  }

  const formRootReference: BFFMetadataChildReference = {
    childId: metadataGroup.id,
    repeatMax: '1',
    repeatMin: '1'
  };

  return createMetaDataFromChildReference(formRootReference, metadataPool);
};

const createMetaDataFromChildReference = (
  metadataChildReference: BFFMetadataChildReference,
  metadataPool: any
): FormMetaData => {
  const metadata = metadataPool.get(metadataChildReference.childId) as BFFMetadata;
  const repeatMin = parseInt(metadataChildReference.repeatMin, 10);
  const repeatMax = determineRepeatMax(metadataChildReference.repeatMax);
  let children;
  let linkedRecordType;

  if (metadata.type === 'group') {
    const metadataGroup = metadata as BFFMetadataGroup;
    children = metadataGroup.children.map((childRef) =>
      createMetaDataFromChildReference(childRef, metadataPool)
    );
  }

  if (metadata.type === 'recordLink') {
    const metadataRecordLink = metadata as BFFMetadataRecordLink;
    linkedRecordType = metadataRecordLink.linkedRecordType;
  }

  return removeEmpty({
    name: metadata.nameInData,
    type: metadata.type,
    repeat: {
      repeatMin,
      repeatMax
    },
    children,
    linkedRecordType
  } as FormMetaData);
};

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

export const createFormMetaDataPathLookup = (
  obj: FormMetaData,
  path: string = '',
  lookup: Record<string, FormMetaData> = {}
) => {
  path = path ? `${path}.${obj.name}` : obj.name;

  obj.children?.forEach((metaData) => {
    createFormMetaDataPathLookup(metaData, path, lookup);
  });
  lookup[path] = removeEmpty({ ...obj, children: undefined });
  return lookup;
};

export const createFormDefinition = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: 'create' | 'update'
) => {
  const { validationTypePool, metadataPool, presentationPool } = dependencies;
  const validationType: BFFValidationType = validationTypePool.get(validationTypeId);
  // getRecordTypeFromValidationType('nationalSubjectCategory', recordTypePool, validationTypePool);
  // we need to check the mode parameter
  let metadataGroup;
  let presentationGroup;
  if (mode === 'create') {
    metadataGroup = metadataPool.get(validationType.newMetadataGroupId) as BFFMetadataGroup;
    presentationGroup = presentationPool.get(
      validationType.newPresentationGroupId
    ) as BFFPresentationGroup;
  } else {
    metadataGroup = metadataPool.get(validationType.metadataGroupId) as BFFMetadataGroup;
    presentationGroup = presentationPool.get(
      validationType.presentationGroupId
    ) as BFFPresentationGroup;
  }

  // construct the metadata childReference
  const formRootReference: BFFMetadataChildReference = {
    childId: metadataGroup.id,
    repeatMax: '1',
    repeatMin: '1'
  };

  const formRootPresentationReference: BFFPresentationChildReference = {
    childId: presentationGroup.id,
    type: 'presentation',
    childStyle: []
  };

  const form = createPresentationWithStuff(
    [formRootReference],
    formRootPresentationReference,
    metadataPool,
    presentationPool
  );

  return {
    validationTypeId: validationType.id,
    form
  };
};

export const getRecordTypeFromValidationType = (
  id: string,
  recordTypePool?: any,
  validationTypePool?: any
) => {
  const { validatesRecordTypeId } = validationTypePool.get(id);

  return recordTypePool.get(validatesRecordTypeId);
};

const createComponentsFromChildReferences = (
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
  metadataPool: any,
  presentationPool: any
): unknown => {
  return presentationChildReferences.map((presentationChildReference) => {
    const presentationChildType = presentationChildReference.type;

    if (presentationChildType === 'text') {
      return createText(presentationChildReference, presentationChildType);
    }

    if (presentationChildType === 'guiElement') {
      return createGuiElement(presentationChildReference, presentationPool);
    }

    return createPresentation(
      metadataChildReferences,
      presentationChildReference,
      metadataPool,
      presentationPool
    );
  });
};

const createPresentation = (
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  metadataPool: any,
  presentationPool: any
) => {
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
    metadataChildReferences,
    presentationChildReference,
    metadataPool,
    presentationPool,
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
    | BFFMetadataGroup,
  metadataPool: any,
  options: unknown[] | undefined
) => {
  return metadataVariable.attributeReferences?.map((attributeReference) => {
    const refCollectionVar = metadataPool.get(
      attributeReference.refCollectionVarId
    ) as BFFMetadataCollectionVariable;

    const fakePresentation: BFFPresentation = {
      id: 'someFakeId',
      presentationOf: refCollectionVar.id,
      type: 'pCollVar',
      mode: 'input',
      emptyTextId: 'initialEmptyValueText'
    };

    const { finalValue } = refCollectionVar;
    const commonParameters = createCommonParameters(refCollectionVar, fakePresentation);
    options = createCollectionVariableOptions(metadataPool, refCollectionVar);
    return removeEmpty({ ...commonParameters, options, finalValue });
  });
};

const createPresentationWithStuff = (
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  metadataPool: any,
  presentationPool: any,
  metadataOverrideId?: string
) => {
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
      attributes = createAttributes(textVariable, metadataPool, undefined);
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
      attributes = createAttributes(numberVariable, metadataPool, undefined);
    }
  }

  if (presentation.type === 'pCollVar') {
    const collectionVariable = metadata as BFFMetadataCollectionVariable;
    finalValue = collectionVariable.finalValue;
    options = createCollectionVariableOptions(metadataPool, collectionVariable);

    if (collectionVariable.attributeReferences !== undefined) {
      attributes = createAttributes(collectionVariable, metadataPool, options);
    }
  }

  if (presentation.type === 'pRecordLink') {
    // todo more stuff around the record link presentation
    // what about linkedRecordType
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
      filteredChildRefs,
      presentationContainer.children,
      metadataPool,
      presentationPool
    );
  }

  if (presentation.type === 'pGroup') {
    const group = metadata as BFFMetadataGroup;
    const presentationGroup: BFFPresentationGroup = presentationPool.get(presentation.id);
    presentationStyle = presentationGroup.presentationStyle;

    if (group.attributeReferences !== undefined) {
      attributes = createAttributes(group, metadataPool, undefined);
    }

    // skip children for recordInfo group for now
    if (group.nameInData !== 'recordInfo') {
      components = createComponentsFromChildReferences(
        group.children,
        presentationGroup.children,
        metadataPool,
        presentationPool
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
    gridColSpan
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

const determineRepeatMax = (value: string) => {
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
      label = '';
    }
  }

  if (presentation.showLabel && presentation.showLabel === 'false') {
    label = '';
  }
  return removeEmpty({ name, type, placeholder, mode, inputType, tooltip, label, headlineLevel });
};
