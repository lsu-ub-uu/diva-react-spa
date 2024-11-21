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
  doesRecordInfoExist,
  generateAtomicValue,
  generateLastUpdateInfo,
  generateRecordInfo,
  generateRecordLink,
  isNonRepeatingVariable,
  isNotAttribute,
  isRepeatingVariable,
  isVariable,
  removeAttributeFromName,
  siblingWithSameNameInData,
  transformToCoraData,
} from '../transformToCora';
import testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink from '@/__mocks__/bff/payloads/divaGuiPostPayloadWithTextVarAndGroupWithTextVarAndRecordLink.json';
import testFormPayloadWithGroupWithAttributesAndTextVar from '@/__mocks__/bff/payloads/divaGuiPostPayloadWithGroupWithAttributesAndTextVar.json';
import testFormPayloadWithGroupWithGroupWithRepeatingGroups from '@/__mocks__/bff/payloads/divaGuiPostPayloadWithGroupWithRepeatingGroups.json';
import { DataGroup } from '@/cora/cora-data/CoraData';
import { Lookup } from '@/utils/structs/lookup';
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
  BFFValidationType,
} from '../bffTypes';
import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';
import { listToPool } from '@/utils/structs/listToPool';
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
  authorityLanguageTermCollectionVar,
} from '@/__mocks__/bff/form/bffMock';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { createFormMetaData } from '@/data/formDefinition/formMetadata';

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
      someValidationTypeForRequiredAndRepeatingId,
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
      authorityLanguageTermCollectionVar,
    ]);
    presentationPool = listToPool<BFFPresentation | BFFPresentationGroup>([
      pNewNationSubjectCategoryMetadataGroup,
      pNewNationSubjectCategorySweVar,
      pNewNationSubjectCategoryEngVar,
    ]);

    dependencies = {
      validationTypePool,
      metadataPool,
      textPool: listToPool<BFFText>([]),
      presentationPool,
      recordTypePool: listToPool<BFFRecordType>([]),
      searchPool: listToPool<BFFSearch>([]),
      loginUnitPool: listToPool<BFFLoginUnit>([]),
      loginPool: listToPool<BFFLoginWebRedirect>([]),
    };
  });

  describe('generateRecordInfo', () => {
    it('creates a recordInfo group from data', () => {
      const expected = {
        name: 'recordInfo',
        children: [
          {
            name: 'id',
            value: 'divaOutput:111111111111111111',
          },
          {
            children: [
              {
                name: 'linkedRecordType',
                value: 'system',
              },
              {
                name: 'linkedRecordId',
                value: 'divaData',
              },
            ],
            name: 'dataDivider',
          },
          {
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType',
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput',
              },
            ],
            name: 'validationType',
          },
          {
            children: [
              {
                name: 'linkedRecordType',
                value: 'recordType',
              },
              {
                name: 'linkedRecordId',
                value: 'thesisManuscript',
              },
            ],
            name: 'type',
          },
          {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user',
                  },
                  {
                    name: 'linkedRecordId',
                    value: '161616',
                  },
                ],
                name: 'updatedBy',
              },
              {
                name: 'tsUpdated',
                value: '2024-05-08T09:40:42.769008Z',
              },
            ],
            name: 'updated',
            repeatId: '0',
          },
        ],
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
        '2024-05-08T09:40:42.769008Z',
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
                value: 'system',
              },
              {
                name: 'linkedRecordId',
                value: 'diva',
              },
            ],
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType',
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput',
              },
            ],
          },
        ],
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
            value: 'someRecordId',
          },
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system',
              },
              {
                name: 'linkedRecordId',
                value: 'diva',
              },
            ],
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType',
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput',
              },
            ],
          },
        ],
      };
      const recordInfo = generateRecordInfo(
        'divaOutput',
        'diva',
        'someRecordId',
      );
      expect(recordInfo).toStrictEqual(expected);
    });

    it('should be able to generate a record info from data with id, validationType, record and last updated', () => {
      const expected: DataGroup = {
        name: 'recordInfo',
        children: [
          {
            name: 'id',
            value: 'someRecordId',
          },
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system',
              },
              {
                name: 'linkedRecordId',
                value: 'diva',
              },
            ],
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType',
              },
              {
                name: 'linkedRecordId',
                value: 'manuscript',
              },
            ],
          },
          {
            name: 'type',
            children: [
              {
                name: 'linkedRecordType',
                value: 'recordType',
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput',
              },
            ],
          },
          {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'coraUser:490742519075086',
                  },
                ],
                name: 'updatedBy',
              },
              {
                name: 'tsUpdated',
                value: '2023-12-12T13:25:11.145501Z',
              },
            ],
            name: 'updated',
            repeatId: '0',
          },
        ],
      };
      const recordInfo = generateRecordInfo(
        'manuscript',
        'diva',
        'someRecordId',
        'divaOutput',
        'coraUser:490742519075086',
        '2023-12-12T13:25:11.145501Z',
      );
      expect(recordInfo).toStrictEqual(expected);
    });

    it('should be able to generate a record info from data with id, validationType, record and last updated, createdBy, tsCreated', () => {
      const expected: DataGroup = {
        name: 'recordInfo',
        children: [
          {
            name: 'id',
            value: 'someRecordId',
          },
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system',
              },
              {
                name: 'linkedRecordId',
                value: 'diva',
              },
            ],
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType',
              },
              {
                name: 'linkedRecordId',
                value: 'manuscript',
              },
            ],
          },
          {
            name: 'type',
            children: [
              {
                name: 'linkedRecordType',
                value: 'recordType',
              },
              {
                name: 'linkedRecordId',
                value: 'divaOutput',
              },
            ],
          },
          {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'coraUser:490742519075086',
                  },
                ],
                name: 'updatedBy',
              },
              {
                name: 'tsUpdated',
                value: '2023-12-12T13:25:11.145501Z',
              },
            ],
            name: 'updated',
            repeatId: '0',
          },
          {
            name: 'tsCreated',
            value: '2023-12-12T13:25:11.145501Z',
          },
          {
            name: 'createdBy',
            children: [
              {
                name: 'linkedRecordType',
                value: 'user',
              },
              {
                name: 'linkedRecordId',
                value: '171717',
              },
            ],
          },
        ],
      };
      const recordInfo = generateRecordInfo(
        'manuscript',
        'diva',
        'someRecordId',
        'divaOutput',
        'coraUser:490742519075086',
        '2023-12-12T13:25:11.145501Z',
        '171717',
        '2023-12-12T13:25:11.145501Z',
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
                value: 'user',
              },
              {
                name: 'linkedRecordId',
                value: '161616',
              },
            ],
            name: 'updatedBy',
          },
          {
            name: 'tsUpdated',
            value: '2024-05-08T09:40:42.769008Z',
          },
        ],
        name: 'updated',
        repeatId: '0',
      };

      const updateGroup = generateLastUpdateInfo(
        '161616',
        '2024-05-08T09:40:42.769008Z',
      );

      expect(updateGroup).toStrictEqual(expected);
    });
  });

  describe('findChildrenAttributes', () => {
    it('skips atomics without attributes', () => {
      const expected = undefined;
      const actual = findChildrenAttributes({
        value: 'Erik',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert GUI attributes to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3',
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert atomics with GUI attributes to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3',
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
        value: 'Erik',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert GUI attributes with extra values to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3',
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
        someNameInData: {
          value: 'Erik',
        },
      });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('generateAtomicValue', () => {
    it('convert GUI values to Cora atomic format', () => {
      const expected = {
        name: 'someName',
        value: 'someValue',
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
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        name: 'name',
      };
      const actual = generateRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with attributes', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        attributes: {
          name: 'value',
        },
        name: 'name',
      };
      const actual = generateRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        {
          name: 'value',
        },
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with repeatId', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        repeatId: '1',
        name: 'name',
      };
      const actual = generateRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        undefined,
        '1',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with attributes and repeatId', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        attributes: {
          name: 'value',
        },
        repeatId: '1',
        name: 'name',
      };
      const actual = generateRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        {
          name: 'value',
        },
        '1',
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
            value: 'nationalSubjectCategory',
          },
          {
            name: 'linkedRecordId',
            value: 'linkValue',
          },
        ],
        name: 'nationalSubjectCategory',
      };
      const actual = createLeaf(
        {
          name: 'nationalSubjectCategory',
          type: 'recordLink',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          linkedRecordType: 'nationalSubjectCategory',
        },
        'nationalSubjectCategory',
        'linkValue',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3,
          },
        },
        'someNameInData',
        'someValue',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert numberVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'numberVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3,
          },
        },
        'someNameInData',
        'someValue',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert collectionVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'collectionVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3,
          },
        },
        'someNameInData',
        'someValue',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with repeat with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        repeatId: '2',
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3,
          },
        },
        'someNameInData',
        'someValue',
        '2',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with attributes with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        attributes: {
          _someAttributes: 'a',
        },
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3,
          },
        },
        'someNameInData',
        'someValue',
        undefined,
        { _someAttributes: 'a' },
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with attributes and repeat with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        attributes: {
          _someAttributes: 'a',
        },
        repeatId: '2',
      };
      const actual = createLeaf(
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3,
          },
        },
        'someNameInData',
        'someValue',
        '2',
        { _someAttributes: 'a' },
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
            value: 'firstValue',
          },
          {
            name: 'someChildGroupNameInData',
            children: [
              {
                name: 'someNameInData',
                value: 'secondValue',
              },
            ],
          },
          {
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: 'linkValue',
              },
            ],
          },
        ],
      };
      const validationTypeId = 'someSimpleValidationTypeId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(
        formMetaDataPathLookup,
        testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink,
      );
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group containing attributes, numberVar with repeatMax', () => {
      const expected: DataGroup = {
        name: 'someNewMetadataGroupWithAttributesNameInData',
        children: [
          {
            name: 'someNameInData',
            value: 'Erik',
          },
          {
            name: 'someNameInDataTextWithAttrib',
            value: 'AttribVar',
            attributes: {
              colour: 'someAttributeValue3',
            },
          },
          {
            name: 'someNameInDataNumberVar',
            value: '1',
            repeatId: '0',
          },
          {
            name: 'someNameInDataNumberVar',
            value: '2',
            repeatId: '1',
          },
          {
            name: 'someNameInDataNumberVar',
            value: '3',
            repeatId: '2',
          },
          {
            name: 'someNameInDataNumberVar',
            value: '4',
            repeatId: '3',
          },
          {
            name: 'someNameInDataNumberWithAttributeVar',
            value: '1',
            attributes: {
              colour: 'someAttributeValue3',
            },
            repeatId: '0',
          },
          {
            name: 'nationalSubjectCategoryWithAttributes',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory2',
              },
              {
                name: 'linkedRecordId',
                value: 'recordLinkWithAttrib',
              },
            ],
            attributes: {
              colour: 'someAttributeValue3',
            },
          },
          {
            name: 'nationalSubjectCategoryRepeatingWithAttributes',
            repeatId: '0',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory2',
              },
              {
                name: 'linkedRecordId',
                value: 'recordLinkRepeatingWithAttrib',
              },
            ],
            attributes: {
              colour: 'someAttributeValue4',
            },
          },
        ],
        attributes: {
          colour: 'someAttributeValue3',
        },
      };
      const validationTypeId = 'someSimpleValidationTypeWithAttributesId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(
        formMetaDataPathLookup,
        testFormPayloadWithGroupWithAttributesAndTextVar,
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
              language: 'swe',
            },
          },
          {
            name: 'subject',
            value: 'someOtherValue',
            attributes: {
              language: 'eng',
            },
          },
        ],
      };
      const validationTypeId = 'nationalSubjectCategory';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        nationalSubjectCategory: {
          subject_language_swe: {
            _language: 'swe',
            value: 'someValue',
          },
          subject_language_eng: {
            _language: 'eng',
            value: 'someOtherValue',
          },
        },
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
              language: 'swe',
            },
          },
          {
            name: 'genre',
            value: 'artistic-work_original-creative-work',
            attributes: {
              language: 'eng',
            },
          },
        ],
      };
      const validationTypeId =
        'someValidationTypeForRepeatingCollectionsNameInDataId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        genreGroup: {
          genre_language_swe: {
            value: 'artistic-work_artistic-thesis',
            _language: 'swe',
          },
          genre_language_eng: {
            value: 'artistic-work_original-creative-work',
            _language: 'eng',
          },
        },
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData containing recordLinks with attributes', () => {
      const expected: DataGroup = {
        children: [
          {
            attributes: {
              language: 'swe',
            },
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: '1',
              },
            ],
            name: 'newRecordLink',
          },
          {
            attributes: {
              language: 'eng',
            },
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: '2',
              },
            ],
            name: 'newRecordLink',
          },
        ],
        name: 'recordLinkGroup',
      };
      const validationTypeId =
        'someValidationTypeForRepeatingRecordLinksNameInDataId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        recordLinkGroup: {
          newRecordLink_language_swe: {
            value: '1',
            _language: 'swe',
          },
          newRecordLink_language_eng: {
            value: '2',
            _language: 'eng',
          },
        },
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
                value: 'Egil',
              },
              {
                name: 'familyName',
                value: 'Swenning',
              },
            ],
            attributes: {
              language: 'swe',
            },
          },
          {
            name: 'author',
            children: [
              {
                name: 'givenName',
                value: 'Daniel',
              },
              {
                name: 'familyName',
                value: 'Flores',
              },
            ],
            attributes: {
              language: 'eng',
            },
          },
        ],
      };
      const validationTypeId =
        'someValidationTypeForRepeatingGroupsNameInDataId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        someRootNameInData: {
          author_language_swe: {
            givenName: {
              value: 'Egil',
            },
            familyName: {
              value: 'Swenning',
            },
            _language: 'swe',
          },
          author_language_eng: {
            givenName: {
              value: 'Daniel',
            },
            familyName: {
              value: 'Flores',
            },
            _language: 'eng',
          },
        },
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
                value: 'Erik',
              },
            ],
          },
          {
            name: 'someChildGroupNameInData',
            repeatId: '1',
            children: [
              {
                name: 'someNameInData',
                value: 'Egil',
              },
            ],
          },
        ],
      };
      const validationTypeId = 'someSimpleValidationTypeWithRepeatingGroupsId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(
        formMetaDataPathLookup,
        testFormPayloadWithGroupWithGroupWithRepeatingGroups,
      );
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with repeating groups2', () => {
      const expected: DataGroup = {
        children: [
          {
            attributes: {
              languageTerm: 'akk',
            },
            children: [
              {
                name: 'mainTitle',
                value: 'asdasdasd',
              },
            ],
            name: 'title',
          },
          {
            children: [
              {
                attributes: {
                  type: 'outputType',
                },
                name: 'genre',
                value: 'publication_newspaper-article',
              },
            ],
            name: 'outputType',
          },
          {
            name: 'domain',
            value: 'hh',
          },
        ],
        name: 'divaOutput',
      };
      const validationTypeId = 'preprint';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        divaOutput: {
          title: {
            _languageTerm: 'akk',
            mainTitle: {
              value: 'asdasdasd',
            },
          },
          outputType: {
            genre: {
              value: 'publication_newspaper-article',
              _type: 'outputType',
            },
          },
          domain: {
            value: 'hh',
          },
        },
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
                  authority: 'iso639-2b',
                },
              },
            ],
          },
        ],
      };
      const validationTypeId = 'someValidationTypeForRequiredAndRepeatingId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        output: {
          language: {
            languageTerm: [
              {
                value: 'ach',
                _type: 'code',
                _authority: 'iso639-2b',
              },
            ],
          },
        },
      });
      expect(transformData[0]).toStrictEqual(expected);
    });
  });

  describe('removeAttributeFromName', () => {
    it('does not remove anything if no attribute', () => {
      const actual = removeAttributeFromName('subject', { language: 'eng' });
      expect(actual).toStrictEqual('subject');
    });

    it('does remove attribute if it exist', () => {
      const actual = removeAttributeFromName('subject_language_eng', {
        language: 'eng',
      });
      expect(actual).toStrictEqual('subject');
    });
  });

  describe('siblingWithSameNameInData', () => {
    it('returns false with no matching siblings', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }],
      });
      expect(actual).toBe(false);
    });

    it('returns true with matching siblings', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }],
        someNameInData_attribute_hej: [{ value: 'firstValue' }],
      });
      expect(actual).toBe(true);
    });

    it('returns false with no matching siblings', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }],
        someOtherNameInData: [{ value: 'firstValue' }],
      });
      expect(actual).toBe(false);
    });

    it('returns false with no matching siblings containing attribute', () => {
      const actual = siblingWithSameNameInData({
        someNameInData: [{ value: 'firstValue' }],
        someOtherNameInData_attribute_hej: [{ value: 'firstValue' }],
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
      const actual = isRepeatingVariable([
        { value: 'firstValue', name: 'someNameInData' },
      ]);
      expect(actual).toBe(true);
    });

    it('returns false if not repeating', () => {
      const actual = isRepeatingVariable({
        value: 'firstValue',
        name: 'someNameInData',
      });
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
            value: 'firstValue',
          },
        ],
      });
      expect(actual).toBe(false);
    });
  });

  describe('isNonRepeatingVariable', () => {
    it('returns true if non-variable', () => {
      const actual = isNonRepeatingVariable({
        value: 'firstValue',
        name: 'someVariable',
      });
      expect(actual).toBe(true);
    });

    it('returns false if repeating variable', () => {
      const actual = isNonRepeatingVariable([
        { value: 'firstValue', name: 'someNameInData' },
      ]);
      expect(actual).toBe(false);
    });
  });

  describe('doesRecordInfoExist', () => {
    it('finds recordInfo', () => {
      const actual = doesRecordInfoExist({
        name: 'divaOutput',
        children: [
          {
            name: 'recordInfo',
            children: [
              {
                name: 'id',
                value: '1234',
              },
            ],
          },
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'aaaaaaaaa',
              },
            ],
          },
          {
            name: 'contentType',
            value: 'otherAcademic',
          },
          {
            name: 'outputType',
            children: [
              {
                name: 'outputType',
                value: 'artisticOutput',
              },
            ],
          },
          {
            name: 'domain',
            value: 'havochvatten',
          },
        ],
      });
      expect(actual).toBe(true);
    });
    it('does not find recordInfo', () => {
      const actual = doesRecordInfoExist({
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'aaaaaaaaa',
              },
            ],
          },
          {
            name: 'contentType',
            value: 'otherAcademic',
          },
          {
            name: 'outputType',
            children: [
              {
                name: 'outputType',
                value: 'artisticOutput',
              },
            ],
          },
          {
            name: 'domain',
            value: 'havochvatten',
          },
        ],
      });
      expect(actual).toBe(false);
    });
  });
});
