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

import axios from 'axios';
import { Auth } from '../types/Auth';
import { ActionLinks, CoraRecord } from '../utils/cora-data/CoraData';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import assertExists from '../utils/assertExists';

export async function requestAuthTokenOnLogin(
  user: string,
  authToken: string | undefined,
  loginType: 'apptoken' | 'password'
): Promise<Auth> {
  const { CORA_LOGIN_URL } = process.env;
  const url = `${CORA_LOGIN_URL}/${loginType}`;

  const headers = {
    'Content-Type': 'application/vnd.uub.login'
  };
  const body = `${user}\n${authToken}`;
  const response = await axios.post(url, body, { headers });
  return extractDataFromResult(response.data);
}

export const extractDataFromResult = (record: CoraRecord): Auth => {
  const dataGroup = record.data;
  const token = getFirstDataAtomicValueWithNameInData(dataGroup, 'token');
  const validForNoSeconds = getFirstDataAtomicValueWithNameInData(dataGroup, 'validForNoSeconds');
  const idInUserStorage = getFirstDataAtomicValueWithNameInData(dataGroup, 'idInUserStorage');
  const loginId = getFirstDataAtomicValueWithNameInData(dataGroup, 'loginId');
  const firstName = getFirstDataAtomicValueWithNameInData(dataGroup, 'firstName');
  const lastName = getFirstDataAtomicValueWithNameInData(dataGroup, 'lastName');

  assertExists(record.actionLinks);

  return {
    data: {
      token,
      validForNoSeconds,
      idInUserStorage,
      loginId,
      firstName,
      lastName
    },
    actionLinks: record.actionLinks
  };
};

export const deleteAuthTokenFromCora = async (
  actionLinks: ActionLinks,
  authToken: string | undefined
) => {
  const url = actionLinks.delete;
  if (url === undefined) {
    throw new Error('Missing actionLink URL');
  }

  const headers = {
    Authtoken: authToken
  };
  return axios.request({
    method: actionLinks.delete?.requestMethod,
    url: actionLinks.delete?.url,
    headers
  });
};
