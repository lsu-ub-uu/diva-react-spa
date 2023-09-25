import _ from 'lodash';
import {
  BFFMetadataGroup,
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
  const findMetadataChildReferenceById = (childId: string) => metadataChildReferences.find((reference) => reference.childId === childId);

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

    if (presentationChildType === 'text') {
      type = presentationChildType;
      name = presentationChildId;
    }

    // todo handle gui_element

    if (presentationChildType === 'presentation') {
      const presentation: BFFPresentation = presentationPool.get(presentationChildId); // pSomeMetadataTextVariableId
      const metadataId = presentation.presentationOf;
      const metaDataChildRef = findMetadataChildReferenceById(metadataId);

      if (metaDataChildRef === undefined) {
        throw new Error(`Child reference with childId [${metadataId}] does not exist`);
      }

      let minNumberOfRepeatingToShow;
      if (presentationChildReference.minNumberOfRepeatingToShow !== undefined) {
          minNumberOfRepeatingToShow = parseInt(presentationChildReference.minNumberOfRepeatingToShow);
      }

      let repeatMax;
      let repeatMin;

      if (metaDataChildRef !== undefined) {
        repeatMin = parseInt(metaDataChildRef.repeatMin);
        repeatMax = parseInt(metaDataChildRef.repeatMax);
      }

      repeat = { minNumberOfRepeatingToShow, repeatMin, repeatMax}

      if (presentation.type === 'pGroup') {
        // TODO: handle pGroup
      }

      if (presentation.type === 'pVar') {
        type = presentation.inputType;
        placeholder = presentation.emptyTextId;
        const textVariable = metadataPool.get(metadataId) as BFFMetadataTextVariable;
        name = textVariable.nameInData;
        const pattern = textVariable.regEx;
        if (pattern) {
          validation = { type: 'regex', pattern };
        }
      }
    }

    return removeEmpty({ name, type, placeholder, validation, repeat });
  });

  return {
    validationTypeId: validationType.id,
    components
  };
};
