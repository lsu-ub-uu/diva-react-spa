import { Binary } from '../../types';
import { DataGroup, DataListWrapper } from '../../utils/cora-data/CoraData';
import httpClient from '../../utils/http/HttpClient';
import { IHttpClientRequestParameters } from '../../utils/http/IHttpClient';

export const createImageBinary = async (newBinary: Binary, authToken?: string) => {
  const urlForNewPersonCreation = 'https://cora.epc.ub.uu.se/diva/rest/record/binary/';
  const bodyForNewPersonCreation = composeNewBinaryData(newBinary);
  const parameters: IHttpClientRequestParameters = {
    contentType: 'application/vnd.uub.record+json',
    url: urlForNewPersonCreation,
    body: JSON.stringify(bodyForNewPersonCreation),
    authToken
  };
  return httpClient.post(parameters);
};

const composeNewBinaryData = (newBinary: Binary) => {
  const binaryData: DataGroup = {
    name: 'binary',
    attributes: {
      type: 'genericBinary'
    },
    children: [
      {
        name: 'recordInfo',
        children: [
          {
            name: 'dataDivider',
            children: [
              {
                name: 'linkedRecordType',
                value: 'system'
              },
              {
                name: 'linkedRecordId',
                value: 'diva'
              }
            ]
          },
          {
            name: 'validationType',
            children: [
              {
                name: 'linkedRecordType',
                value: 'validationType'
              },
              {
                name: 'linkedRecordId',
                value: 'genericBinary'
              }
            ]
          }
        ]
      }
    ]
  };
  return binaryData;
};
