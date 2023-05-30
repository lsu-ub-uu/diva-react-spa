import httpClient from '../../utils/http/HttpClient';
import { IHttpClientRequestParameters } from '../../utils/http/IHttpClient';

export const requestAuthTokenOnLogin = async (
  user: string,
  APP_TOKEN_ADMIN: string | undefined,
) => {
  const rootUrl =
    'https://cora.epc.ub.uu.se/diva/apptokenverifier/rest/apptoken/';
  const parameters: IHttpClientRequestParameters = {
    contentType: 'text/plain;charset=UTF-8',
    url: `${rootUrl}${user}`,
    body: APP_TOKEN_ADMIN,
  };
  return httpClient.post(parameters);
};
