import { DataListWrapper } from '../../cora-data/CoraData';
import httpClient from '../../http/HttpClient';
import { IHttpClientRequestParameters } from '../../http/IHttpClient';

export const findMetadataInCora = async () => {
  const collectedMetadata: any = [];
  const urlForNewForm = 'https://cora.epc.ub.uu.se/diva/rest/record/metadata/';
  const parameters: IHttpClientRequestParameters = {
    url: urlForNewForm,
  };
  const returnedMetadata = await httpClient.get<DataListWrapper>(parameters);
  const { data } = returnedMetadata.dataList;
  // console.log(data);
  data.forEach((dataItem: any, i: number) => {
    // console.log('data', dataItem.record.data.children);
    const child = dataItem.record.data.children;
    const recordInfo = dataItem.record.data.children[0].children;
    const extraData = dataItem.record.data.children[1];
    // console.log('aaa', child);
    if ('name' in recordInfo[0] && 'value' in recordInfo[0]) {
      collectedMetadata.push({ name: recordInfo[0].value });
    }
    console.log('extraData', 'name' in extraData);

    // if ('name' in extraData[2]) {
    //   console.log('extraData', extraData);
    // }
  });
  // console.log('cM', collectedMetadata);
  return returnedMetadata;
};
