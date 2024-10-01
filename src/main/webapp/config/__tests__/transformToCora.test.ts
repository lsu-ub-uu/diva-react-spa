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
  createLeaf,
  findChildrenAttributes,
  generateAtomicValue,
  generateLastUpdateInfo,
  generateRecordInfo,
  generateRecordLink,
  injectRecordInfoIntoDataGroup,
  isNonRepeatingVariable,
  isNotAttribute,
  isRepeatingVariable,
  isVariable,
  removeAttributeFromName,
  siblingWithSameNameInData,
  transformToCoraData
} from '../transformToCora';
import testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink from '../../__mocks__/payloads/divaGuiPostPayloadWithTextVarAndGroupWithTextVarAndRecordLink.json';
import testFormPayloadWithGroupWithAttributesAndTextVar from '../../__mocks__/payloads/divaGuiPostPayloadWithGroupWithAttributesAndTextVar.json';
import testFormPayloadWithGroupWithGroupWithRepeatingGroups from '../../__mocks__/payloads/divaGuiPostPayloadWithGroupWithRepeatingGroups.json';
import { DataGroup } from '../../utils/cora-data/CoraData';
import { Lookup } from '../../utils/structs/lookup';
import {
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFMetadataItemCollection,
  BFFPresentation,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType
} from '../bffTypes';
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
  someMetadataTextVariableWithAttributeVar,
  someMetadataNumberVarWithAttribute,
  someMetadataRepeatingRecordLinkWithAttributes,
  someMetadataRecordLinkWithAttributes,
  newNationSubjectCategoryValidationType,
  newNationalSubjectCategoryRecordTypeNewGroup,
  newNationalSubjectCategoryRecordTypeGroup,
  newNationSubjectCategoryMetadataSubjectSweTextVariable,
  newNationSubjectCategoryMetadataSubjectEngTextVariable,
  newNationSubjectCategoryMetadataSubjectSweLangCollVariable,
  newNationSubjectCategoryMetadataSubjectEngLangCollVariable,
  pNewNationSubjectCategoryMetadataGroup,
  pNewNationSubjectCategorySweVar,
  pNewNationSubjectCategoryEngVar,
  someMetadataCollectionVariable,
  divaOutputValidationType,
  preprintNewGroup,
  domainCollectionVar,
  outputTypeGroup,
  outputTypeCollectionVar,
  typeOutputTypeCollectionVar,
  titleGroup,
  mainTitleTextVar,
  someValidationTypeForRepeatingGroupsNameInDataId,
  someNewMetadataGroupRepeatingGroupsNameInDataGroup,
  authorGroup,
  authorGroup2,
  givenNameTextVar,
  familyNameTextVar,
  someValidationTypeForRepeatingCollectionsNameInDataId,
  someNewMetadataGroupRepeatingCollectionNameInDataGroup,
  genreCollectionVar,
  genreOtherCollectionVar,
  someValidationTypeForRepeatingRecordLinksNameInDataId,
  someNewMetadataGroupRepeatingRecordLinksNameInDataGroup,
  someNewRecordLinkId,
  someOtherNewRecordLinkId,
  someValidationTypeForRequiredAndRepeatingId,
  someNewMetadataRequiredAndRepeatingRootGroup,
  someNewMetadataRequiredAndRepeatingGroup,
  someLanguageTerm,
  typeCodeCollectionVar,
  authorityLanguageTermCollectionVar
} from '../../__mocks__/form/bffMock';
import { createFormMetaDataPathLookup } from '../../utils/structs/metadataPathLookup';
import { createFormMetaData } from '../../formDefinition/formMetadata';
import { FormMetaData } from '../../formDefinition/formDefinition';

describe('transformToCora', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let presentationPool: Lookup<string, BFFPresentation | BFFPresentationGroup>;
  const FORM_MODE_NEW = 'create';
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someSimpleValidationTypeData,
      someSimpleValidationTypeDataWithAttributes,
      someSimpleValidationTypeRepeatingGroups,
      newNationSubjectCategoryValidationType,
      divaOutputValidationType,
      someValidationTypeForRepeatingGroupsNameInDataId,
      someValidationTypeForRepeatingCollectionsNameInDataId,
      someValidationTypeForRepeatingRecordLinksNameInDataId,
      someValidationTypeForRequiredAndRepeatingId
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>([
      someMetadataTextVariable,
      someMetadataRecordLink,
      someMetadataChildGroup,
      someNewSimpleMetadataGroup,
      someNewSimpleMetadataGroupWithAttributes,
      someMetadataNumberVar,
      someNewSimpleMetadataGroupRepeatingGroups,
      someMetadataTextVariableWithAttributeVar,
      someMetadataNumberVarWithAttribute,
      someMetadataRepeatingRecordLinkWithAttributes,
      someMetadataRecordLinkWithAttributes,
      someMetadataCollectionVariable,
      newNationalSubjectCategoryRecordTypeNewGroup,
      newNationalSubjectCategoryRecordTypeGroup,
      newNationSubjectCategoryMetadataSubjectSweTextVariable,
      newNationSubjectCategoryMetadataSubjectEngTextVariable,
      newNationSubjectCategoryMetadataSubjectSweLangCollVariable,
      newNationSubjectCategoryMetadataSubjectEngLangCollVariable,
      preprintNewGroup,
      domainCollectionVar,
      outputTypeGroup,
      outputTypeCollectionVar,
      typeOutputTypeCollectionVar,
      titleGroup,
      mainTitleTextVar,
      someNewMetadataGroupRepeatingGroupsNameInDataGroup,
      authorGroup,
      authorGroup2,
      givenNameTextVar,
      familyNameTextVar,
      someNewMetadataGroupRepeatingCollectionNameInDataGroup,
      genreCollectionVar,
      genreOtherCollectionVar,
      someNewMetadataGroupRepeatingRecordLinksNameInDataGroup,
      someNewRecordLinkId,
      someOtherNewRecordLinkId,
      someNewMetadataRequiredAndRepeatingRootGroup,
      someNewMetadataRequiredAndRepeatingGroup,
      someLanguageTerm,
      typeCodeCollectionVar,
      authorityLanguageTermCollectionVar
    ]);
    presentationPool = listToPool<BFFPresentation | BFFPresentationGroup>([
      pNewNationSubjectCategoryMetadataGroup,
      pNewNationSubjectCategorySweVar,
      pNewNationSubjectCategoryEngVar
    ]);

    dependencies = {
      validationTypePool,
      metadataPool,
      textPool: listToPool<BFFText>([]),
      presentationPool,
      recordTypePool: listToPool<BFFRecordType>([]),
      searchPool: listToPool<BFFSearch>([]),
      loginUnitPool: listToPool<BFFLoginUnit>([]),
      loginPool: listToPool<BFFLoginWebRedirect>([])
    };
  });

  describe('injectRecordInfoIntoDataGroup', () => {
    it('adds a recordInfo group to the data', () => {
      const expected = {
        name: 'divaOutput',
        children: [
          {
            name: 'recordInfo',
            children: [
              {
                name: 'id',
                value: 'divaOutput:111111111111111111'
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'system'
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'divaData'
                  }
                ],
                name: 'dataDivider'
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'validationType'
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'divaOutput'
                  }
                ],
                name: 'validationType'
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'recordType'
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'thesisManuscript'
                  }
                ],
                name: 'type'
              },
              {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'user'
                      },
                      {
                        name: 'linkedRecordId',
                        value: '161616'
                      }
                    ],
                    name: 'updatedBy'
                  },
                  {
                    name: 'tsUpdated',
                    value: '2024-05-08T09:40:42.769008Z'
                  }
                ],
                name: 'updated',
                repeatId: '0'
              },
              {
                name: 'tsCreated',
                value: '2024-06-04T15:13:57.698204Z'
              },
              {
                name: 'createdBy',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user'
                  },
                  {
                    name: 'linkedRecordId',
                    value: '171717'
                  }
                ]
              }
            ]
          },
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'aaaaaaaaa'
              }
            ]
          },
          {
            name: 'contentType',
            value: 'otherAcademic'
          },
          {
            name: 'outputType',
            children: [
              {
                name: 'outputType',
                value: 'artisticOutput'
              }
            ]
          },
          {
            name: 'domain',
            value: 'havochvatten'
          }
        ]
      };
      const transformData = {
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'aaaaaaaaa'
              }
            ]
          },
          {
            name: 'contentType',
            value: 'otherAcademic'
          },
          {
            name: 'outputType',
            children: [
              {
                name: 'outputType',
                value: 'artisticOutput'
              }
            ]
          },
          {
            name: 'domain',
            value: 'havochvatten'
          }
        ]
      };
      const validationTypeId = 'divaOutput';
      const dataDivider = 'divaData';
      const recordId = 'divaOutput:111111111111111111';
      const recordType = 'thesisManuscript';

      const updateGroup = injectRecordInfoIntoDataGroup(
        transformData as DataGroup,
        validationTypeId,
        dataDivider,
        recordId,
        recordType,
        '161616',
        '2024-05-08T09:40:42.769008Z',
        '171717',
        '2024-06-04T15:13:57.698204Z'
      );

      expect(updateGroup).toStrictEqual(expected);
    });
  });

  describe('generateRecordInfo', () => {
    it('creates a recordInfo group from data', () => {
      const expected = {
        name: 'recordInfo',
        children: [
          {
            name: 'id',
            value: 'divaOutput:111111111111111111'
          },
          {
            children: [
              {
                name: 'linkedRecordType',
                value: 'system'
              },
              {
                name: 'linkedRecordId',
                value: 'divaData'
              }
            ],
            name: 'dataDivider'
          },
          {
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType'
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput'
              }
            ],
            name: 'validationType'
          },
          {
            children: [
              {
                name: 'linkedRecordType',
                value: 'recordType'
              },
              {
                name: 'linkedRecordId',
                value: 'thesisManuscript'
              }
            ],
            name: 'type'
          },
          {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user'
                  },
                  {
                    name: 'linkedRecordId',
                    value: '161616'
                  }
                ],
                name: 'updatedBy'
              },
              {
                name: 'tsUpdated',
                value: '2024-05-08T09:40:42.769008Z'
              }
            ],
            name: 'updated',
            repeatId: '0'
          }
        ]
      };
      const validationTypeId = 'divaOutput';
      const dataDivider = 'divaData';
      const recordId = 'divaOutput:111111111111111111';
      const recordType = 'thesisManuscript';

      const updateGroup = generateRecordInfo(
        validationTypeId,
        dataDivider,
        recordId,
        recordType,
        '161616',
        '2024-05-08T09:40:42.769008Z'
      );

      expect(updateGroup).toStrictEqual(expected);
    });

    it('should be able to generate a record info from data', () => {
      const expected: DataGroup = {
        name: 'recordInfo',
        children: [
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system'
              },
              {
                name: 'linkedRecordId',
                value: 'diva'
              }
            ]
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType'
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput'
              }
            ]
          }
        ]
      };
      const recordInfo = generateRecordInfo('divaOutput', 'diva');
      expect(recordInfo).toStrictEqual(expected);
    });

    it('should be able to generate a record info from data with id', () => {
      const expected: DataGroup = {
        name: 'recordInfo',
        children: [
          {
            name: 'id',
            value: 'someRecordId'
          },
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system'
              },
              {
                name: 'linkedRecordId',
                value: 'diva'
              }
            ]
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType'
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput'
              }
            ]
          }
        ]
      };
      const recordInfo = generateRecordInfo('divaOutput', 'diva', 'someRecordId');
      expect(recordInfo).toStrictEqual(expected);
    });

    it('should be able to generate a record info from data with id, validationType, record and last updated', () => {
      const expected: DataGroup = {
        name: 'recordInfo',
        children: [
          {
            name: 'id',
            value: 'someRecordId'
          },
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system'
              },
              {
                name: 'linkedRecordId',
                value: 'diva'
              }
            ]
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType'
              },
              {
                name: 'linkedRecordId',
                value: 'manuscript'
              }
            ]
          },
          {
            name: 'type',
            children: [
              {
                name: 'linkedRecordType',
                value: 'recordType'
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput'
              }
            ]
          },
          {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user'
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'coraUser:490742519075086'
                  }
                ],
                name: 'updatedBy'
              },
              {
                name: 'tsUpdated',
                value: '2023-12-12T13:25:11.145501Z'
              }
            ],
            name: 'updated',
            repeatId: '0'
          }
        ]
      };
      const recordInfo = generateRecordInfo(
        'manuscript',
        'diva',
        'someRecordId',
        'divaOutput',
        'coraUser:490742519075086',
        '2023-12-12T13:25:11.145501Z'
      );
      expect(recordInfo).toStrictEqual(expected);
    });

    it('should be able to generate a record info from data with id, validationType, record and last updated, createdBy, tsCreated', () => {
      const expected: DataGroup = {
        name: 'recordInfo',
        children: [
          {
            name: 'id',
            value: 'someRecordId'
          },
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system'
              },
              {
                name: 'linkedRecordId',
                value: 'diva'
              }
            ]
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType'
              },
              {
                name: 'linkedRecordId',
                value: 'manuscript'
              }
            ]
          },
          {
            name: 'type',
            children: [
              {
                name: 'linkedRecordType',
                value: 'recordType'
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput'
              }
            ]
          },
          {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user'
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'coraUser:490742519075086'
                  }
                ],
                name: 'updatedBy'
              },
              {
                name: 'tsUpdated',
                value: '2023-12-12T13:25:11.145501Z'
              }
            ],
            name: 'updated',
            repeatId: '0'
          },
          {
            name: 'tsCreated',
            value: '2023-12-12T13:25:11.145501Z'
          },
          {
            name: 'createdBy',
            children: [
              {
                name: 'linkedRecordType',
                value: 'user'
              },
              {
                name: 'linkedRecordId',
                value: '171717'
              }
            ]
          }
        ]
      };
      const recordInfo = generateRecordInfo(
        'manuscript',
        'diva',
        'someRecordId',
        'divaOutput',
        'coraUser:490742519075086',
        '2023-12-12T13:25:11.145501Z',
        '171717',
        '2023-12-12T13:25:11.145501Z'
      );
      expect(recordInfo).toStrictEqual(expected);
    });
  });

  describe('generateLastUpdateInfo', () => {
    it('creates last update info group from data', () => {
      const expected = {
        children: [
          {
            children: [
              {
                name: 'linkedRecordType',
                value: 'user'
              },
              {
                name: 'linkedRecordId',
                value: '161616'
              }
            ],
            name: 'updatedBy'
          },
          {
            name: 'tsUpdated',
            value: '2024-05-08T09:40:42.769008Z'
          }
        ],
        name: 'updated',
        repeatId: '0'
      };

      const updateGroup = generateLastUpdateInfo('161616', '2024-05-08T09:40:42.769008Z');

      expect(updateGroup).toStrictEqual(expected);
    });
  });

  describe('findChildrenAttributes', () => {
    it('skips atomics without attributes', () => {
      const expected = undefined;
      const actual = findChildrenAttributes({
        value: 'Erik'
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert GUI attributes to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3'
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3'
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert atomics with GUI attributes to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3'
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
        value: 'Erik'
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert GUI attributes with extra values to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3'
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
        someNameInData: {
          value: 'Erik'
        }
      });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('generateAtomicValue', () => {
    it('convert GUI values to Cora atomic format', () => {
      const expected = {
        name: 'someName',
        value: 'someValue'
      };
      const actual = generateAtomicValue('someName', 'someValue');
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('generateRecordLink', () => {
    it('convert recordLinks to Cora recordLink format', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType'
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId'
          }
        ],
        name: 'name'
      };
      const actual = generateRecordLink('name', 'linkedRecordType', 'linkedRecordId');
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with attributes', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType'
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId'
          }
        ],
        attributes: {
          name: 'value'
        },
        name: 'name'
      };
      const actual = generateRecordLink('name', 'linkedRecordType', 'linkedRecordId', {
        name: 'value'
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with repeatId', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType'
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId'
          }
        ],
        repeatId: '1',
        name: 'name'
      };
      const actual = generateRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        undefined,
        '1'
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with attributes and repeatId', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType'
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId'
          }
        ],
        attributes: {
          name: 'value'
        },
        repeatId: '1',
        name: 'name'
      };
      const actual = generateRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        {
          name: 'value'
        },
        '1'
      );
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('createLeaf', () => {
    it('convert recordLink with createLeaf to Cora recordLink format', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'nationalSubjectCategory'
          },
          {
            name: 'linkedRecordId',
            value: 'linkValue'
          }
        ],
        name: 'nationalSubjectCategory'
      };
      const actual = createLeaf(
        {
          name: 'nationalSubjectCategory',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'nationalSubjectCategory'
        },
        'nationalSubjectCategory',
        'linkValue'
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue'
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        'someNameInData',
        'someValue'
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert numberVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue'
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'numberVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        'someNameInData',
        'someValue'
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert collectionVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue'
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        'someNameInData',
        'someValue'
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with repeat with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        repeatId: '2'
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        'someNameInData',
        'someValue',
        '2'
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with attributes with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        attributes: {
          _someAttributes: 'a'
        }
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        'someNameInData',
        'someValue',
        undefined,
        { _someAttributes: 'a' }
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with attributes and repeat with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        attributes: {
          _someAttributes: 'a'
        },
        repeatId: '2'
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        'someNameInData',
        'someValue',
        '2',
        { _someAttributes: 'a' }
      );
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('transformToCoraData', () => {
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
          },
          {
            name: 'someNameInDataNumberWithAttributeVar',
            value: '1',
            attributes: {
              colour: 'someAttributeValue3'
            },
            repeatId: '0'
          },
          {
            name: 'nationalSubjectCategoryWithAttributes',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory2'
              },
              {
                name: 'linkedRecordId',
                value: 'recordLinkWithAttrib'
              }
            ],
            attributes: {
              colour: 'someAttributeValue3'
            }
          },
          {
            name: 'nationalSubjectCategoryRepeatingWithAttributes',
            repeatId: '0',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory2'
              },
              {
                name: 'linkedRecordId',
                value: 'recordLinkRepeatingWithAttrib'
              }
            ],
            attributes: {
              colour: 'someAttributeValue4'
            }
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

    it('should take a form payload with group with same nameInData containing variables with attributes', () => {
      const expected: DataGroup = {
        name: 'nationalSubjectCategory',
        children: [
          {
            name: 'subject',
            value: 'someValue',
            attributes: {
              language: 'swe'
            }
          },
          {
            name: 'subject',
            value: 'someOtherValue',
            attributes: {
              language: 'eng'
            }
          }
        ]
      };
      const validationTypeId = 'nationalSubjectCategory';
      const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        nationalSubjectCategory: {
          subject_language_swe: {
            _language: 'swe',
            value: 'someValue'
          },
          subject_language_eng: {
            _language: 'eng',
            value: 'someOtherValue'
          }
        }
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData containing collVar with attributes', () => {
      const expected: DataGroup = {
        name: 'genreGroup',
        children: [
          {
            name: 'genre',
            value: 'artistic-work_artistic-thesis',
            attributes: {
              language: 'swe'
            }
          },
          {
            name: 'genre',
            value: 'artistic-work_original-creative-work',
            attributes: {
              language: 'eng'
            }
          }
        ]
      };
      const validationTypeId = 'someValidationTypeForRepeatingCollectionsNameInDataId';
      const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        genreGroup: {
          genre_language_swe: {
            value: 'artistic-work_artistic-thesis',
            _language: 'swe'
          },
          genre_language_eng: {
            value: 'artistic-work_original-creative-work',
            _language: 'eng'
          }
        }
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData containing recordLinks with attributes', () => {
      const expected: DataGroup = {
        children: [
          {
            attributes: {
              language: 'swe'
            },
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: '1'
              }
            ],
            name: 'newRecordLink'
          },
          {
            attributes: {
              language: 'eng'
            },
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: '2'
              }
            ],
            name: 'newRecordLink'
          }
        ],
        name: 'recordLinkGroup'
      };
      const validationTypeId = 'someValidationTypeForRepeatingRecordLinksNameInDataId';
      const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        recordLinkGroup: {
          newRecordLink_language_swe: {
            value: '1',
            _language: 'swe'
          },
          newRecordLink_language_eng: {
            value: '2',
            _language: 'eng'
          }
        }
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData and variables', () => {
      const expected: DataGroup = {
        name: 'someRootNameInData',
        children: [
          {
            name: 'author',
            children: [
              {
                name: 'givenName',
                value: 'Egil'
              },
              {
                name: 'familyName',
                value: 'Swenning'
              }
            ],
            attributes: {
              language: 'swe'
            }
          },
          {
            name: 'author',
            children: [
              {
                name: 'givenName',
                value: 'Daniel'
              },
              {
                name: 'familyName',
                value: 'Flores'
              }
            ],
            attributes: {
              language: 'eng'
            }
          }
        ]
      };
      const validationTypeId = 'someValidationTypeForRepeatingGroupsNameInDataId';
      const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        someRootNameInData: {
          author_language_swe: {
            givenName: {
              value: 'Egil'
            },
            familyName: {
              value: 'Swenning'
            },
            _language: 'swe'
          },
          author_language_eng: {
            givenName: {
              value: 'Daniel'
            },
            familyName: {
              value: 'Flores'
            },
            _language: 'eng'
          }
        }
      });
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

    it('should take a form payload with repeating groups2', () => {
      const expected: DataGroup = {
        children: [
          {
            attributes: {
              languageTerm: 'akk'
            },
            children: [
              {
                name: 'mainTitle',
                value: 'asdasdasd'
              }
            ],
            name: 'title'
          },
          {
            children: [
              {
                attributes: {
                  type: 'outputType'
                },
                name: 'genre',
                value: 'publication_newspaper-article'
              }
            ],
            name: 'outputType'
          },
          {
            name: 'domain',
            value: 'hh'
          }
        ],
        name: 'divaOutput'
      };
      const validationTypeId = 'preprint';
      const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        divaOutput: {
          title: {
            _languageTerm: 'akk',
            mainTitle: {
              value: 'asdasdasd'
            }
          },
          outputType: {
            genre: {
              value: 'publication_newspaper-article',
              _type: 'outputType'
            }
          },
          domain: {
            value: 'hh'
          }
        }
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with required group with required and repeating group', () => {
      const expected: DataGroup = {
        name: 'output',
        children: [
          {
            name: 'language',
            children: [
              {
                name: 'languageTerm',
                repeatId: '0',
                value: 'ach',
                attributes: {
                  type: 'code',
                  authority: 'iso639-2b'
                }
              }
            ]
          }
        ]
      };
      const validationTypeId = 'someValidationTypeForRequiredAndRepeatingId';
      const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        output: {
          language: {
            languageTerm: [
              {
                value: 'ach',
                _type: 'code',
                _authority: 'iso639-2b'
              }
            ]
          }
        }
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form swepub-payload', () => {
      const expected: DataGroup = {
        name: 'output',
        children: [
          {
            name: 'language',
            children: [
              {
                name: 'languageTerm',
                repeatId: '0',
                value: 'ach',
                attributes: {
                  type: 'code',
                  authority: 'iso639-2b'
                }
              }
            ]
          }
        ]
      };
      const formMetaDataPathLookup = {
        'output.recordInfo.id': {
          name: 'id',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.recordInfo.type': {
          name: 'type',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'recordType'
        },
        'output.recordInfo.validationType': {
          name: 'validationType',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'validationType'
        },
        'output.recordInfo.dataDivider': {
          name: 'dataDivider',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'system'
        },
        'output.recordInfo.urn:nbn': {
          name: 'urn:nbn',
          type: 'textVariable',
          attributes: {
            type: 'urn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.recordInfo.oai': {
          name: 'oai',
          type: 'textVariable',
          attributes: {
            type: 'oai'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.recordInfo.recordContentSource': {
          name: 'recordContentSource',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.recordInfo.createdBy': {
          name: 'createdBy',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'user'
        },
        'output.recordInfo.tsCreated': {
          name: 'tsCreated',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.recordInfo.updated.updatedBy': {
          name: 'updatedBy',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'user'
        },
        'output.recordInfo.updated.tsUpdated': {
          name: 'tsUpdated',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.recordInfo.updated': {
          name: 'updated',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.recordInfo': {
          name: 'recordInfo',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.genre_type_outputType': {
          name: 'genre',
          type: 'collectionVariable',
          attributes: {
            type: 'outputType'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.artistic-work': {
          name: 'artistic-work',
          type: 'collectionVariable',
          attributes: {
            type: 'outputType'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.language.languageTerm': {
          name: 'languageTerm',
          type: 'collectionVariable',
          attributes: {
            authority: 'iso639-2b'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.language': {
          name: 'language',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.note_type_publicationStatus': {
          name: 'note',
          type: 'collectionVariable',
          attributes: {
            type: 'publicationStatus'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.genre_type_contentType': {
          name: 'genre',
          type: 'collectionVariable',
          attributes: {
            type: 'contentType'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.typeOfResource': {
          name: 'typeOfResource',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.titleInfo_type_alternative.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.titleInfo_type_alternative.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.titleInfo_type_alternative': {
          name: 'titleInfo',
          type: 'group',
          attributes: {
            type: 'alternative'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.name_type_personal.person': {
          name: 'person',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'diva-person'
        },
        'output.name_type_personal.namePart_type_family': {
          name: 'namePart',
          type: 'textVariable',
          attributes: {
            type: 'family'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.name_type_personal.namePart_type_given': {
          name: 'namePart',
          type: 'textVariable',
          attributes: {
            type: 'given'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.name_type_personal.namePart_type_termsOfAddress': {
          name: 'namePart',
          type: 'textVariable',
          attributes: {
            type: 'termsOfAddress'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_personal.role.roleTerm': {
          name: 'roleTerm',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.name_type_personal.role': {
          name: 'role',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_personal.affiliation.organisation': {
          name: 'organisation',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'diva-organisation'
        },
        'output.name_type_personal.affiliation.name.namePart': {
          name: 'namePart',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.name_type_personal.affiliation.name': {
          name: 'name',
          type: 'group',
          attributes: {
            type: 'corporate'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_personal.affiliation.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'ror'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_personal.affiliation.country': {
          name: 'country',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_personal.affiliation.description': {
          name: 'description',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_personal.affiliation': {
          name: 'affiliation',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_personal': {
          name: 'name',
          type: 'group',
          attributes: {
            type: 'personal'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.name_type_corporate.organisation': {
          name: 'organisation',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'diva-organisation'
        },
        'output.name_type_corporate.namePart': {
          name: 'namePart',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.name_type_corporate.role.roleTerm': {
          name: 'roleTerm',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.name_type_corporate.role': {
          name: 'role',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_corporate.description': {
          name: 'description',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.name_type_corporate': {
          name: 'name',
          type: 'group',
          attributes: {
            type: 'corporate'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.note_type_creatorCount': {
          name: 'note',
          type: 'textVariable',
          attributes: {
            type: 'creatorCount'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.abstract': {
          name: 'abstract',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.topic': {
          name: 'topic',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.physicalDescription.extent': {
          name: 'extent',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.physicalDescription': {
          name: 'physicalDescription',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.ssif': {
          name: 'ssif',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.classification': {
          name: 'classification',
          type: 'recordLink',
          attributes: {
            authority: 'ssif'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'nationalSubjectCategory'
        },
        'output.subject_authority_diva.topic': {
          name: 'topic',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'researchSubject'
        },
        'output.subject_authority_diva': {
          name: 'subject',
          type: 'group',
          attributes: {
            authority: 'diva'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.subject_authority_sdg.topic': {
          name: 'topic',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.subject_authority_sdg': {
          name: 'subject',
          type: 'group',
          attributes: {
            authority: 'sdg'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.dateIssued.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.originInfo.dateIssued.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.dateIssued.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.dateIssued': {
          name: 'dateIssued',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.originInfo.copyrightDate.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.originInfo.copyrightDate.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.copyrightDate.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.copyrightDate': {
          name: 'copyrightDate',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.dateOther.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.originInfo.dateOther.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.dateOther.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.dateOther': {
          name: 'dateOther',
          type: 'group',
          attributes: {
            type: 'online'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.agent.publisher': {
          name: 'publisher',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'publisher'
        },
        'output.originInfo.agent.namePart': {
          name: 'namePart',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.originInfo.agent.role.roleTerm': {
          name: 'roleTerm',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.originInfo.agent.role': {
          name: 'role',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.agent': {
          name: 'agent',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.place.placeTerm': {
          name: 'placeTerm',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.originInfo.place': {
          name: 'place',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo.edition': {
          name: 'edition',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.originInfo': {
          name: 'originInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.note': {
          name: 'note',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.location.url': {
          name: 'url',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.location.displayLabel': {
          name: 'displayLabel',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.location': {
          name: 'location',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.identifier_type_doi': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'doi'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier': {
          name: 'identifier',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_archive_number': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'archive_number'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_patent_number': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'patent_number'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_pmid': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'pmid'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_wos': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'wos'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_scopus': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'scopus'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_openAlex': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'openAlex'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_se-libr': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'se-libr'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_isrn': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'isrn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.identifier_type_isbn': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'isbn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.identifier_type_ismn': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'ismn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_conference.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'conference'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_series.series': {
          name: 'series',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'diva-series'
        },
        'output.relatedItem_type_series.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_series.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_series.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_series.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'issn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 2
          }
        },
        'output.relatedItem_type_series.partNumber': {
          name: 'partNumber',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_series': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'series'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_journal.journal': {
          name: 'journal',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'diva-journal'
        },
        'output.relatedItem_type_journal.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'issn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 2
          }
        },
        'output.relatedItem_type_journal.part.detail_type_volume.number': {
          name: 'number',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.detail_type_volume': {
          name: 'detail',
          type: 'group',
          attributes: {
            type: 'volume'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.detail_type_issue.number': {
          name: 'number',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.detail_type_issue': {
          name: 'detail',
          type: 'group',
          attributes: {
            type: 'issue'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.detail_type_artNo.number': {
          name: 'number',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.detail_type_artNo': {
          name: 'detail',
          type: 'group',
          attributes: {
            type: 'artNo'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.extent.start': {
          name: 'start',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.extent.end': {
          name: 'end',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part.extent': {
          name: 'extent',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal.part': {
          name: 'part',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_journal': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'journal'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.note': {
          name: 'note',
          type: 'textVariable',
          attributes: {
            type: 'statement_of_responsibility'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateIssued.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateIssued.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateIssued.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateIssued': {
          name: 'dateIssued',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.copyrightDate.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.copyrightDate.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.copyrightDate.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.copyrightDate': {
          name: 'copyrightDate',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateOther.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateOther.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateOther.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.dateOther': {
          name: 'dateOther',
          type: 'group',
          attributes: {
            type: 'online'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.agent.publisher': {
          name: 'publisher',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'publisher'
        },
        'output.relatedItem_type_book.originInfo.agent.namePart': {
          name: 'namePart',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_book.originInfo.agent.role.roleTerm': {
          name: 'roleTerm',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.agent.role': {
          name: 'role',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.agent': {
          name: 'agent',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.place.placeTerm': {
          name: 'placeTerm',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_book.originInfo.place': {
          name: 'place',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo.edition': {
          name: 'edition',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.originInfo': {
          name: 'originInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'isbn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_book.part.extent.start': {
          name: 'start',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.part.extent.end': {
          name: 'end',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.part.extent': {
          name: 'extent',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.part': {
          name: 'part',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.relatedItem.series': {
          name: 'series',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'diva-series'
        },
        'output.relatedItem_type_book.relatedItem.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.relatedItem.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.relatedItem.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.relatedItem.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'issn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 2
          }
        },
        'output.relatedItem_type_book.relatedItem.partNumber': {
          name: 'partNumber',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_book.relatedItem': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'series'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_book': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'book'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.note': {
          name: 'note',
          type: 'textVariable',
          attributes: {
            type: 'statement_of_responsibility'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateIssued.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateIssued.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateIssued.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateIssued': {
          name: 'dateIssued',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.copyrightDate.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.copyrightDate.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.copyrightDate.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.copyrightDate': {
          name: 'copyrightDate',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateOther.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateOther.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateOther.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.dateOther': {
          name: 'dateOther',
          type: 'group',
          attributes: {
            type: 'online'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.agent.publisher': {
          name: 'publisher',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'publisher'
        },
        'output.relatedItem_type_conference-publication.originInfo.agent.namePart': {
          name: 'namePart',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.agent.role.roleTerm': {
          name: 'roleTerm',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.agent.role': {
          name: 'role',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.agent': {
          name: 'agent',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.place.placeTerm': {
          name: 'placeTerm',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.place': {
          name: 'place',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo.edition': {
          name: 'edition',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.originInfo': {
          name: 'originInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'isbn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_conference-publication.part.extent.start': {
          name: 'start',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.part.extent.end': {
          name: 'end',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.part.extent': {
          name: 'extent',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.part': {
          name: 'part',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.relatedItem.series': {
          name: 'series',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          },
          linkedRecordType: 'diva-series'
        },
        'output.relatedItem_type_conference-publication.relatedItem.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.relatedItem.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.relatedItem.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.relatedItem.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'issn'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 2
          }
        },
        'output.relatedItem_type_conference-publication.relatedItem.partNumber': {
          name: 'partNumber',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_conference-publication.relatedItem': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'series'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_conference-publication': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'conference-publication'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_funder.funder': {
          name: 'funder',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'diva-funder'
        },
        'output.relatedItem_type_funder': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'funder'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_initiative.initiative': {
          name: 'initiative',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_initiative': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'initiative'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_project.project': {
          name: 'project',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'divaOutputSwepub'
        },
        'output.relatedItem_type_project.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_project.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_project.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_project': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'project'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData.titleInfo.subTitle': {
          name: 'subTitle',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData.identifier': {
          name: 'identifier',
          type: 'textVariable',
          attributes: {
            type: 'doi'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData.location.url': {
          name: 'url',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData.location.displayLabel': {
          name: 'displayLabel',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData.location': {
          name: 'location',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_researchData': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'researchData'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_constituent.constituent': {
          name: 'constituent',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'divaOutputSwepub'
        },
        'output.relatedItem_type_constituent': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'constituent'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_thesis.thesis': {
          name: 'thesis',
          type: 'recordLink',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          linkedRecordType: 'divaOutputSwepub'
        },
        'output.relatedItem_type_thesis': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'thesis'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.dateOther.year': {
          name: 'year',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.dateOther.month': {
          name: 'month',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.dateOther.day': {
          name: 'day',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.dateOther.hh': {
          name: 'hh',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.dateOther.mm': {
          name: 'mm',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.dateOther': {
          name: 'dateOther',
          type: 'group',
          attributes: {
            type: 'defence'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.location': {
          name: 'location',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.address': {
          name: 'address',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.place.placeTerm': {
          name: 'placeTerm',
          type: 'textVariable',
          repeat: {
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_defence.place': {
          name: 'place',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence.language.languageTerm': {
          name: 'languageTerm',
          type: 'collectionVariable',
          attributes: {
            authority: 'iso639-2b'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1.7976931348623157e308
          }
        },
        'output.relatedItem_type_defence.language': {
          name: 'language',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        'output.relatedItem_type_defence': {
          name: 'relatedItem',
          type: 'group',
          attributes: {
            type: 'defence'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        output: {
          name: 'output',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        }
      };
      const transformData = transformToCoraData(
        formMetaDataPathLookup as Record<string, FormMetaData>,
        {
          output: {
            titleInfo: {
              _lang: 'alg',
              title: {
                value: 'sadasdsa'
              }
            },
            genre_type_contentType: {
              value: 'ref',
              _type: 'contentType'
            },
            language: {
              languageTerm: [
                {
                  value: 'ale',
                  _type: 'code',
                  _authority: 'iso639-2b'
                }
              ]
            },
            genre_type_outputType: {
              value: 'publication_report',
              _type: 'outputType'
            },
            contentTypeOtherAcademic: {
              value: 'vet'
            }
          }
        }
      );
      expect(transformData[0]).toStrictEqual(expected);
    });
  });

  describe('removeAttributeFromName', () => {
    it('does not remove anything if no attribute', () => {
      const actual = removeAttributeFromName('subject', { language: 'eng' });
      expect(actual).toStrictEqual('subject');
    });

    it('does remove attribute if it exist', () => {
      const actual = removeAttributeFromName('subject_language_eng', { language: 'eng' });
      expect(actual).toStrictEqual('subject');
    });
  });

  describe('siblingWithSameNameInData', () => {
    it('returns false with no matching siblings', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }]
      });
      expect(actual).toBe(false);
    });

    it('returns true with matching siblings', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }],
        someNameInData_attribute_hej: [{ value: 'firstValue' }]
      });
      expect(actual).toBe(true);
    });

    it('returns false with no matching siblings', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }],
        someOtherNameInData: [{ value: 'firstValue' }]
      });
      expect(actual).toBe(false);
    });

    it('returns false with no matching siblings containing attribute', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }],
        someOtherNameInData_attribute_hej: [{ value: 'firstValue' }]
      });
      expect(actual).toBe(false);
    });
  });

  describe('isNotAttribute', () => {
    it('returns false with no matching siblings', () => {
      const actual = isNotAttribute('someNameInData');
      expect(actual).toBe(true);
    });

    it('returns true with matching siblings', () => {
      const actual = isNotAttribute('_someNameInData');
      expect(actual).toBe(false);
    });
  });

  describe('isRepeatingVariable', () => {
    it('returns true if repeating', () => {
      const actual = isRepeatingVariable([{ value: 'firstValue', name: 'someNameInData' }]);
      expect(actual).toBe(true);
    });

    it('returns false if not repeating', () => {
      const actual = isRepeatingVariable({ value: 'firstValue', name: 'someNameInData' });
      expect(actual).toBe(false);
    });
  });

  describe('isVariable', () => {
    it('returns true if variable', () => {
      const actual = isVariable({ value: 'firstValue', name: 'someVariable' });
      expect(actual).toBe(true);
    });

    it('returns false if group', () => {
      const actual = isVariable({
        name: 'someGroup',
        children: [
          {
            name: 'someName',
            value: 'firstValue'
          }
        ]
      });
      expect(actual).toBe(false);
    });
  });

  describe('isNonRepeatingVariable', () => {
    it('returns true if non-variable', () => {
      const actual = isNonRepeatingVariable({ value: 'firstValue', name: 'someVariable' });
      expect(actual).toBe(true);
    });

    it('returns false if repeating variable', () => {
      const actual = isNonRepeatingVariable([{ value: 'firstValue', name: 'someNameInData' }]);
      expect(actual).toBe(false);
    });
  });
});
