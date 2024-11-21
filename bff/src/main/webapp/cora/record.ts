/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios, { AxiosResponse } from 'axios';
import { DataGroup } from '@/cora/cora-data/CoraData';
import * as console from 'node:console';

const RECORD_LIST_CONTENT_TYPE = 'application/vnd.uub.recordList+json';
const RECORD_CONTENT_TYPE = 'application/vnd.uub.record+json';

const createHeaders = (
  init: Record<string, string>,
  authToken?: string,
): Record<string, string> => {
  const headers = init;

  if (authToken) {
    headers.Authtoken = authToken;
  }

  return headers;
};

export async function getRecordDataListByType<T>(
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}`;
  const headers = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );
  return axios.get(apiUrl, { headers });
}

export async function getSearchResultDataListBySearchType<T>(
  searchType: string,
  searchData: DataGroup,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  console.log(searchType);
  const apiUrl: string = `/record/searchResult/${searchType}`;

  const searchDataString = JSON.stringify(searchData);
  const finalUrl = encodeURI(`${apiUrl}?searchData=${searchDataString}`);

  const headers = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );

  return axios.get(finalUrl, { headers });
}

export async function getRecordDataById<T>(
  type: string,
  id: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}/${id}`;
  const headers = createHeaders({ Accept: RECORD_CONTENT_TYPE }, authToken);

  return axios.get(apiUrl, { headers });
}

export async function postRecordData<T>(
  payload: DataGroup,
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const { CORA_API_URL } = process.env;
  const apiUrl: string = `${CORA_API_URL}/record/${type}`;

  const headers = createHeaders(
    { Accept: RECORD_CONTENT_TYPE, 'Content-Type': RECORD_CONTENT_TYPE },
    authToken,
  );

  return axios.post(apiUrl, payload, { headers });
}

export async function updateRecordDataById<T>(
  recordId: string,
  payload: DataGroup,
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}/${recordId}`;
  const headers = createHeaders(
    { Accept: RECORD_CONTENT_TYPE, 'Content-Type': RECORD_CONTENT_TYPE },
    authToken,
  );
  return axios.post(apiUrl, payload, { headers });
}

export async function deleteRecordDataById<T>(
  recordId: string,
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}/${recordId}`;
  const headers = createHeaders({}, authToken);

  return axios.delete(apiUrl, { headers });
}
