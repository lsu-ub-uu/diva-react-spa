import { Dependencies } from './formDefinitions';

export const createFormDefinition = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: string
) => {
  const validationPool = dependencies.validationTypePool;
  const validationType = validationPool.get(validationTypeId);
  return {};
};
