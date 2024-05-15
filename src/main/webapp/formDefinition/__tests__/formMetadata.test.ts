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
import { createFormMetaData } from '../formMetadata';
import { FormMetaData } from '../formDefinition';
import { createFormMetaDataPathLookup } from '../../utils/structs/metadataPathLookup';
import { listToPool } from '../../utils/structs/listToPool';
import {
  BFFGuiElement,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFPresentation,
  BFFPresentationGroup,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType
} from '../../config/bffTypes';
import {
  someMetadataChildGroup,
  someMetadataRecordLink,
  someMetadataTextVariable,
  someNewSimpleMetadataGroup,
  someRecordInfo,
  someSimpleValidationTypeData
} from '../../__mocks__/form/bffMock';
import { Lookup } from '../../utils/structs/lookup';
import { Dependencies } from '../formDefinitionsDep';

describe('formMetadata', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  let recordTypePool: Lookup<string, BFFRecordType>;
  let textPool: Lookup<string, BFFText>;
  let searchPool: Lookup<string, BFFSearch>;
  let loginUnitPool: Lookup<string, BFFLoginUnit>;
  let loginPool: Lookup<string, BFFLoginWebRedirect>;

  let dependencies: Dependencies;
  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([someSimpleValidationTypeData]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataGroup>([
      someMetadataTextVariable,
      someRecordInfo,
      someMetadataChildGroup,
      someMetadataRecordLink,
      someNewSimpleMetadataGroup
    ]);
    presentationPool = listToPool<
      BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
    >([]);
    recordTypePool = listToPool<BFFRecordType>([]);
    textPool = listToPool<BFFText>([]);
    searchPool = listToPool<BFFSearch>([]);
    loginUnitPool = listToPool<BFFLoginUnit>([]);
    loginPool = listToPool<BFFLoginWebRedirect>([]);

    dependencies = {
      validationTypePool,
      metadataPool,
      presentationPool,
      recordTypePool,
      textPool,
      searchPool,
      loginUnitPool,
      loginPool
    };
  });
  it('should return form meta data for a given validation type', () => {
    const FORM_MODE_NEW = 'create';
    const validationTypeId = 'someSimpleValidationTypeId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);

    const expected: FormMetaData = {
      name: 'someNewMetadataGroupNameInData',
      type: 'group',
      repeat: {
        repeatMin: 1,
        repeatMax: 1
      },
      children: [
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        {
          name: 'someChildGroupNameInData',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          children: [
            {
              name: 'someNameInData',
              type: 'textVariable',
              repeat: {
                repeatMin: 1,
                repeatMax: 1
              }
            }
          ]
        },
        {
          name: 'nationalSubjectCategory',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'recordLink',
          linkedRecordType: 'nationalSubjectCategory'
        }
      ]
    };

    const expectedMetadataLookup = {
      someNewMetadataGroupNameInData: {
        name: 'someNewMetadataGroupNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someNewMetadataGroupNameInData.nationalSubjectCategory': {
        name: 'nationalSubjectCategory',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'recordLink',
        linkedRecordType: 'nationalSubjectCategory'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData': {
        name: 'someChildGroupNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData.someNameInData': {
        name: 'someNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      },
      'someNewMetadataGroupNameInData.someNameInData': {
        name: 'someNameInData',
        repeat: {
          repeatMax: 3,
          repeatMin: 1
        },
        type: 'textVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });
});
