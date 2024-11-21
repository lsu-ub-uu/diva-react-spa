import axios, { AxiosResponse } from 'axios';
import { coraUrl, createHeaders, RECORD_CONTENT_TYPE } from '@/cora/helper';

export async function getRecordDataById<T>(
  type: string,
  id: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraUrl(`/record/${type}/${id}`);
  const headers = createHeaders({ Accept: RECORD_CONTENT_TYPE }, authToken);

  return axios.get(apiUrl, { headers });
}
