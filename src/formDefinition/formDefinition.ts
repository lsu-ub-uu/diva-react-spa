import {
  BFFMetadata, BFFMetadataCollectionVariable,
  BFFMetadataGroup, BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationGroup,
  BFFValidationType,
} from 'config/bffTypes';
import { Dependencies } from './formDefinitionsDep';
import { removeEmpty } from '../utils/structs/removeEmpty';

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
  const newMetadataGroupId = validationType.newMetadataGroupId;
  const newMetadataGroup = metadataPool.get(newMetadataGroupId) as BFFMetadataGroup;
  const metadataChildReferences = newMetadataGroup.children;

  // helper method
  const findMetadataChildReferenceById = (childId: string) => {
    const metaDataChildRef = metadataChildReferences.find(
      (reference) => reference.childId === childId
    );
    if (metaDataChildRef === undefined) {
      throw new Error(`Child reference with childId [${childId}] does not exist`);
    }
    return metaDataChildRef;
  };
  // presentation
  const newPresentationGroupId = validationType.newPresentationGroupId;
  const newPresentationGroup: BFFPresentationGroup = presentationPool.get(newPresentationGroupId);
  const presentationChildReferences = newPresentationGroup.children;

  const components = presentationChildReferences.map((presentationChildReference) => {
    const presentationChildId = presentationChildReference.childId;
    const presentationChildType = presentationChildReference.type;

    let type;
    let placeholder;
    let name;
    let validation;
    let repeat;
    let mode;
    let inputType;
    let tooltip;
    let options;

    if (presentationChildType === 'text') {
      return { name: presentationChildId, type: presentationChildType };
    }

    // todo handle gui_element

    if (presentationChildType === 'presentation') {
      const presentation: BFFPresentation = presentationPool.get(presentationChildId); // pSomeMetadataTextVariableId
      const metadataId = presentation.presentationOf;
      const metaDataChildRef = findMetadataChildReferenceById(metadataId);

      let minNumberOfRepeatingToShow;
      if (presentationChildReference.minNumberOfRepeatingToShow !== undefined) {
        minNumberOfRepeatingToShow = parseInt(
          presentationChildReference.minNumberOfRepeatingToShow
        );
      }

      const determineRepeatMax = (value: string) => {
        // X means infinite in Cora
        if (value === 'X') {
          return Number.MAX_VALUE;
        }
        return parseInt(value);
      }

      const repeatMin = parseInt(metaDataChildRef.repeatMin);
      const repeatMax = determineRepeatMax(metaDataChildRef.repeatMax);

      repeat = { minNumberOfRepeatingToShow, repeatMin, repeatMax };

      const metadata = metadataPool.get(metadataId) as BFFMetadata;
      name = metadata.nameInData;
      type = metadata.type;

      tooltip = { title: metadata.textId, body: metadata.defTextId };

      if (presentation.type === 'pVar') {
        placeholder = presentation.emptyTextId;
        const textVariable = metadata as BFFMetadataTextVariable;
        mode = presentation.mode;
        inputType = presentation.inputType;
        const pattern = textVariable.regEx;
        if (pattern) {
          validation = { type: 'regex', pattern };
        }
      }

      if (presentation.type === 'pNumVar') {
        placeholder = presentation.emptyTextId;
        const numberVariable = metadata as BFFMetadataNumberVariable;
        mode = presentation.mode;
        inputType = presentation.inputType;
        const min = parseInt(numberVariable.min);
        const max = parseInt(numberVariable.max);
        const warningMin = parseInt(numberVariable.warningMin);
        const warningMax = parseInt(numberVariable.warningMax);
        const numberOfDecimals = parseInt(numberVariable.numberOfDecimals);

        validation = { type: 'number', min, max, warningMin, warningMax, numberOfDecimals };
      }

      if (presentation.type === 'pCollVar') {
        placeholder = presentation.emptyTextId;
        const collectionVariable = metadata as BFFMetadataCollectionVariable;
        // todo handle collectionVariable.finalValue
        mode = presentation.mode;
        inputType = presentation.inputType;
        // create options list
        collectionVariable.refCollection
        const collection = metadataPool.get(collectionVariable.refCollection) as BFFMetadataItemCollection;
        const itemReferences = collection.collectionItemReferences;
        options = itemReferences.map((itemRef) => {
          const collectionItem = metadataPool.get(itemRef.refCollectionItemId) as BFFMetadata;
          const label = collectionItem.textId;
          const value = collectionItem.nameInData;
          return { value, label}; // todo handle disabled?
        })

      }
    }

    return removeEmpty({ name, type, placeholder, validation, repeat, mode, inputType, tooltip, options });
  });

  return {
    validationTypeId: validationType.id,
    components
  };
};
