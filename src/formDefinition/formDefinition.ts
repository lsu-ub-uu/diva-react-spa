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
  BFFPresentationContainer
} from 'config/bffTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { Dependencies } from './formDefinitionsDep';

export const createFormMetaData = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: string
): FormMetaData => {
  const validationPool = dependencies.validationTypePool;
  const metadataPool = dependencies.metadataPool;
  const validationType: BFFValidationType = validationPool.get(validationTypeId);

  // TODO we need to check the mode parameter
  const newMetadataGroup = metadataPool.get(validationType.newMetadataGroupId) as BFFMetadataGroup;

  const formRootReference: BFFMetadataChildReference = {
    childId: newMetadataGroup.id,
    repeatMax: '1',
    repeatMin: '1'
  };

  return createMetaDataFromChildReference(formRootReference, metadataPool)
}

const createMetaDataFromChildReference = (
  metadataChildReference: BFFMetadataChildReference,
  metadataPool: any,
): FormMetaData => {
  const metadata = metadataPool.get(metadataChildReference.childId) as BFFMetadata;
  const repeatMin = parseInt(metadataChildReference.repeatMin);
  const repeatMax = determineRepeatMax(metadataChildReference.repeatMax);
  let children;

  if (metadata.type === 'group') {
    const metadataGroup = metadata as BFFMetadataGroup;
    children = metadataGroup.children.map((childRef) => createMetaDataFromChildReference(childRef, metadataPool))
  }

  return removeEmpty({
    name: metadata.nameInData,
    type: metadata.type,
    repeat: {
      repeatMin,
      repeatMax,
    },
    children
  } as FormMetaData);
}

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
}

export const createFormMetaDataPathLookup = (obj: FormMetaData, path: string = '', lookup: Record<string, FormMetaData> = {}) => {
  path = path ? `${path}.${obj.name}` : obj.name;

  obj.children?.forEach((metaData) => {
    createFormMetaDataPathLookup(metaData, path, lookup);
  });
  lookup[path] = removeEmpty({...obj, children: undefined });
  return lookup;
}

export const createFormDefinition = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: string
) => {
  const validationPool = dependencies.validationTypePool;
  const metadataPool = dependencies.metadataPool;
  const presentationPool = dependencies.presentationPool;
  const validationType: BFFValidationType = validationPool.get(validationTypeId);

  // we need to check the mode parameter
  const newMetadataGroup = metadataPool.get(validationType.newMetadataGroupId) as BFFMetadataGroup;
  const newPresentationGroup = presentationPool.get(
    validationType.newPresentationGroupId
  ) as BFFPresentationGroup;

  // construct the metadata childReference
  const formRootReference: BFFMetadataChildReference = {
    childId: newMetadataGroup.id,
    repeatMax: '1',
    repeatMin: '1'
  };

  const formRootPresentationReference: BFFPresentationChildReference = {
    childId: newPresentationGroup.id,
    type: 'presentation'
  };

  const form = createPresentation(
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

const createText = (
  presentationChildReference: BFFPresentationChildReference,
  presentationChildType: string
) => {
  const presentationChildId = presentationChildReference.childId;
  return {
    name: presentationChildId,
    type: presentationChildType,
    textStyle: presentationChildReference.textStyle
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
    presentAs: presentation.presentAs
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

function createAttributes(
  metadataVariable:
    | BFFMetadataCollectionVariable
    | BFFMetadataNumberVariable
    | BFFMetadataTextVariable
    | BFFMetadataGroup,
  metadataPool: any,
  options: unknown[] | undefined
) {
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

    const finalValue = refCollectionVar.finalValue;
    const commonParameters = createCommonParameters(refCollectionVar, fakePresentation);
    options = createCollectionVariableOptions(metadataPool, refCollectionVar);
    return removeEmpty({ ...commonParameters, options, finalValue });
  });
}

const createPresentation = (
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  metadataPool: any,
  presentationPool: any
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
  let childStyle;

  childStyle = presentationChildReference.childStyle;
  const presentationChildId = presentationChildReference.childId;
  const presentation: BFFPresentation = presentationPool.get(presentationChildId);

  // containers does not have presentationOf, it has presentationsOf
  if (presentation.type !== 'container') {
    metadataId = presentation.presentationOf;
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
    const min = parseInt(numberVariable.min);
    const max = parseInt(numberVariable.max);
    const warningMin = parseInt(numberVariable.warningMin);
    const warningMax = parseInt(numberVariable.warningMax);
    const numberOfDecimals = parseInt(numberVariable.numberOfDecimals);
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
    //@ts-ignore
    const presentationContainer = presentation as BFFPresentationContainer;
    const name = presentation.id; // container does not have a nameInData so use id instead.
    const type = presentation.type;
    const mode = presentation.mode;
    containerType = presentationContainer.repeat === 'children' ? 'surrounding' : 'repeating';
    presentationStyle = presentationContainer.presentationStyle;

    let filteredChildRefs: BFFMetadataChildReference[] = [];
    if (presentationContainer.repeat === 'children') {
      const metadataIds =
        (presentationContainer as BFFPresentationSurroundingContainer).presentationsOf ?? [];
      filteredChildRefs = metadataChildReferences.filter((childRef) => {
        return metadataIds.includes(childRef.childId);
      });
    } else if (presentationContainer.repeat === 'this') {
      const metadataId = presentationContainer.presentationOf;
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

    let label;
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
    childStyle
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

  const repeatMin = parseInt(metaDataChildRef.repeatMin);
  const repeatMax = determineRepeatMax(metaDataChildRef.repeatMax);

  return { minNumberOfRepeatingToShow, repeatMin, repeatMax };
};

const determineRepeatMax = (value: string) => {
  const infiniteNumberOfRepeat = 'X';
  if (value === infiniteNumberOfRepeat) {
    return Number.MAX_VALUE;
  }
  return parseInt(value);
};

const getMinNumberOfRepeatingToShow = (
  presentationChildReference: BFFPresentationChildReference
) => {
  let minNumberOfRepeatingToShow;
  if (presentationChildReference.minNumberOfRepeatingToShow !== undefined) {
    minNumberOfRepeatingToShow = parseInt(presentationChildReference.minNumberOfRepeatingToShow);
  }
  return minNumberOfRepeatingToShow;
};

const createCommonParameters = (
  metadata: BFFMetadata,
  presentation: BFFPresentation | BFFPresentationGroup
) => {
  const name = metadata.nameInData;
  const type = metadata.type;
  const placeholder = presentation.emptyTextId;
  const mode = presentation.mode;
  const inputType = presentation.inputType;
  const tooltip = { title: metadata.textId, body: metadata.defTextId };
  let label = metadata.textId;
  let headlineLevel;
  if (presentation.specifiedLabelTextId) {
    label = presentation.specifiedLabelTextId;
  }
  if (presentation.hasOwnProperty('specifiedHeadlineTextId')) {
    const presentationGroup = presentation as BFFPresentationGroup;
    if (presentationGroup.specifiedHeadlineTextId !== undefined) {
      label = presentationGroup.specifiedHeadlineTextId;
    }
  }
  if (presentation.hasOwnProperty('specifiedHeadlineLevel')) {
    const presentationGroup = presentation as BFFPresentationGroup;
    if (presentationGroup.specifiedHeadlineLevel !== undefined) {
      headlineLevel = presentationGroup.specifiedHeadlineLevel;
    }
  }
  if (presentation.hasOwnProperty('showHeadline')) {
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
