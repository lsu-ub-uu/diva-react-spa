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

import recordManuscript from '../../__mocks__/coraRecordManuscript.json';
import { isDataAtomic, isDataGroup, isRecordLink, transformRecord, traverseDataGroup } from '../transformRecord';
import { DataAtomic, DataGroup, RecordLink, RecordWrapper } from '../../utils/cora-data/CoraData';
import { Lookup } from '../../utils/structs/lookup';
import { BFFMetadata, BFFMetadataItemCollection, BFFValidationType } from '../bffTypes';
import { Dependencies } from '../../formDefinition/formDefinitionsDep';
import { listToPool } from '../../utils/structs/listToPool';
import {
  someAlternativeTitleMetadataChildGroup, someMainTitleTextVariable,
  someManuscriptEditMetadataGroup,
  someManuscriptValidationTypeData, someSubTitleTextVariable,
} from '../../__mocks__/form/bffMock';

describe('transformRecord', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someManuscriptValidationTypeData
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>([
      someManuscriptEditMetadataGroup,
      someAlternativeTitleMetadataChildGroup,
      someMainTitleTextVariable,
      someSubTitleTextVariable
    ]);

    dependencies = {
      validationTypePool: validationTypePool,
      metadataPool: metadataPool,
    };
  });


  describe('helper methods', () => {
    it('should be able to detect a DataGroup', () => {
      const testData = { name: 'test', children: [] } as DataGroup;
      const expected = isDataGroup(testData);
      expect(true).toStrictEqual(expected);
    });

    it('should be able to detect a DataAtomic', () => {
      const testData = { name: 'test', value: 'someValue' } as DataAtomic;
      const expected = isDataAtomic(testData);
      expect(true).toStrictEqual(expected);
    });

    it('should be able to detect a RecordLink', () => {
      const testData = {
        name: 'test',
        children: [
          {
            name: 'linkedRecordType',
            value: 'someLinkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'someLinkedRecordValue',
          }],
      } as RecordLink;
      const expected = isRecordLink(testData);
      expect(true).toStrictEqual(expected);
    });
  });

  it('should return a record', () => {
    const transformData = transformRecord(dependencies, recordManuscript as RecordWrapper);
    const expected = {
      id: 'divaOutput:519333261463755',
      recordType: 'divaOutput',
      validationType: 'manuscript',
      createdAt: '2023-10-11T09:24:30.511487Z',
      createdBy: 'coraUser:490742519075086',
      userRights: ['read', 'update', 'index', 'delete'],
      updated: [
        {
          updateAt: '2023-10-11T09:24:30.511487Z',
          updatedBy: 'coraUser:490742519075086',
        },
        {
          updateAt: '2023-10-18T09:09:13.554736Z',
          updatedBy: '161616',
        },
        {
          updateAt: '2023-10-26T12:33:22.260532Z',
          updatedBy: '161616',
        },
        {
          updateAt: '2023-10-26T12:35:28.748398Z',
          updatedBy: '161616',
        },
        {
          updateAt: '2023-10-26T12:35:40.545698Z',
          updatedBy: '161616',
        },
        {
          updateAt: '2023-10-26T12:35:52.293623Z',
          updatedBy: '161616',
        },
      ],
      data: {
        divaOutput: {
          title: {
            mainTitle: {
              value: 'aaaaaa',
            },
            _language: 'kal',
          },
          alternativeTitle: [
            {
              mainTitle: {
                value: 'bbbbb',
              },
              subTitle: [
                {
                  value: 'subTitle1',
                },
              ],
              _language: 'epo',
              _titleType: 'alternativeTitle',
            },
          ],
          nationalSubjectCategory: [
            {
              value: 'nationalSubjectCategory:6325370460697648',
            },
          ],
          abstract: [
            {
              value: 'hej!',
              _language: 'fao',
            },
          ],
        },
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group', () => {
    const test = { name: 'divaOutput', children: [] };
    const transformData = traverseDataGroup(test);
    const expected = {
      divaOutput: {},
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with a dataAtomic child', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'title',
          value: 'testTitleVal',
        },
      ],
    };
    const transformData = traverseDataGroup(test);
    const expected = {
      divaOutput: {
        title: {
          value: 'testTitleVal',
        },
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with a childGroup with atomic children', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'childGroup',
          children: [
            {
              name: 'title',
              value: 'testTitleVal',
            },
          ],
        },
      ],
    };
    const transformData = traverseDataGroup(test);
    const expected = {
      divaOutput: {
        childGroup: {
          title: {
            value: 'testTitleVal',
          },
        },
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with two dataAtomic children', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'title',
          value: 'testTitleVal',
        },
        {
          name: 'age',
          value: '12',
        },
      ],
    };
    const transformData = traverseDataGroup(test);
    const expected = {
      divaOutput: {
        title: {
          value: 'testTitleVal',
        },
        age: {
          value: '12',
        },
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with repeating children', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'exampleNumberVar',
          value: '12.99',
          repeatId: '0',
        },
        {
          name: 'exampleNumberVar',
          value: '1.34',
          repeatId: '1',
        },
        {
          name: 'exampleNumberVarTwo',
          value: '99.00',
        },
      ],
    };
    const transformData = traverseDataGroup(test as DataGroup);
    const expected = {
      divaOutput: {
        exampleNumberVar: [
          {
            value: '12.99',
          },
          {
            value: '1.34',
          },
        ],
        exampleNumberVarTwo: {
          value: '99.00',
        },
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with repeating children with attributes', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'exampleNumberVar',
          value: '12.99',
          repeatId: '0',
          attributes: {
            language: 'kal',
          },
        },
        {
          name: 'exampleNumberVar',
          value: '1.34',
          repeatId: '1',
          attributes: {
            language: 'eng',
          },
        },
      ],
    };
    const transformData = traverseDataGroup(test as DataGroup);
    const expected = {
      divaOutput: {
        exampleNumberVar: [
          {
            value: '12.99',
            _language: 'kal',
          },
          {
            value: '1.34',
            _language: 'eng',
          },
        ],
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with two different repeating children', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'exampleNumberVar',
          value: '12.99',
          repeatId: '0',
        },
        {
          name: 'exampleNumberVar',
          value: '1.34',
          repeatId: '1',
        },
        {
          name: 'exampleNumberVarTwo',
          value: '99.00',
          repeatId: '0',
        },
        {
          name: 'exampleNumberVarTwo',
          value: '101.00',
          repeatId: '1',
        },
      ],
    };
    const transformData = traverseDataGroup(test as DataGroup);
    const expected = {
      divaOutput: {
        exampleNumberVar: [
          {
            value: '12.99',
          },
          {
            value: '1.34',
          },
        ],
        exampleNumberVarTwo: [
          {
            value: '99.00',
          },
          {
            value: '101.00',
          },
        ],
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with a repeating childGroup with atomic children', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'childGroup',
          repeatId: '0',
          children: [
            {
              name: 'title',
              value: 'testTitleVal1',
            },
          ],
        },
        {
          name: 'childGroup',
          repeatId: '1',
          children: [
            {
              name: 'title',
              value: 'testTitleVal2',
            },
          ],
        },
      ],
    };
    const transformData = traverseDataGroup(test);
    const expected = {
      divaOutput: {
        childGroup: [
          {
            title: {
              value: 'testTitleVal1',
            },
          },
          {
            title: {
              value: 'testTitleVal2',
            },
          },
        ],
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with a non-repeating RecordLink', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          name: 'nationalSubjectCategory',
          children: [
            {
              name: 'linkedRecordType',
              value: 'nationalSubjectCategory',
            },
            {
              name: 'linkedRecordId',
              value: 'nationalSubjectCategory:6325370460697648',
            },
          ],
        },
      ],
    };
    const transformData = traverseDataGroup(test);
    const expected = {
      divaOutput: {
        nationalSubjectCategory: {
          value: 'nationalSubjectCategory:6325370460697648',
        },
      },
    };
    expect(transformData).toStrictEqual(expected);
  });

  it('should return a root group with a repeating RecordLinks having attributes', () => {
    const test = {
      name: 'divaOutput',
      children: [
        {
          repeatId: '0',
          attributes: {
            language: 'eng',
          },
          name: 'nationalSubjectCategory',
          children: [
            {
              name: 'linkedRecordType',
              value: 'nationalSubjectCategory',
            },
            {
              name: 'linkedRecordId',
              value: 'nationalSubjectCategory:6325370460697648',
            },
          ],
        },
        {
          repeatId: '1',
          attributes: {
            language: 'swe',
          },
          name: 'nationalSubjectCategory',
          children: [
            {
              name: 'linkedRecordType',
              value: 'nationalSubjectCategory',
            },
            {
              name: 'linkedRecordId',
              value: 'nationalSubjectCategory:6325370460697641',
            },
          ],
        },
      ],
    };
    const transformData = traverseDataGroup(test);
    const expected = {
      divaOutput: {
        nationalSubjectCategory: [
          {
            value: 'nationalSubjectCategory:6325370460697648',
            _language: 'eng',
          },
          {
            value: 'nationalSubjectCategory:6325370460697641',
            _language: 'swe',
          }],
      },
    };
    expect(transformData).toStrictEqual(expected);
  });
});
