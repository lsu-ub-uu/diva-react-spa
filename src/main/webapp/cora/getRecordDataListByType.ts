import axios, { AxiosResponse } from 'axios';
import {
  coraUrl,
  createHeaders,
  RECORD_LIST_CONTENT_TYPE,
} from '@/cora/helper';

export async function getRecordDataListByType<T>(
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraUrl(`/record/${type}`);
  const headers = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );
  return axios.get(apiUrl, { headers });
}
