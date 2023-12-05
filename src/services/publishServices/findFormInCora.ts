import article from '../../__mocks__/form/article.json';
import httpClient from '../../utils/http/HttpClient';
import { IHttpClientRequestParameters } from '../../utils/http/IHttpClient';
import { List } from '../../types/List';
import { DataListWrapper } from '../../utils/cora-data/CoraData';

export const findFormInCora = (validationType: string, authToken?: string) => {
  return article;
};

// export const findNewFormInCora = (
//   validationType: string,
//   authToken?: string,
// ) => {
//   return 'Newarticle';
// };

export const findNewFormInCora = async (validationType: string, authToken?: string) => {
  const urlForNewForm = `https://cora.epc.ub.uu.se/diva/rest/record/metadata/${validationType}NewGroup`;
  const parameters: IHttpClientRequestParameters = {
    url: urlForNewForm,
    authToken
  };
  const returnedForm: any = await httpClient.get(parameters);
  // console.log('get', returnedForm.record.data);
  composeReturnData(returnedForm.record.data);
  return returnedForm;
};
const composeReturnData = (data: any) => {
  console.log('get', data);
};
