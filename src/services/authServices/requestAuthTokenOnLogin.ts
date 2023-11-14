import { Auth } from '../../types/Auth';
import { AuthToken } from '../../utils/cora-data/CoraData';
import httpClient from '../../utils/http/HttpClient';
import { IHttpClientRequestParameters } from '../../utils/http/IHttpClient';

export const requestAuthTokenOnLogin = async (
  user: string,
  APP_TOKEN_ADMIN: string | undefined,
): Promise<Auth> => {
  return new Promise((resolve, reject) => {
    if (user === '' && user === undefined) {
      Error('No userId was passed to requestAuthTokenOnLogin');
    } else if (APP_TOKEN_ADMIN === '' || APP_TOKEN_ADMIN === undefined) {
      Error('No appToken was passed to requestAuthTokenOnLogin');
    }
    const rootUrl =
      'https://cora.epc.ub.uu.se/diva/apptokenverifier/rest/apptoken/';
    const parameters: IHttpClientRequestParameters = {
      contentType: 'text/plain;charset=UTF-8',
      url: `${rootUrl}${user}`,
      body: APP_TOKEN_ADMIN,
    };
    httpClient
      .post<AuthToken>(parameters)
      .then((authToken) => {
        const token = extractDataFromResult(authToken);
        resolve(token);
      })
      .catch((error: unknown) => {
        reject(error);
      });
  });
};

const extractDataFromResult = (newAuthToken: AuthToken) => {
  let id = '';
  let validForNoSeconds = '';
  let idInUserStorage = '';
  let idFromLogin = '';
  let firstName = '';
  let lastName = '';

  try {
    newAuthToken.data?.children.forEach((child) => {
      if (child.name === 'id') {
        id = Object.values(child)[1];
      }
      if (child.name === 'validForNoSeconds') {
        validForNoSeconds = Object.values(child)[1];
      }
      if (child.name === 'idInUserStorage') {
        idInUserStorage = Object.values(child)[1];
      }
      if (child.name === 'idFromLogin') {
        idFromLogin = Object.values(child)[1];
      }
      if (child.name === 'firstName') {
        firstName = Object.values(child)[1];
      }
      if (child.name === 'lastName') {
        lastName = Object.values(child)[1];
      }
    });
  } catch (error) {
    console.log(error);
  }

  const auth = new Auth(
    id,
    validForNoSeconds,
    idInUserStorage,
    idFromLogin,
    firstName,
    lastName,
  );
  return auth;
};
