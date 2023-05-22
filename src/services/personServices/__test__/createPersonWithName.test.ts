import httpClient from '../../../utils/http/HttpClient';
import { newCreatedPerson } from '../../../__mocks__/personObjectData';
import { createPersonWithName } from '../createPersonWithName';

jest.mock('../../../utils/http/HttpClient');

const mockHttpClientGet = httpClient.get as jest.MockedFunction<
  typeof httpClient.get
>;

describe('createPersonWithName', () => {
  beforeAll(() => {
    process.env.REST_API_BASE_URL = 'baseUrl/';
    mockHttpClientGet.mockResolvedValueOnce({
      newCreatedPerson,
    });
  });
  it('should exist and take newPerson and optional authToken', () => {
    createPersonWithName(newCreatedPerson);
    createPersonWithName(newCreatedPerson, 'someAuthToken');
  });
  it('should reject with error if newPerson is empty and not call httpClient', async () => {
    // expect.assertions(2);

    try {
      await createPersonWithName('' as any);
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError.message).toStrictEqual(
        'No newPerson was passed to createPersonWithName',
      );
      expect(mockHttpClientGet).toHaveBeenCalledTimes(0);
    }
  });
  it('should correctly call httpClient with parameters', async () => {
    const expectedUrl = `https://cora.epc.ub.uu.se/diva/rest/record/person/`;

    expect.assertions(2);

    await createPersonWithName(newCreatedPerson);

    expect(mockHttpClientGet).toHaveBeenCalledTimes(1);
    expect(mockHttpClientGet).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expectedUrl,
      }),
    );
  });
  it('should reject with an error if HttpClient throws error', async () => {
    mockHttpClientGet.mockRejectedValueOnce(
      new Error('Some error from httpClient'),
    );

    expect.assertions(6);

    try {
      await createPersonWithName(newCreatedPerson);
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError).toBeDefined();
      expect(castError.message).toStrictEqual('Some error from httpClient');
      expect(mockHttpClientGet).toHaveBeenCalledTimes(1);
    }

    mockHttpClientGet.mockRejectedValueOnce(
      new Error('Some other error from httpClient'),
    );

    try {
      await createPersonWithName(newCreatedPerson);
    } catch (error: unknown) {
      const castError: Error = <Error>error;
      expect(castError).toBeDefined();
      expect(castError.message).toStrictEqual(
        'Some other error from httpClient',
      );
      expect(mockHttpClientGet).toHaveBeenCalledTimes(2);
    }
  });
});
