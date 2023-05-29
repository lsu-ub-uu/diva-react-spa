import httpClient from '../../../utils/http/HttpClient';
import { newCreatedPerson } from '../../../__mocks__/personObjectData';
import { authDataForOnePerson } from '../../../__mocks__/authTestData';
import { requestAuthTokenOnLogin } from '../requestAuthTokenOnLogin';
import { IHttpClientRequestParameters } from '../../../utils/http/IHttpClient';

// console.log(authDataForOnePerson);
jest.mock('../../../utils/http/HttpClient');

const mockHttpClientPost = httpClient.post as jest.MockedFunction<
  typeof httpClient.post
>;

describe('requestAuthTokenOnLogin', () => {
  beforeAll(() => {
    process.env.REST_API_BASE_URL = 'baseUrl/';
    mockHttpClientPost.mockResolvedValueOnce({
      authDataForOnePerson,
    });
  });
  it('should exist and take a user ID', () => {
    requestAuthTokenOnLogin('authDataForOnePerson');
  });
  it('should reject with error if newPerson is empty and not call httpClient', async () => {
    //expect.assertions(2);

    try {
      await requestAuthTokenOnLogin('' as any);
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError.message).toStrictEqual(
        'No userId was passed to createPersonWithName',
      );
      expect(mockHttpClientPost).toHaveBeenCalledTimes(0);
    }
  });
  it('should correctly call httpClient with parameters', async () => {
    const coraUser = 'coraUser:490742519075086';
    const parameters: IHttpClientRequestParameters = {
      url: `https://cora.epc.ub.uu.se/diva/apptokenverifier/rest/apptoken/${coraUser}`,
      contentType: 'text/plain;charset=UTF-8',
    };
    expect.assertions(2);

    await requestAuthTokenOnLogin(coraUser);

    expect(mockHttpClientPost).toHaveBeenCalledTimes(1);
    expect(mockHttpClientPost).toHaveBeenCalledWith({
      url: parameters.url,
      contentType: parameters.contentType,
    });
  });
  it('should reject with an error if HttpClient throws error', async () => {
    mockHttpClientPost.mockRejectedValueOnce(
      new Error('Some error from httpClient'),
    );

    // expect.assertions(6);

    try {
      await requestAuthTokenOnLogin('IdForOnePerson');
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError).toBeDefined();
      expect(castError.message).toStrictEqual('Some error from httpClient');
      expect(mockHttpClientPost).toHaveBeenCalledTimes(1);
    }

    mockHttpClientPost.mockRejectedValueOnce(
      new Error('Some other error from httpClient'),
    );

    try {
      await requestAuthTokenOnLogin('IdForOnePerson');
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError).toBeDefined();
      expect(castError.message).toStrictEqual(
        'Some other error from httpClient',
      );
      expect(mockHttpClientPost).toHaveBeenCalledTimes(2);
    }
  });
});
