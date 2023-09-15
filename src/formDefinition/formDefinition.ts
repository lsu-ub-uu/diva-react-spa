import { BFFValidationType } from 'config/bffTypes';
import { Dependencies } from './formDefinitionsDep';

export const createFormDefinition = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: string
) => {
  const validationPool = dependencies.validationTypePool;

  // Typ från Lookup.get()?
  const validationType: BFFValidationType = validationPool.get(validationTypeId);
  return {
    validationTypeId
  };
};
