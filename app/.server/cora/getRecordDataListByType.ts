import axios, { AxiosResponse } from 'axios';
import {
  coraApiUrl,
  createHeaders,
  RECORD_LIST_CONTENT_TYPE,
} from '@/.server/cora/helper';

export async function getRecordDataListByType<T>(
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}`);
  const headers = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );
  return axios.get(apiUrl, { headers });
}
