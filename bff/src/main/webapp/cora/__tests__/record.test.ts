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

import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  deleteRecordDataById,
  getRecordDataById,
  getRecordDataListByType,
  postRecordData,
  updateRecordDataById,
} from '../record';
import {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/CoraData';
import { transformCoraTexts } from '@/cora/transform/transformTexts';
import { listToPool } from '@/utils/structs/listToPool';
import {
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFPresentation,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '@/cora/transform/bffTypes';
import { createTextDefinition } from '@/data/textDefinition/textDefinition';
import { extractIdFromRecordInfo } from '@/cora/cora-data/CoraDataTransforms';

const RECORD_LIST_CONTENT_TYPE = 'application/vnd.uub.recordList+json';
const RECORD_CONTENT_TYPE = 'application/vnd.uub.record+json';

describe('record', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('getRecordDataListByType', () => {
    it('should fetch data for a valid type', async () => {
      const type = 'someValidType';
      const expectedResponse = {
        data: {
          test: 'someTestValue',
        },
        headers: {},
        request: {},
        status: 200,
      };
      const apiUrl: string = `/record/${type}`;
      mockAxios
        .onGet(apiUrl, {
          headers: { Accept: RECORD_LIST_CONTENT_TYPE },
        })
        .reply(200, expectedResponse);
      const response = await getRecordDataListByType(type);
      expect(response.data).toEqual(expect.objectContaining(expectedResponse));
    });

    it('should handle an error response with status 404', async () => {
      const type = 'invalidType';
      const apiUrl: string = `/record/${type}`;
      mockAxios
        .onGet(apiUrl, { headers: { Accept: RECORD_LIST_CONTENT_TYPE } })
        .reply(404);

      try {
        await getRecordDataListByType(type, 'validToken');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error).toBeInstanceOf(AxiosError);
          const castError: AxiosError = <AxiosError>error;
          expect(castError.response?.status).toBe(404);
        }
      }
    });
  });

  describe('getRecordDataById', () => {
    it('should fetch data for a valid type and id', async () => {
      const type = 'divaOutput';
      const id = 'divaOutput:11111111111111';
      const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
      const expectedResponse = {
        status: 200,
      };
      const apiUrl: string = `/record/${type}/${id}`;
      mockAxios
        .onGet(apiUrl, {
          headers: {
            Accept: RECORD_CONTENT_TYPE,
            Authtoken: `${authToken}`,
          },
        })
        .reply(200, expectedResponse);
      const response = await getRecordDataById(type, id, authToken);
      expect(response.data).toEqual(expect.objectContaining(expectedResponse));
    });
  });

  describe('postRecordData', () => {
    it('should post a record to Cora', async () => {
      const type = 'divaOutput';
      const actual = {
        name: 'divaOutput',
        children: [
          {
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
                    value: 'divaData',
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
                    value: 'thesisManuscript',
                  },
                ],
              },
            ],
          },
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'aaaa',
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
            value: 'ivl',
          },
        ],
      };
      const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
      const expectedResponse = {
        status: 200,
      };
      const apiUrl: string = `/record/${type}`;
      mockAxios
        .onPost(apiUrl, actual, {
          headers: {
            Accept: RECORD_CONTENT_TYPE,
            'Content-Type': RECORD_CONTENT_TYPE,
            Authtoken: `${authToken}`,
          },
        })
        .reply(200, expectedResponse);
      const response = await postRecordData(actual, type, authToken);
      expect(response.data).toEqual(expect.objectContaining(expectedResponse));
    });
    it('should NOT post a record to Cora with wrong type', async () => {
      const type = 'diva';
      const actual = {
        name: 'divaOutput',
        children: [
          {
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
                    value: 'divaData',
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
                    value: 'thesisManuscript',
                  },
                ],
              },
            ],
          },
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'aaaa',
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
            value: 'ivl',
          },
        ],
      };
      const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
      const expectedResponse = {
        status: 400,
      };
      const apiUrl: string = `/record/${type}`;
      mockAxios
        .onPost(apiUrl, actual, {
          headers: {
            Accept: RECORD_CONTENT_TYPE,
            'Content-Type': RECORD_CONTENT_TYPE,
            Authtoken: `${authToken}`,
          },
        })
        .reply(400, expectedResponse);

      try {
        await postRecordData(actual, type, authToken);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error).toBeInstanceOf(AxiosError);
          const castError: AxiosError = <AxiosError>error;
          expect(castError.response?.status).toBe(400);
        }
      }
    });
  });

  describe('updateRecordDataById', () => {
    it('should update data for a specific id', async () => {
      const type = 'divaOutput';
      const actual = {
        name: 'divaOutput',
        children: [
          {
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
                    value: 'divaData',
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
                    value: 'thesisManuscript',
                  },
                ],
              },
            ],
          },
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'aaaa',
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
            value: 'ivl',
          },
        ],
      };
      const recordId = 'divaOutput:11111111111111';
      const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
      const expectedResponse = {
        status: 200,
      };
      const apiUrl: string = `/record/${type}/${recordId}`;
      mockAxios
        .onPost(apiUrl, actual, {
          headers: {
            Accept: RECORD_CONTENT_TYPE,
            'Content-Type': RECORD_CONTENT_TYPE,
            Authtoken: `${authToken}`,
          },
        })
        .reply(200, expectedResponse);
      const response = await updateRecordDataById(
        recordId,
        actual,
        type,
        authToken,
      );
      expect(response.data).toEqual(expect.objectContaining(expectedResponse));
    });
  });

  describe('deleteRecordDataById', () => {
    it('should update data for a specific id', async () => {
      const type = 'divaOutput';
      const recordId = 'divaOutput:11111111111111';
      const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
      const expectedResponse = {
        status: 200,
      };
      const apiUrl: string = `/record/${type}/${recordId}`;
      mockAxios

        .onDelete(apiUrl, {
          headers: expect.objectContaining({
            Authtoken: `${authToken}`,
          }),
        })

        .reply(200, expectedResponse);
      const response = await deleteRecordDataById(recordId, type, authToken);
      expect(response.data).toEqual(expect.objectContaining(expectedResponse));
    });
  });
});

describe.skip('real', () => {
  describe('real getRecordDataListByType', () => {
    it.skip('should make a real API call without authToken', async () => {
      const { CORA_API_URL } = process.env;
      axios.defaults.baseURL = CORA_API_URL;
      console.log(axios.defaults.baseURL);
      const response = await getRecordDataListByType<DataListWrapper>(
        'text',
        '',
      );
      expect(response.status).toBe(200);
      const texts = transformCoraTexts(response.data);
      const dependencies = {
        textPool: listToPool<BFFText>(texts),
        validationTypePool: listToPool<BFFValidationType>([]),
        metadataPool: listToPool<BFFMetadata>([]),
        presentationPool: listToPool<BFFPresentation | BFFPresentationGroup>(
          [],
        ),
        recordTypePool: listToPool<BFFRecordType>([]),
        searchPool: listToPool<BFFSearch>([]),
        loginUnitPool: listToPool<BFFLoginUnit>([]),
        loginPool: listToPool<BFFLoginWebRedirect>([]),
      };
      const defs = createTextDefinition(dependencies, 'en');
      expect(Object.keys(defs).length).toBe(6030);
      expect(response.data.dataList.containDataOfType).toBe('text');
    });
  });

  describe('real createRecord', () => {
    it('should make a real post API call to create a record with authToken', async () => {
      const { CORA_API_URL } = process.env;
      axios.defaults.baseURL = CORA_API_URL;
      console.log(axios.defaults.baseURL);

      const payload: DataGroup = {
        name: 'divaOutput',
        children: [
          {
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
                    value: 'manuscript',
                  },
                ],
              },
            ],
          },
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'Moby Dick',
              },
            ],
            attributes: {
              language: 'swe',
            },
          },
          {
            name: 'contributors',
            children: [
              {
                name: 'author',
                repeatId: '0',
                children: [
                  {
                    name: 'givenName',
                    value: 'Kalle',
                  },
                  {
                    name: 'familyName',
                    value: 'Kulasson',
                  },
                ],
              },
            ],
          },
          {
            name: 'nationalSubjectCategory',
            repeatId: '0',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325359248717964',
              },
            ],
          },
        ],
      };
      const authToken = '4acc77dd-c486-42f8-b56a-c79585509112';

      const response = await postRecordData<RecordWrapper>(
        payload,
        'divaOutput',
        authToken,
      );
      expect(response.status).toBe(201);
    });
  });

  describe('real getRecord', () => {
    it('should make a real API call to get fetch record with authToken', async () => {
      const { CORA_API_URL } = process.env;
      axios.defaults.baseURL = CORA_API_URL;
      console.log(axios.defaults.baseURL);
      const recordType = 'divaOutput';
      const recordId = 'divaOutput:519333261463755';
      const authToken = 'd308ee8e-777f-4f92-8985-090b1fcc5f89';

      const response = await getRecordDataById<RecordWrapper>(
        recordType,
        recordId,
        authToken,
      );
      const id = extractIdFromRecordInfo(response.data.record.data);
      console.log(id, response);
    });
  });
});
