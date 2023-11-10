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

import {
  transformToCoraData,
} from '../transformToCora';
import testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink from '../../__mocks__/payloads/divaGuiPostPayloadWithTextVarAndGroupWithTextVarAndRecordLink.json';
import { DataGroup } from '../../utils/cora-data/CoraData';
import { Lookup } from '../../utils/structs/lookup';
import {
  BFFMetadata,
  BFFMetadataItemCollection,
  BFFValidationType,
} from '../bffTypes';
import { Dependencies } from '../../formDefinition/formDefinitionsDep';
import { listToPool } from '../../utils/structs/listToPool';
import {
  someMetadataChildGroup, someMetadataRecordLink,
  someMetadataTextVariable,
  someNewSimpleMetadataGroup,
  someSimpleValidationTypeData,
} from '../../__mocks__/form/bffMock';
import { createFormMetaData, createFormMetaDataPathLookup } from '../../formDefinition/formDefinition';

describe('transformToCora', () => {

  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  const FORM_MODE_NEW = 'new'; // todo handle edit
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someSimpleValidationTypeData
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>([
      someMetadataTextVariable,
      someMetadataRecordLink,
      someMetadataChildGroup,
      someNewSimpleMetadataGroup
    ]);

    dependencies = {
      validationTypePool: validationTypePool,
      metadataPool: metadataPool,
    };
  });

  it('should take a form payload with someRecordType group containing title group with a mainTitle text variable', () => {
    const expected: DataGroup = {
      name: 'someNewMetadataGroupNameInData',
      children: [
        {
          repeatId: '0',
          name: 'someNameInData',
          value: 'firstValue',
        },
        {
          name: 'someChildGroupNameInData',
          children: [
            {
              name: 'someNameInData',
              value: 'secondValue',
            },
          ]
        },
        {
          name: 'nationalSubjectCategory',
          children: [
            {
              name: 'linkedRecordType',
              value: 'nationalSubjectCategory'
            },
            {
              name: 'linkedRecordId',
              value: 'linkValue'
            }
          ]
        },
      ],
    };
    const validationTypeId = 'someSimpleValidationTypeId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(formMetaDataPathLookup, testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink);
    expect(transformData[0]).toStrictEqual(expected);
  });

});

