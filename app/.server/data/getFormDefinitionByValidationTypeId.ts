/*
 * Copyright 2024 Uppsala University Library
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
 */

import { createFormDefinition } from '@/.server/data/formDefinition/formDefinition';
import type { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';

export const getFormDefinitionByValidationTypeId = async (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: 'create' | 'update' | 'view',
) => {
  if (!dependencies.validationTypePool.has(validationTypeId)) {
    throw new Error(`Validation type [${validationTypeId}] does not exist`);
  }

  return createFormDefinition(dependencies, validationTypeId, mode);
};
