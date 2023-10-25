import {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFValidationType
} from 'config/bffTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { Dependencies } from './formDefinitionsDep';

export const createFormDefinition = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: string
) => {
  const validationPool = dependencies.validationTypePool;
  const metadataPool = dependencies.metadataPool;
  const presentationPool = dependencies.presentationPool;
  const validationType: BFFValidationType = validationPool.get(validationTypeId);

  // metadata
  const metadataChildReferences = getMetadataChildReferencesForValidationType(
    validationType,
    metadataPool
  );

  // presentation
  const presentationChildReferences = getPresentationChildReferencesForValidationType(
    validationType,
    presentationPool
  );

  const components = createComponentsFromChildReferences(
    metadataChildReferences,
    presentationChildReferences,
    metadataPool,
    presentationPool
  );

  return {
    validationTypeId: validationType.id,
    components
  };
};

const getMetadataChildReferencesForValidationType = (
  validationType: BFFValidationType,
  metadataPool: any
) => {
  const newMetadataGroupId = validationType.newMetadataGroupId;
  const newMetadataGroup = metadataPool.get(newMetadataGroupId) as BFFMetadataGroup;
  return newMetadataGroup.children;
};

const getPresentationChildReferencesForValidationType = (
  validationType: BFFValidationType,
  presentationPool: any
) => {
  const newPresentationGroupId = validationType.newPresentationGroupId;
  const newPresentationGroup: BFFPresentationGroup = presentationPool.get(newPresentationGroupId);
  return newPresentationGroup.children;
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

    // todo handle gui_element

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
  return { name: presentationChildId, type: presentationChildType, textStyle: presentationChildReference.textStyle };
};

const createCollectionVariableOptions = (metadataPool: any, collectionVariable: BFFMetadataCollectionVariable) => {
  const collection = metadataPool.get(
    collectionVariable.refCollection,
  ) as BFFMetadataItemCollection;
  const itemReferences = collection.collectionItemReferences;
  return itemReferences.map((itemRef) => {
    const collectionItem = metadataPool.get(itemRef.refCollectionItemId) as BFFMetadata;
    const label = collectionItem.textId;
    const value = collectionItem.nameInData;
    return { value, label }; // todo handle disabled?
  });
}

function createAttributes(metadataVariable: BFFMetadataCollectionVariable | BFFMetadataNumberVariable | BFFMetadataTextVariable | BFFMetadataGroup, metadataPool: any, options: unknown[] | undefined) {
  return metadataVariable.attributeReferences?.map((attributeReference) => {
    const refCollectionVar = metadataPool.get(
      attributeReference.refCollectionVarId,
    ) as BFFMetadataCollectionVariable;

    const fakePresentation: BFFPresentation = {
      id: 'someFakeId',
      presentationOf: refCollectionVar.id,
      type: 'pCollVar',
      mode: 'input',
      emptyTextId: 'initialEmptyValueText',
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

  const presentationChildId = presentationChildReference.childId;
  const presentation: BFFPresentation = presentationPool.get(presentationChildId);
  const metadataId = presentation.presentationOf;
  const metaDataChildRef = findMetadataChildReferenceById(metadataId, metadataChildReferences);
  const repeat = createRepeat(presentationChildReference, metaDataChildRef);
  const metadata = metadataPool.get(metadataId) as BFFMetadata;

  const commonParameters = createCommonParameters(metadata, presentation);
  // { name, type, placeholder, mode, inputType, tooltip }

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

  if (presentation.type === 'pGroup') {
    const group = metadata as BFFMetadataGroup;
    const presentationGroup: BFFPresentationGroup = presentationPool.get(presentation.id);

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
    components
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

const createCommonParameters = (metadata: BFFMetadata, presentation: BFFPresentation) => {
  const name = metadata.nameInData;
  const type = metadata.type;
  const placeholder = presentation.emptyTextId;
  const mode = presentation.mode;
  const inputType = presentation.inputType;
  const tooltip = { title: metadata.textId, body: metadata.defTextId };
  let label = metadata.textId;
  if (presentation.specifiedLabelTextId) {
    label = presentation.specifiedLabelTextId;
  }
  if (presentation.showLabel && presentation.showLabel === 'false') {
    label = '';
  }
  return { name, type, placeholder, mode, inputType, tooltip, label };
};
