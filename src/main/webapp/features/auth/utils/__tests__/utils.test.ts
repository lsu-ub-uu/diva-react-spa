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
import { deleteFromCora, isValidJSON } from '../utils';
import { Auth } from '@/features/auth/authSlice';

describe('actions', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('utils sends request to DELETE authtoken from Cora', async () => {
    const userSession: Auth = {
      data: {

      token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      loginId: 'coraUser:111111111111111',
      firstName: 'Everything',
      lastName: 'DiVA',
      },
      actionLinks: {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'https://pre.diva-portal.org/login/rest/authToken/user:11111111111111111',
        },
      },
    };
    const expectedResponse = {
      data: {},
      headers: {},
      request: {},
      status: 200,
    };

    const logoutURL = `http://localhost:8080/api/auth`;

    mockAxios.onDelete(logoutURL).reply(200);
    const response = await deleteFromCora(logoutURL, userSession.actionLinks!);
    expect(response.status).toEqual(expectedResponse.status);
  });

  it('utils returns 500 on failed DELETE authtoken from Cora', async () => {
    const userSession: Auth = {
      data: {

      token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      loginId: 'coraUser:111111111111111',
      firstName: 'Everything',
      lastName: 'DiVA',
      },
      actionLinks: {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'https://pre.diva-portal.org/login/rest/authToken/user:11111111111111111',
        },
      },
    };

    const logoutURL = `http://localhost:8080/api/auth`;

    mockAxios.onDelete(logoutURL).reply(500);

    try {
      await deleteFromCora(logoutURL, userSession.actionLinks!);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const castError: AxiosError = <AxiosError>error;
        expect(castError.response?.status).toBe(500);
      }
    }
  });
});

describe('isValidJSON', () => {
  it.each([
    ['{"name":"Adam","age":20}', true],
    ['{"name":"Adam",age:"20"}', false],
    ['{"name":"Adam","age":20}', true],
    ['{}', true],
    [{}, false],
    ['undefined', false],
    ['null', true],
    [null, true],
  ])('check if %s is valid JSON', (string, boolean) => {
    const expected = isValidJSON(string);
    expect(expected).toBe(boolean);
  });
});
