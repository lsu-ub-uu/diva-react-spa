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

import { Auth } from '@/types/Auth';
import axios from 'axios';
import { extractDataFromResult } from '../../../../bff/src/main/webapp/cora/auth';
import { coraUrl } from '@/cora/helper';

export async function requestAuthTokenOnLogin(
  user: string,
  authToken: string | undefined,
  loginType: 'apptoken' | 'password',
): Promise<Auth> {
  const url = coraUrl(`/${loginType}`);

  const headers = {
    'Content-Type': 'application/vnd.uub.login',
  };
  const body = `${user}\n${authToken}`;
  const response = await axios.post(url, body, { headers });
  return extractDataFromResult(response.data);
}
