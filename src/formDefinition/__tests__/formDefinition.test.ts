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

import { listToPool } from '../../utils/structs/listToPool';
import {
  BFFMetadata,
  BFFPresentation,
  BFFPresentationGroup,
  BFFValidationType
} from '../../config/bffTypes';
import { Lookup } from '../../utils/structs/lookup';
import {
  pSomeMetadataTextVariable,
  pSomeNewMetadataGroup,
  someMetadataTextVariable,
  someNewMetadataGroup,
  someRecordInfo,
  someValidationTypeData
} from '../../__mocks__/form/bffMock';
import { createFormDefinition } from '../formDefinition';
import { Dependencies } from '../formDefinitionsDep';

describe('formDefinition', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata>;
  let presentationPool: Lookup<string, BFFPresentation | BFFPresentationGroup>;
  const FORM_MODE_NEW = 'new';
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([someValidationTypeData]);
    metadataPool = listToPool<BFFMetadata>([
      someMetadataTextVariable,
      someNewMetadataGroup,
      someRecordInfo
    ]);
    presentationPool = listToPool<BFFPresentation | BFFPresentationGroup>([
      pSomeMetadataTextVariable,
      pSomeNewMetadataGroup
    ]);
    dependencies = {
      validationTypePool: validationTypePool,
      metadataPool: metadataPool,
      presentationPool: presentationPool
    };
  });

  it('should generate something', () => {
    expect(validationTypePool.get('someValidationTypeId')).toBeDefined();
    expect(metadataPool.get('someNewMetadataGroupId')).toBeDefined();
    expect(metadataPool.get('someMetadataTextVariableId')).toBeDefined();
    expect(presentationPool.get('pSomeMetadataTextVariableId')).toBeDefined();
  });

  it('should throw Error on invalid ValidationType', () => {
    const invalidValidationType = 'someInvalidValidationType';

    expect(() => {
      createFormDefinition(dependencies, invalidValidationType, FORM_MODE_NEW);
    }).toThrow(Error);

    try {
      createFormDefinition(dependencies, invalidValidationType, FORM_MODE_NEW);
    } catch (error: unknown) {
      const createFormDefinitionError: Error = <Error>error;
      expect(createFormDefinitionError.message).toStrictEqual(
        '[someInvalidValidationType] does not exist in Lookup pool'
      );
    }
  });

  it('should return a form definition containing a text and a inputText', () => {
    const validationTypeId = 'someValidationTypeId';
    const formDefinition= createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
    expect(formDefinition.components).toHaveLength(2);
    expect(formDefinition).toEqual({
      validationTypeId: validationTypeId,
      components: [
        {
          type: 'text',
          name: 'someHeadlineTextId',
        },
        {
          type: 'input',
          name: 'someNameInData',
          placeholder: 'someEmptyTextId',
          validation: {
            type: 'regex',
            pattern: 'someRegex'
          }
        }
      ]
    });
  });
});
