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
import { getRecordById, getRecordDataListByType, postRecordData } from '../cora';
import { DataGroup, DataListWrapper, RecordWrapper } from '../../utils/cora-data/CoraData';
import { transformCoraTexts } from '../../config/transformTexts';
import { listToPool } from '../../utils/structs/listToPool';
import { BFFText } from '../../config/bffTypes';
import { createTextDefinition } from '../../textDefinition/textDefinition';
import { extractIdFromRecordInfo } from '../../utils/cora-data/CoraDataTransforms';

describe('getRecordDataListByType', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  // @ts-ignore
  it('should fetch data for a valid type', async () => {
    const type = 'someValidType';
    const expectedResponse = {
      data: {
        test: 'someTestValue'
      },
      headers: {},
      request: {},
      status: 200
    };
    const apiUrl: string = `/record/${type}`;
    mockAxios.onGet(apiUrl).reply(200, expectedResponse);
    const response = await getRecordDataListByType(type, 'someValidToken');
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });

  // @ts-ignore
  it('should handle an error response with status 404', async () => {
    const type = 'invalidType';
    const apiUrl: string = `/record/${type}`;
    mockAxios.onGet(apiUrl).reply(404);

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

describe.skip('real', () => {
  describe('real getRecordDataListByType', () => {
    // @ts-ignore
    it.skip('should make a real API call without authToken', async () => {
      const { CORA_API_URL } = process.env;
      axios.defaults.baseURL = CORA_API_URL;
      console.log(axios.defaults.baseURL);
      const response = await getRecordDataListByType<DataListWrapper>('text', '');
      expect(response.status).toBe(200);
      const texts = transformCoraTexts(response.data);
      const textPool = listToPool<BFFText>(texts);
      const defs = createTextDefinition({ textPool }, 'en');
      expect(Object.keys(defs).length).toBe(6030);
      expect(response.data.dataList.containDataOfType).toBe('text');
    });
  });

  describe('real createRecord', () => {
    // @ts-ignore
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
              }
            ]
          },
          {
            name: 'title',
            children: [
              {
                name: 'mainTitle',
                value: 'Moby Dick'
              }
            ],
            attributes: {
              language: 'swe'
            }
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
                    value: 'Kalle'
                  },
                  {
                    name: 'familyName',
                    value: 'Kulasson'
                  }
                ]
              }
            ]
          },
          {
            name: 'nationalSubjectCategory',
            repeatId: '0',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325359248717964'
              }
            ]
          }
        ]
      };
      const authToken = '4acc77dd-c486-42f8-b56a-c79585509112';

      const response = await postRecordData<RecordWrapper>(payload, 'divaOutput', authToken);
      expect(response.status).toBe(201);
    });
  });

  describe('real getRecord', () => {
    // @ts-ignore
    it('should make a real API call to get fetch record with authToken', async () => {
      const { CORA_API_URL } = process.env;
      axios.defaults.baseURL = CORA_API_URL;
      console.log(axios.defaults.baseURL);
      const recordType = 'divaOutput';
      const recordId = 'divaOutput:519333261463755';
      const authToken = 'd308ee8e-777f-4f92-8985-090b1fcc5f89';

      const response = await getRecordById<RecordWrapper>(recordType, recordId, authToken);
      const id = extractIdFromRecordInfo(response.data.record.data);
      console.log(response);

    });
  });
});
