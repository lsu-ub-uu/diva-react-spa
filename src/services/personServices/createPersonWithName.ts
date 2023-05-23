import { Person } from '../../types';
import { DataGroup, DataListWrapper } from '../../utils/cora-data/CoraData';
import httpClient from '../../utils/http/HttpClient';
import { IHttpClientRequestParameters } from '../../utils/http/IHttpClient';

export const createPersonWithName = async (
  newPerson: Person,
  authToken?: string,
) => {
  const urlForNewPersonCreation =
    'https://cora.epc.ub.uu.se/diva/rest/record/person/';
  const bodyForNewPersonCreation = composeNewPersonData(newPerson);
  const parameters: IHttpClientRequestParameters = {
    contentType: 'application/vnd.uub.record+json',
    url: urlForNewPersonCreation,
    body: JSON.stringify(bodyForNewPersonCreation),
    authToken,
  };
  return httpClient.post(parameters);
};

const composeNewPersonData = (newPerson: Person) => {
  const givenName: string | any = newPerson.authorisedName?.givenName;
  const familyName: string | any = newPerson.authorisedName?.familyName;
  const personData: DataGroup = {
    name: 'person',
    children: [
      {
        name: 'authorisedName',
        children: [
          {
            name: 'givenName',
            value: givenName,
          },
          {
            name: 'familyName',
            value: familyName,
          },
        ],
      },
      {
        name: 'recordInfo',
        children: [
          {
            name: 'dataDivider',
            value: 'diva',
          },
          {
            name: 'validationType',
            value: 'person',
          },
        ],
      },
    ],
  };
  console.log(JSON.stringify(personData));
  return personData;
};
