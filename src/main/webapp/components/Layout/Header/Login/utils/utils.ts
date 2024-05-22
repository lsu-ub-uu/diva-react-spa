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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { UserSession } from '../../../../../features/auth/authSlice';

export const messageIsFromWindowOpenedFromHere = (
  originUrl: string,
  eventUrl: string,
): boolean => {
  return originUrl === eventUrl;
};

export const splitSlashFromUrl = (url: string) => {
  const lastCharacter = url.slice(-1);
  if (lastCharacter === '/') {
    return url.substring(0, url.length - 1);
  }
  return url;
};

export const convertWebRedirectToUserSession = (coraUser: any): UserSession => {
  const id = coraUser.token;
  const { validForNoSeconds, idFromLogin } = coraUser;

  return { id, validForNoSeconds, idFromLogin };
};
