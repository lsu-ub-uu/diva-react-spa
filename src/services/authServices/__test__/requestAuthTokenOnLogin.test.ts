import httpClient from '../../../utils/http/HttpClient';
import { requestAuthTokenOnLogin } from '../requestAuthTokenOnLogin';
import { IHttpClientRequestParameters } from '../../../utils/http/IHttpClient';

// console.log(authDataForOnePerson);
jest.mock('../../../utils/http/HttpClient');

const mockHttpClientPost = httpClient.post as jest.MockedFunction<typeof httpClient.post>;

beforeEach(() => {
  //process.env.REST_API_BASE_URL = 'baseUrl/';
  mockHttpClientPost.mockResolvedValueOnce({
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
        url: 'https://cora.epc.ub.uu.se/apptokenverifier/rest/apptoken/coraUser:111111111111111'
      }
    }
  });
});
// afterAll(() => {
//   server.resetHandlers();
//   cleanup();
// });
describe('requestAuthTokenOnLogin', () => {
  it('should exist and take a user ID', () => {
    requestAuthTokenOnLogin('authDataForOnePerson', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
  });
  it('should reject with error if username is empty and not call httpClient', async () => {
    //expect.assertions(2);

    try {
      await requestAuthTokenOnLogin('' as any, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError.message).toStrictEqual('No userId was passed to requestAuthTokenOnLogin');
      expect(mockHttpClientPost).toHaveBeenCalledTimes(0);
    }
  });
  it('should reject with error if apptoken is empty and not call httpClient', async () => {
    //expect.assertions(2);
    const coraUser = 'coraUser:490742519075086';
    try {
      await requestAuthTokenOnLogin(coraUser, '');
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError.message).toStrictEqual('No appToken was passed to requestAuthTokenOnLogin');
      expect(mockHttpClientPost).toHaveBeenCalledTimes(0);
    }
  });
  it('should correctly call httpClient with parameters', async () => {
    const coraUser = 'coraUser:491055276494310';
    const parameters: IHttpClientRequestParameters = {
      url: `https://cora.epc.ub.uu.se/diva/apptokenverifier/rest/apptoken/${coraUser}`,
      contentType: 'text/plain;charset=UTF-8',
      body: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
    };
    // expect.assertions(2);

    await requestAuthTokenOnLogin(coraUser, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

    expect(mockHttpClientPost).toHaveBeenCalledTimes(1);
    expect(mockHttpClientPost).toHaveBeenCalledWith({
      url: parameters.url,
      contentType: parameters.contentType,
      body: parameters.body
    });
  });
  it('should reject with an error if HttpClient throws error', async () => {
    mockHttpClientPost.mockRejectedValueOnce(new Error('Some other error from httpClient'));

    // expect.assertions(6);

    try {
      await requestAuthTokenOnLogin(
        'coraUser:111111111111111',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      );
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError).toBeDefined();
      expect(castError.message).toStrictEqual('Some error from httpClient');
      expect(mockHttpClientPost).toHaveBeenCalledTimes(1);
    }

    mockHttpClientPost.mockRejectedValueOnce(new Error('Some other error from httpClient'));

    try {
      await requestAuthTokenOnLogin('IdForOnePerson', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError).toBeDefined();
      expect(castError.message).toStrictEqual('Some other error from httpClient');
      expect(mockHttpClientPost).toHaveBeenCalledTimes(2);
    }
  });
});
