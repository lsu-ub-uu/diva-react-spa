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
import { DataGroup } from '../utils/cora-data/CoraData';

const RECORD_LIST_CONTENT_TYPE = 'application/vnd.uub.recordList+json';
const RECORD_CONTENT_TYPE = 'application/vnd.uub.record+json';
export async function getRecordDataListByType<T>(
  type: string,
  authToken: string
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}`;
  const headers = {
    Authtoken: `${authToken}`,
    'Content-Type': RECORD_LIST_CONTENT_TYPE,
    Accept: RECORD_LIST_CONTENT_TYPE
  };
  console.log({ headers });
  const response: AxiosResponse<T> = await axios.get(apiUrl, { headers });
  return response;
}

export async function getSearchResultDataListBySearchType<T>(
  searchType: string,
  searchData: DataGroup,
  authToken?: string
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/searchResult/${searchType}`;

  const searchDataString = JSON.stringify(searchData);
  const finalUrl = encodeURI(`${apiUrl}?searchData=${searchDataString}`);

  const headers = {
    Authtoken: `${authToken}`,
    Accept: RECORD_LIST_CONTENT_TYPE
  };

  const response: AxiosResponse<T> = await axios.get(finalUrl, { headers });
  return response;
}

export async function getRecordDataById<T>(
  type: string,
  id: string,
  authToken: string
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}/${id}`;
  const headers = {
    Accept: RECORD_CONTENT_TYPE,
    'Content-Type': RECORD_CONTENT_TYPE,
    Authtoken: `${authToken}`
  };
  const response: AxiosResponse<T> = await axios.get(apiUrl, { headers });
  return response;
}

export async function postRecordData<T>(
  payload: DataGroup,
  type: string,
  authToken: string
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}`;
  const headers = {
    Accept: RECORD_CONTENT_TYPE,
    'Content-Type': RECORD_CONTENT_TYPE,
    Authtoken: `${authToken}`
  };
  const response: AxiosResponse<T> = await axios.post(apiUrl, payload, { headers });
  return response;
}

export async function updateRecordDataById<T>(
  recordId: string,
  payload: DataGroup,
  type: string,
  authToken: string
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}/${recordId}`;
  const headers = {
    Accept: RECORD_CONTENT_TYPE,
    'Content-Type': RECORD_CONTENT_TYPE,
    Authtoken: `${authToken}`
  };
  const response: AxiosResponse<T> = await axios.post(apiUrl, payload, { headers });
  return response;
}

export async function deleteRecordDataById<T>(
  recordId: string,
  type: string,
  authToken: string
): Promise<AxiosResponse<T>> {
  const apiUrl: string = `/record/${type}/${recordId}`;
  const headers = {
    Accept: RECORD_CONTENT_TYPE,
    'Content-Type': RECORD_CONTENT_TYPE,
    Authtoken: `${authToken}`
  };

  const response: AxiosResponse<T> = await axios.delete(apiUrl, { headers });
  return response;
}
