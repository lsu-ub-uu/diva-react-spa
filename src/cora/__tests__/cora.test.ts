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
import { getRecordDataListByType } from '../cora';
import { DataListWrapper } from '../../utils/cora-data/CoraData';
import { transformCoraTexts } from '../../config/transformTexts';
import { listToPool } from '../../utils/structs/listToPool';
import { BFFText } from '../../config/bffTypes';
import { createTextDefinition } from '../../textDefinition/textDefinition';

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
    const apiUrl: string = `https://cora.epc.ub.uu.se/diva/rest/record/${type}`;
    mockAxios.onGet(apiUrl).reply(200, expectedResponse);
    const response = await getRecordDataListByType(type, 'someValidToken');
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });

  // @ts-ignore
  it('should handle an error response with status 404', async () => {
    const type = 'invalidType';
    const apiUrl: string = `https://cora.epc.ub.uu.se/diva/rest/record/${type}`;
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

describe('real getRecordDataListByType', () => {
  // @ts-ignore
  it.skip('should make a real API call without authToken', async () => {
    const response = await getRecordDataListByType<DataListWrapper>('text', '');
    expect(response.status).toBe(200);
    const texts = transformCoraTexts(response.data);
    const textPool = listToPool<BFFText>(texts);
    const temp = createTextDefinition({ textPool }, 'en');
    expect(response.data.dataList.containDataOfType).toBe('text');
  });
});

