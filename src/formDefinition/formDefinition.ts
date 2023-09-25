import _ from 'lodash';
import {
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationGroup,
  BFFValidationType
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

  const newPresentationGroupId = validationType.newPresentationGroupId;

  const newPresentationGroup: BFFPresentationGroup = presentationPool.get(newPresentationGroupId);
  const presentationChildReferences = newPresentationGroup.children;

  const components = presentationChildReferences.map((childReference) => {
    const childId = childReference.childId;
    const childType = childReference.type;

    let type;
    let placeholder;
    let name;
    let validation;
    let repeat;

    if (childReference.minNumberOfRepeatingToShow !== undefined) {
      repeat = {
        minNumberOfRepeatingToShow: parseInt(childReference.minNumberOfRepeatingToShow)
      };
    }

    if (childType === 'text') {
      type = childType;
      name = childId;
    }

    if (childType === 'presentation') {
      // todo handle gui_element
      const presentation: BFFPresentation = presentationPool.get(childId); // pSomeMetadataTextVariableId
      // presentation.type === "pVar"
      const metadataId = presentation.presentationOf;
      if (presentation.type === 'pGroup') {
        console.log(metadataId);
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
