/*
 * Copyright 2024 Uppsala University Library
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
import { deleteFromCora } from '../deleteFromCora';

describe('actions', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  // const deleteFromCora = async (url: string, authToken: string) => {
  //   const response = await axios.delete(url, { data: authToken });
  //   return response;
  // };

  it('deleteFromCora sends request to DELETE authtoken from Cora', async () => {
    const userSession = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      idFromLogin: 'coraUser:111111111111111',
      firstName: 'Everything',
      lastName: 'DiVA',
      logoutURL:
        'https://cora.epc.ub.uu.se/diva/login/rest/authToken/coraUser:111111111111111',
    };
    const expectedResponse = {
      data: {},
      headers: {},
      request: {},
      status: 200,
    };
    mockAxios.onDelete(userSession.logoutURL).reply(200);
    const response = await deleteFromCora(
      userSession.logoutURL,
      userSession.id,
    );
    expect(response.status).toEqual(expectedResponse.status);
  });

  it('deleteFromCora returns 500 on failed DELETE authtoken from Cora', async () => {
    const userSession = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      idFromLogin: 'coraUser:111111111111111',
      firstName: 'Everything',
      lastName: 'DiVA',
      logoutURL:
        'https://cora.epc.ub.uu.se/diva/login/rest/authToken/coraUser:111111111111111',
    };

    mockAxios.onDelete(userSession.logoutURL).reply(500);

    try {
      await deleteFromCora(userSession.logoutURL, userSession.id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const castError: AxiosError = <AxiosError>error;
        expect(castError.response?.status).toBe(500);
      }
    }
  });
});
