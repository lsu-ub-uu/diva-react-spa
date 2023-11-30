import axios, { AxiosError } from 'axios';
import httpClient from '../HttpClient';
import { IHttpClientRequestParameters } from '../IHttpClient';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  mockedAxios.get.mockResolvedValue({
    data: { someField: 'someDefaultData' }
  });
  mockedAxios.post.mockResolvedValue({
    data: { someField: 'someDefaultData' }
  });
  mockedAxios.delete.mockResolvedValue({
    data: { someField: 'someDefaultData' }
  });
});

describe('The HttpClient', () => {
  describe('the GET method', () => {
    it('should exist and take IHttpClientRequestParameters', () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl',
        authToken: 'someAuthToken'
      };
      httpClient.get(parameters);
    });

    it('should call axios.get with url', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl'
      };

      expect.assertions(4);

      await httpClient.get(parameters);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(parameters.url, {});

      const parameters2: IHttpClientRequestParameters = {
        url: 'someOtherUrl'
      };
      httpClient.get(parameters2);

      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(mockedAxios.get).toHaveBeenCalledWith(parameters2.url, {});
    });

    it('should call axios.get with authToken if authToken set', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl',
        authToken: 'someAuthToken'
      };

      expect.assertions(4);

      await httpClient.get(parameters);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(parameters.url, {
        headers: { authToken: 'someAuthToken' }
      });

      const parameters2: IHttpClientRequestParameters = {
        url: 'someOtherUrl',
        authToken: 'someOtherToken'
      };
      httpClient.get(parameters2);

      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(mockedAxios.get).toHaveBeenCalledWith(parameters2.url, {
        headers: { authToken: 'someOtherToken' }
      });
    });

    it('should reject with error if url is empty', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: ''
      };

      expect.assertions(1);
      try {
        await httpClient.get(parameters);
      } catch (error: unknown) {
        const castError: Error = <Error>error;
        expect(castError.message).toMatch('No URL given.');
      }
    });

    it('should not call axios.get if url is empty', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: ''
      };

      expect.assertions(2);
      try {
        await httpClient.get(parameters);
      } catch (error: unknown) {
        const castError: Error = <Error>error;
        expect(castError.message).toStrictEqual('No URL given.');
        expect(mockedAxios.get).toHaveBeenCalledTimes(0);
      }
    });

    it('should return data from axios if call is successful', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl'
      };
      expect.assertions(1);

      const data = await httpClient.get(parameters);

      expect(data).toStrictEqual({ someField: 'someDefaultData' });
    });

    describe('should handle axios errors', () => {
      it.each([
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [405, 'Method Not Allowed'],
        [406, 'Not Acceptable'],
        [407, 'Proxy Authentication Required'],
        [408, 'Request Timeout'],
        [409, 'Conflict'],
        [410, 'Gone'],
        [411, 'Length Required'],
        [412, 'Precondition Failed'],
        [413, 'Payload Too Large'],
        [414, 'URI Too Long'],
        [415, 'Unsupported Media Type'],
        [416, 'Range Not Satisfiable'],
        [417, 'Expectation Failed'],
        [418, "I'm a teapot"],
        [421, 'Misdirected Request'],
        [422, 'Unprocessable Content'],
        [423, 'Locked'],
        [424, 'Failed Dependency'],
        [425, 'Too Early Experimental'],
        [426, 'Upgrade Required'],
        [428, 'Precondition Required'],
        [429, 'Too Many Requests'],
        [431, 'Request Header Fields Too Large'],
        [451, 'Unavailable For Legal Reasons'],
        [500, 'Internal Server Error'],
        [501, 'Not Implemented'],
        [502, 'Bad Gateway'],
        [503, 'Service Unavailable'],
        [504, 'Gateway Timeout'],
        [505, 'HTTP Version Not Supported'],
        [510, 'Not Extended'],
        [511, 'Network Authentication Required']
      ])(
        'should reject with error code %p if axios throws with response %p',
        async (errorCode, errorMessage) => {
          mockedAxios.get.mockRejectedValueOnce({
            response: {
              data: errorMessage,
              status: errorCode,
              headers: {}
            },
            request: 'XMLHttpRequest',
            message: 'Some general error message'
          });

          const parameters: IHttpClientRequestParameters = {
            url: 'someUrl'
          };

          expect.assertions(1);
          try {
            await httpClient.get(parameters);
          } catch (error: unknown) {
            const axiosError: AxiosError = <AxiosError>error;

            expect(axiosError.message).toEqual(
              `Request returned status code ${errorCode} with message '${errorMessage}'`
            );
          }
        }
      );

      it('should reject with error if axios throws with XMLHttpRequest', async () => {
        mockedAxios.get.mockRejectedValueOnce({
          request: 'XMLHttpRequest',
          message: 'Some general error message'
        });

        const parameters: IHttpClientRequestParameters = {
          url: 'someUrl'
        };

        expect.assertions(2);
        try {
          await httpClient.get(parameters);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual(
            "The request was made to URL 'someUrl' but no response was received."
          );
        }

        mockedAxios.get.mockRejectedValueOnce({
          request: 'XMLHttpRequest',
          message: 'Some general error message'
        });

        const parameters2: IHttpClientRequestParameters = {
          url: 'someOtherUrl'
        };

        try {
          await httpClient.get(parameters2);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual(
            "The request was made to URL 'someOtherUrl' but no response was received."
          );
        }
      });

      it('should reject with error if axios throws general error', async () => {
        mockedAxios.get.mockRejectedValueOnce({
          message: 'Some general error message.'
        });

        const parameters: IHttpClientRequestParameters = {
          url: 'someUrl'
        };

        expect.assertions(1);
        try {
          await httpClient.get(parameters);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual('Some general error message.');
        }
      });
    });
  });
  describe('the POST method', () => {
    it('should exist and take IHttpClientRequestParameters', () => {
      const parameters: IHttpClientRequestParameters = {
        contentType: 'application/vnd.uub.record+json',
        url: 'someUrl',
        authToken: 'someAuthToken'
      };

      httpClient.post(parameters);
    });

    it('should call axios.post with url', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl',
        body: 'someBody',
        contentType: 'application/vnd.uub.record+json',
        authToken: 'someAuthToken'
      };

      expect.assertions(4);

      await httpClient.post(parameters);

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(parameters.url, parameters.body, {
        headers: {
          'Content-Type': 'application/vnd.uub.record+json',
          authToken: 'someAuthToken'
        }
      });
      const parameters2: IHttpClientRequestParameters = {
        url: 'someOtherUrl',
        body: 'someBody',
        contentType: 'application/vnd.uub.record+json',
        authToken: 'someAuthToken'
      };

      await httpClient.post(parameters2);

      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
      expect(mockedAxios.post).toHaveBeenCalledWith(parameters2.url, parameters2.body, {
        headers: {
          'Content-Type': 'application/vnd.uub.record+json',
          authToken: 'someAuthToken'
        }
      });
    });

    it('should call axios.post with authToken if authToken set', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl',
        body: 'someBody',
        contentType: 'application/vnd.uub.record+json',
        authToken: 'someAuthToken'
      };

      expect.assertions(4);

      await httpClient.post(parameters);

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(parameters.url, parameters.body, {
        headers: {
          'Content-Type': 'application/vnd.uub.record+json',
          authToken: 'someAuthToken'
        }
      });

      const parameters2: IHttpClientRequestParameters = {
        url: 'someOtherUrl',
        authToken: 'someOtherToken'
      };
      httpClient.post(parameters2);

      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
      expect(mockedAxios.post).toHaveBeenCalledWith(parameters2.url, parameters2.body, {
        headers: { authToken: 'someOtherToken' }
      });
    });

    it('should reject with error if url is empty', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: ''
      };

      expect.assertions(1);
      try {
        await httpClient.post(parameters);
      } catch (error: unknown) {
        const castError: Error = <Error>error;
        expect(castError.message).toMatch('No URL given.');
      }
    });

    it('should not call axios.post if url is empty', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: ''
      };

      expect.assertions(2);
      try {
        await httpClient.post(parameters);
      } catch (error: unknown) {
        const castError: Error = <Error>error;
        expect(castError.message).toStrictEqual('No URL given.');
        expect(mockedAxios.post).toHaveBeenCalledTimes(0);
      }
    });

    it('should return data from axios if call is successful', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl'
      };
      expect.assertions(1);

      const data = await httpClient.post(parameters);

      expect(data).toStrictEqual({ someField: 'someDefaultData' });
    });

    describe('should handle axios errors', () => {
      it.each([
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [405, 'Method Not Allowed'],
        [406, 'Not Acceptable'],
        [407, 'Proxy Authentication Required'],
        [408, 'Request Timeout'],
        [409, 'Conflict'],
        [410, 'Gone'],
        [411, 'Length Required'],
        [412, 'Precondition Failed'],
        [413, 'Payload Too Large'],
        [414, 'URI Too Long'],
        [415, 'Unsupported Media Type'],
        [416, 'Range Not Satisfiable'],
        [417, 'Expectation Failed'],
        [418, "I'm a teapot"],
        [421, 'Misdirected Request'],
        [422, 'Unprocessable Content'],
        [423, 'Locked'],
        [424, 'Failed Dependency'],
        [425, 'Too Early Experimental'],
        [426, 'Upgrade Required'],
        [428, 'Precondition Required'],
        [429, 'Too Many Requests'],
        [431, 'Request Header Fields Too Large'],
        [451, 'Unavailable For Legal Reasons'],
        [500, 'Internal Server Error'],
        [501, 'Not Implemented'],
        [502, 'Bad Gateway'],
        [503, 'Service Unavailable'],
        [504, 'Gateway Timeout'],
        [505, 'HTTP Version Not Supported'],
        [510, 'Not Extended'],
        [511, 'Network Authentication Required']
      ])(
        'should reject with error code %p if axios throws with response %p',
        async (errorCode, errorMessage) => {
          mockedAxios.post.mockRejectedValueOnce({
            response: {
              data: errorMessage,
              status: errorCode,
              headers: {}
            },
            request: 'XMLHttpRequest',
            message: 'Some general error message'
          });

          const parameters: IHttpClientRequestParameters = {
            url: 'someUrl'
          };

          expect.assertions(1);
          try {
            await httpClient.post(parameters);
          } catch (error: unknown) {
            const axiosError: AxiosError = <AxiosError>error;
            expect(axiosError.message).toStrictEqual(
              `Request returned status code ${errorCode} with message '${errorMessage}'`
            );
          }
        }
      );

      it('should reject with error if axios throws with XMLHttpRequest', async () => {
        mockedAxios.post.mockRejectedValueOnce({
          request: 'XMLHttpRequest',
          message: 'Some general error message'
        });

        const parameters: IHttpClientRequestParameters = {
          url: 'someUrl'
        };

        expect.assertions(2);
        try {
          await httpClient.post(parameters);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual(
            "The request was made to URL 'someUrl' but no response was received."
          );
        }

        mockedAxios.post.mockRejectedValueOnce({
          request: 'XMLHttpRequest',
          message: 'Some general error message'
        });

        const parameters2: IHttpClientRequestParameters = {
          url: 'someOtherUrl'
        };

        try {
          await httpClient.post(parameters2);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual(
            "The request was made to URL 'someOtherUrl' but no response was received."
          );
        }
      });

      it('should reject with error if axios throws general error', async () => {
        mockedAxios.post.mockRejectedValueOnce({
          message: 'Some general error message.'
        });

        const parameters: IHttpClientRequestParameters = {
          url: 'someUrl'
        };

        expect.assertions(1);
        try {
          await httpClient.post(parameters);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual('Some general error message.');
        }
      });
    });
  });
  describe('the DELETE method', () => {
    it('should exist and take IHttpClientRequestParameters', () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl',
        authToken: 'someAuthToken'
      };
      httpClient.delete(parameters);
    });

    it('should call axios.delete with url', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl'
      };

      expect.assertions(4);

      await httpClient.delete(parameters);

      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
      expect(mockedAxios.delete).toHaveBeenCalledWith(parameters.url, {});

      const parameters2: IHttpClientRequestParameters = {
        url: 'someOtherUrl'
      };
      httpClient.delete(parameters2);

      expect(mockedAxios.delete).toHaveBeenCalledTimes(2);
      expect(mockedAxios.delete).toHaveBeenCalledWith(parameters2.url, {});
    });

    it('should call axios.delete with authToken if authToken set', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl',
        authToken: 'someAuthToken'
      };

      expect.assertions(4);

      await httpClient.delete(parameters);

      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
      expect(mockedAxios.delete).toHaveBeenCalledWith(parameters.url, {
        headers: { authToken: 'someAuthToken' }
      });

      const parameters2: IHttpClientRequestParameters = {
        url: 'someOtherUrl',
        authToken: 'someOtherToken'
      };
      httpClient.delete(parameters2);

      expect(mockedAxios.delete).toHaveBeenCalledTimes(2);
      expect(mockedAxios.delete).toHaveBeenCalledWith(parameters2.url, {
        headers: { authToken: 'someOtherToken' }
      });
    });

    it('should reject with error if url is empty', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: ''
      };

      expect.assertions(1);
      try {
        await httpClient.delete(parameters);
      } catch (error: unknown) {
        const castError: Error = <Error>error;
        expect(castError.message).toMatch('No URL given.');
      }
    });

    it('should not call axios.delete if url is empty', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: ''
      };

      expect.assertions(2);
      try {
        await httpClient.delete(parameters);
      } catch (error: unknown) {
        const castError: Error = <Error>error;
        expect(castError.message).toStrictEqual('No URL given.');
        expect(mockedAxios.delete).toHaveBeenCalledTimes(0);
      }
    });

    it('should return data from axios if call is successful', async () => {
      const parameters: IHttpClientRequestParameters = {
        url: 'someUrl'
      };
      expect.assertions(1);

      const data = await httpClient.delete(parameters);

      expect(data).toStrictEqual({ someField: 'someDefaultData' });
    });

    describe('should handle axios errors', () => {
      it.each([
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [405, 'Method Not Allowed'],
        [406, 'Not Acceptable'],
        [407, 'Proxy Authentication Required'],
        [408, 'Request Timeout'],
        [409, 'Conflict'],
        [410, 'Gone'],
        [411, 'Length Required'],
        [412, 'Precondition Failed'],
        [413, 'Payload Too Large'],
        [414, 'URI Too Long'],
        [415, 'Unsupported Media Type'],
        [416, 'Range Not Satisfiable'],
        [417, 'Expectation Failed'],
        [418, "I'm a teapot"],
        [421, 'Misdirected Request'],
        [422, 'Unprocessable Content'],
        [423, 'Locked'],
        [424, 'Failed Dependency'],
        [425, 'Too Early Experimental'],
        [426, 'Upgrade Required'],
        [428, 'Precondition Required'],
        [429, 'Too Many Requests'],
        [431, 'Request Header Fields Too Large'],
        [451, 'Unavailable For Legal Reasons'],
        [500, 'Internal Server Error'],
        [501, 'Not Implemented'],
        [502, 'Bad Gateway'],
        [503, 'Service Unavailable'],
        [504, 'Gateway Timeout'],
        [505, 'HTTP Version Not Supported'],
        [510, 'Not Extended'],
        [511, 'Network Authentication Required']
      ])(
        'should reject with error code %p if axios throws with response %p',
        async (errorCode, errorMessage) => {
          mockedAxios.delete.mockRejectedValueOnce({
            response: {
              data: errorMessage,
              status: errorCode,
              headers: {}
            },
            request: 'XMLHttpRequest',
            message: 'Some general error message'
          });

          const parameters: IHttpClientRequestParameters = {
            url: 'someUrl'
          };

          expect.assertions(1);
          try {
            await httpClient.delete(parameters);
          } catch (error: unknown) {
            const axiosError: AxiosError = <AxiosError>error;

            expect(axiosError.message).toEqual(
              `Request returned status code ${errorCode} with message '${errorMessage}'`
            );
          }
        }
      );

      it('should reject with error if axios throws with XMLHttpRequest', async () => {
        mockedAxios.delete.mockRejectedValueOnce({
          request: 'XMLHttpRequest',
          message: 'Some general error message'
        });

        const parameters: IHttpClientRequestParameters = {
          url: 'someUrl'
        };

        expect.assertions(2);
        try {
          await httpClient.delete(parameters);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual(
            "The request was made to URL 'someUrl' but no response was received."
          );
        }

        mockedAxios.delete.mockRejectedValueOnce({
          request: 'XMLHttpRequest',
          message: 'Some general error message'
        });

        const parameters2: IHttpClientRequestParameters = {
          url: 'someOtherUrl'
        };

        try {
          await httpClient.delete(parameters2);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual(
            "The request was made to URL 'someOtherUrl' but no response was received."
          );
        }
      });

      it('should reject with error if axios throws general error', async () => {
        mockedAxios.delete.mockRejectedValueOnce({
          message: 'Some general error message.'
        });

        const parameters: IHttpClientRequestParameters = {
          url: 'someUrl'
        };

        expect.assertions(1);
        try {
          await httpClient.delete(parameters);
        } catch (error: unknown) {
          const castError: Error = <Error>error;
          expect(castError.message).toStrictEqual('Some general error message.');
        }
      });
    });
  });
});
