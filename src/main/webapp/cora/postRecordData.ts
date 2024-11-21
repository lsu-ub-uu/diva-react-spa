/*
 * Copyright 2024 Uppsala University Library
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
 */

import { DataGroup } from '@/cora/cora-data/CoraData';
import axios, { AxiosResponse } from 'axios';
import { coraUrl, createHeaders, RECORD_CONTENT_TYPE } from '@/cora/helper';

export async function postRecordData<T>(
  payload: DataGroup,
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl = coraUrl(`/record/${type}`);

  const headers = createHeaders(
    { Accept: RECORD_CONTENT_TYPE, 'Content-Type': RECORD_CONTENT_TYPE },
    authToken,
  );

  return axios.post(apiUrl, payload, { headers });
}
