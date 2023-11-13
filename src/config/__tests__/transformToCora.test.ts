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
import testFormPayloadWithGroupWithAttributesAndTextVar from '../../__mocks__/payloads/divaGuiPostPayloadWithGroupWithAttributesAndTextVar.json';
import testFormPayloadWithGroupWithGroupWithRepeatingGroups from '../../__mocks__/payloads/divaGuiPostPayloadWithGroupWithRepeatingGroups.json';
import { DataGroup } from '../../utils/cora-data/CoraData';
import { Lookup } from '../../utils/structs/lookup';
import { BFFMetadata, BFFMetadataItemCollection, BFFValidationType } from '../bffTypes';
import { Dependencies } from '../../formDefinition/formDefinitionsDep';
import { listToPool } from '../../utils/structs/listToPool';
import {
  someMetadataChildGroup,
  someMetadataRecordLink,
  someMetadataTextVariable,
  someNewSimpleMetadataGroup,
  someSimpleValidationTypeData,
  someSimpleValidationTypeDataWithAttributes,
  someNewSimpleMetadataGroupWithAttributes,
  someMetadataNumberVar,
  someSimpleValidationTypeRepeatingGroups,
  someNewSimpleMetadataGroupRepeatingGroups,
  someMetadataTextVariableWithAttributeVar
} from '../../__mocks__/form/bffMock';
import {
  createFormMetaData,
  createFormMetaDataPathLookup
} from '../../formDefinition/formDefinition';

describe('transformToCora', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  const FORM_MODE_NEW = 'new'; // todo handle edit
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someSimpleValidationTypeData,
      someSimpleValidationTypeDataWithAttributes,
      someSimpleValidationTypeRepeatingGroups
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>([
      someMetadataTextVariable,
      someMetadataRecordLink,
      someMetadataChildGroup,
      someNewSimpleMetadataGroup,
      someNewSimpleMetadataGroupWithAttributes,
      someMetadataNumberVar,
      someNewSimpleMetadataGroupRepeatingGroups,
      someMetadataTextVariableWithAttributeVar
    ]);

    dependencies = {
      validationTypePool: validationTypePool,
      metadataPool: metadataPool
    };
  });

  it('should take a form payload with someRecordType group containing title group with a mainTitle text variable', () => {
    const expected: DataGroup = {
      name: 'someNewMetadataGroupNameInData',
      children: [
        {
          repeatId: '0',
          name: 'someNameInData',
          value: 'firstValue'
        },
        {
          name: 'someChildGroupNameInData',
          children: [
            {
              name: 'someNameInData',
              value: 'secondValue'
            }
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
        }
      ]
    };
    const validationTypeId = 'someSimpleValidationTypeId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(
      formMetaDataPathLookup,
      testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink
    );
    expect(transformData[0]).toStrictEqual(expected);
  });

  it('should take a form payload with group containing attributes, numberVar with repeatMax', () => {
    const expected: DataGroup = {
      name: 'someNewMetadataGroupWithAttributesNameInData',
      children: [
        {
          name: 'someNameInData',
          value: 'Erik'
        },
        {
          name: 'someNameInDataTextWithAttrib',
          value: 'AttribVar',
          attributes: {
            colour: 'someAttributeValue3'
          }
        },
        {
          name: 'someNameInDataNumberVar',
          value: '1',
          repeatId: '0'
        },
        {
          name: 'someNameInDataNumberVar',
          value: '2',
          repeatId: '1'
        },
        {
          name: 'someNameInDataNumberVar',
          value: '3',
          repeatId: '2'
        },
        {
          name: 'someNameInDataNumberVar',
          value: '4',
          repeatId: '3'
        }
      ],
      attributes: {
        colour: 'someAttributeValue3'
      }
    };
    const validationTypeId = 'someSimpleValidationTypeWithAttributesId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(
      formMetaDataPathLookup,
      testFormPayloadWithGroupWithAttributesAndTextVar
    );
    expect(transformData[0]).toStrictEqual(expected);
  });

  it('should take a form payload with repeating groups', () => {
    const expected: DataGroup = {
      name: 'someNewMetadataGroupRepeatingGroupsNameInData',
      children: [
        {
          name: 'someChildGroupNameInData',
          repeatId: '0',
          children: [
            {
              name: 'someNameInData',
              value: 'Erik'
            }
          ]
        },
        {
          name: 'someChildGroupNameInData',
          repeatId: '1',
          children: [
            {
              name: 'someNameInData',
              value: 'Egil'
            }
          ]
        }
      ]
    };
    const validationTypeId = 'someSimpleValidationTypeWithRepeatingGroupsId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(
      formMetaDataPathLookup,
      testFormPayloadWithGroupWithGroupWithRepeatingGroups
    );
    expect(transformData[0]).toStrictEqual(expected);
  });
});

