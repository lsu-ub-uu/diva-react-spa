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

import { expect } from 'vitest';
import {
  checkTypeOfUser,
  convertUserIdToShortForm,
  convertWebRedirectToUserSession,
  messageIsFromWindowOpenedFromHere,
  splitSlashFromUrl,
} from '../utils';
import { UserSession } from '../../../../../../features/auth/authSlice';

describe('Login utils', () => {
  it('messageIsFromWindowOpenedFromHere return false on different event url', () => {
    const actual = messageIsFromWindowOpenedFromHere('someUrl', 'someOtherUrl');
    expect(actual).toBe(false);
  });
  it('messageIsFromWindowOpenedFromHere return true on same event url', () => {
    const actual = messageIsFromWindowOpenedFromHere('someUrl', 'someUrl');
    expect(actual).toBe(true);
  });
  it('splitSlashFromUrl removes / when present', () => {
    const actual = splitSlashFromUrl('http://localhost:5173/');
    expect(actual).toBe('http://localhost:5173');
  });
  it('splitSlashFromUrl return url', () => {
    const actual = splitSlashFromUrl('http://localhost:5173');
    expect(actual).toBe('http://localhost:5173');
  });

  it('convertWebRedirectToUserSession converts to UserSession', () => {
    const actual = convertWebRedirectToUserSession({
      userId: 'johdo290@user.uu.se',
      token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      idFromLogin: 'johdo290@user.uu.se',
      validForNoSeconds: '600',
      actionLinks: {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'https://pre.diva-portal.org/login/rest/authToken/user:11111111111111111',
        },
      },
    });
    expect(actual).toStrictEqual({
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // this is the authToken
      validForNoSeconds: '600',
      idFromLogin: 'johdo290@user.uu.se',
    });
  });

  it.each([
    ['johdo290@user.uu.se', 'johdo290'],
    ['joh.do@user.uu.se', 'joh.do'],
    ['joh+do@user.uu.se', 'joh+do'],
  ])('convertUserIdToShortForm converts %s to %s', (email, result) => {
    const actual = convertUserIdToShortForm(email);
    expect(actual).toBe(result);
  });

  it.each([
    [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        validForNoSeconds: '600',
        idFromLogin: 'johdo290@user.uu.se',
      },
      'webRedirect',
    ],
    [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        validForNoSeconds: '600',
        idInUserStorage: 'coraUser:111111111111111',
        idFromLogin: 'coraUser:111111111111111',
        firstName: 'Everything',
        lastName: 'DiVA',
      },
      'appToken',
    ],
  ])('checkTypeOfUser returns correct type of user', (userSession, type) => {
    const acutal = checkTypeOfUser(userSession);
    expect(acutal).toBe(type);
  });
});
