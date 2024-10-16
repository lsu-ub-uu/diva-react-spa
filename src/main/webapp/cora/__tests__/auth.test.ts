import axios from 'axios';
import { deleteAuthTokenFromCora, extractDataFromResult, requestAuthTokenOnLogin } from '../auth';

const authUser = {
  data: {
    children: [
      {
        name: 'token',
        value: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      },
      {
        name: 'validForNoSeconds',
        value: '600'
      },
      {
        name: 'userId', // idInUserStorage
        value: 'coraUser:111111111111111'
      },
      {
        name: 'loginId',
        value: 'user@domain.x'
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
      url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f'
    }
  }
};

jest.mock('axios');
describe('requestAuthTokenOnLogin', () => {
  it('handles response', async () => {
    const coraUser = 'coraUser:111111111111111';

    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve({ status: 200, data: authUser }));
    const response = await requestAuthTokenOnLogin(
      coraUser,
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'apptoken'
    );

    expect(response).toEqual({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        validForNoSeconds: '600',
        userId: 'coraUser:111111111111111',
        loginId: 'user@domain.x',
        lastName: 'DiVA',
        firstName: 'Everything'
      },
      actionLinks: {
        delete: {
          rel: 'delete',
          requestMethod: 'DELETE',
          url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f'
        }
      }
    });
  });

  describe('handle request', () => {
    it('calls with correct parameters for appToken login', () => {
      const postSpy = jest.spyOn(axios, 'post');
      const loginId = 'coraUser@ub.uu.se';
      const expectedBody = `coraUser@ub.uu.se\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`;
      const expectedHeaders = {
        'Content-Type': 'application/vnd.uub.login'
      };

      requestAuthTokenOnLogin(loginId, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'apptoken');

      expect(postSpy).toBeCalledWith(
        'https://cora.epc.ub.uu.se/diva/login/rest/apptoken',
        expectedBody,
        { headers: expectedHeaders }
      );
    });
    it('calls with correct parameters for appToken login', () => {
      const postSpy = jest.spyOn(axios, 'post');
      const loginId = 'coraUser@ub.uu.se';
      const expectedBody = `coraUser@ub.uu.se\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`;
      const expectedHeaders = {
        'Content-Type': 'application/vnd.uub.login'
      };

      requestAuthTokenOnLogin(loginId, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'password');

      expect(postSpy).toBeCalledWith(
        'https://cora.epc.ub.uu.se/diva/login/rest/password',
        expectedBody,
        { headers: expectedHeaders }
      );
    });
  });

  describe('extractDataFromResult', () => {
    it('extract data from authToken', () => {
      const testData = extractDataFromResult(authUser);
      expect(testData).toEqual({
        data: {
          token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          validForNoSeconds: '600',
          userId: 'coraUser:111111111111111',
          loginId: 'user@domain.x',
          firstName: 'Everything',
          lastName: 'DiVA'
        },
        actionLinks: {
          delete: {
            requestMethod: 'DELETE',
            rel: 'delete',
            url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f'
          }
        }
      });
    });
  });

  describe('deleteAuthTokenOnLogout', () => {
    it('Delete an appToken', async () => {
      // const coraUser = 'coraUser:111111111111111';
      const actionLink = {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'http://localhost:38180/login/rest/authToken/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
        }
      };
      const requestSpy = jest
        .spyOn(axios, 'request')
        .mockReturnValue(Promise.resolve({ status: 200 }));
      const response = await deleteAuthTokenFromCora(
        actionLink,
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      );

      const expectedHeaders = {
        Authtoken: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      };

      expect(requestSpy).toBeCalledWith({
        headers: expectedHeaders,
        url: 'http://localhost:38180/login/rest/authToken/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        method: 'DELETE'
      });
      expect(response.status).toEqual(200);
    });

    // it('Returns 500 on failed DELETE authtoken from Cora', async () => {
    //   const { CORA_LOGIN_URL } = process.env;
    //   const rootUrl = `${CORA_LOGIN_URL}/authToken/`;
    //   const coraUser = 'coraUser:111111111111111';
    //   const url = `${rootUrl}${coraUser}`;
    //
    //   mockAxios.onDelete(url).reply(500);
    //
    //   try {
    //     await deleteAuthTokenFromCora(coraUser, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
    //   } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //       const castError: AxiosError = <AxiosError>error;
    //       expect(castError.response?.status).toBe(500);
    //     }
    //   }
    // });
  });
});
