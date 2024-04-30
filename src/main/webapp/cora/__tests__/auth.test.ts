import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { extractDataFromResult, requestAuthTokenOnLogin } from '../auth';

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
    it('Returns an appToken', async () => {
      const { CORA_LOGIN_URL } = process.env;
      const rootUrl = `${CORA_LOGIN_URL}/apptoken/`;
      const coraUser = 'coraUser:111111111111111';
      const url = `${rootUrl}${coraUser}`;

      mockAxios.onPost(url).reply(200, authUser);
      const response = await requestAuthTokenOnLogin(
        coraUser,
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
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
      const testData = extractDataFromResult(authUser.data);
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
});
