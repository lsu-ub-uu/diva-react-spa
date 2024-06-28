import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosError } from 'axios';
import { deleteAuthTokenFromCora, extractDataFromResult, requestAuthTokenOnLogin } from '../auth';

const authUser = {
  data: {
    children: [
      {
        name: 'id',
        value: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      },
      {
        name: 'validForNoSeconds',
        value: '600'
      },
      {
        name: 'idInUserStorage',
        value: 'coraUser:111111111111111'
      },
      {
        name: 'idFromLogin',
        value: 'coraUser:111111111111111'
      },
      {
        name: 'firstName',
        value: 'Everything'
      },
      {
        name: 'lastName',
        value: 'DiVA'
      }
    ],
    name: 'authToken'
  },
  actionLinks: {
    delete: {
      requestMethod: 'DELETE',
      rel: 'delete',
      url: 'https://cora.epc.ub.uu.se/diva/login/rest/apptoken/coraUser:111111111111111'
    }
  }
};

let mockAxios: MockAdapter;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
});

afterEach(() => {
  mockAxios.restore();
});

describe('requestAuthTokenOnLogin', () => {
  describe('requestAuthTokenOnLoginNew', () => {
    it('Returns an appToken from authToken', async () => {
      const { CORA_LOGIN_URL } = process.env;
      const rootUrl = `${CORA_LOGIN_URL}/apptoken/`;
      const coraUser = 'coraUser:111111111111111';
      const url = `${rootUrl}${coraUser}`;

      mockAxios.onPost(url).reply(200, authUser);
      const response = await requestAuthTokenOnLogin(
        coraUser,
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'apptoken'
      );

      expect(response).toEqual({
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        validForNoSeconds: '600',
        idInUserStorage: 'coraUser:111111111111111',
        idFromLogin: 'coraUser:111111111111111',
        lastName: 'DiVA',
        firstName: 'Everything'
      });
    });
    it('Returns an password from authToken', async () => {
      const { CORA_LOGIN_URL } = process.env;
      const rootUrl = `${CORA_LOGIN_URL}/password/`;
      const coraUser = 'coraUser:111111111111111';
      const url = `${rootUrl}${coraUser}`;

      mockAxios.onPost(url).reply(200, authUser);
      const response = await requestAuthTokenOnLogin(
        coraUser,
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'password'
      );

      expect(response).toEqual({
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        validForNoSeconds: '600',
        idInUserStorage: 'coraUser:111111111111111',
        idFromLogin: 'coraUser:111111111111111',
        lastName: 'DiVA',
        firstName: 'Everything'
      });
    });
  });

  describe('extractDataFromResult', () => {
    it('extract data from authToken', () => {
      const testData = extractDataFromResult(authUser);
      expect(testData).toEqual({
        firstName: 'Everything',
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        idFromLogin: 'coraUser:111111111111111',
        idInUserStorage: 'coraUser:111111111111111',
        lastName: 'DiVA',
        validForNoSeconds: '600'
      });
    });
  });

  describe('deleteAuthTokenOnLogout', () => {
    it('Delete an appToken', async () => {
      const { CORA_LOGIN_URL } = process.env;
      const rootUrl = `${CORA_LOGIN_URL}/authToken/`;
      const coraUser = 'coraUser:111111111111111';
      const url = `${rootUrl}${coraUser}`;

      mockAxios.onDelete(url).reply(200);
      const response = await deleteAuthTokenFromCora(
        coraUser,
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      );
      expect(response.status).toEqual(200);
    });
    it('Returns 500 on failed DELETE authtoken from Cora', async () => {
      const { CORA_LOGIN_URL } = process.env;
      const rootUrl = `${CORA_LOGIN_URL}/authToken/`;
      const coraUser = 'coraUser:111111111111111';
      const url = `${rootUrl}${coraUser}`;

      mockAxios.onDelete(url).reply(500);

      try {
        await deleteAuthTokenFromCora(coraUser, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const castError: AxiosError = <AxiosError>error;
          expect(castError.response?.status).toBe(500);
        }
      }
    });
  });
});
