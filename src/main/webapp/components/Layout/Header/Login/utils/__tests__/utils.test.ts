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
  printUserNameOnPage,
  splitBasenameFromUrl,
  splitSlashFromUrl,
} from '../utils';
import { Auth } from '@/features/auth/authSlice';

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
  describe('splitBasenameFromUrl', () => {
    it('splitBasenameFromUrl returns url with removed basename', () => {
      const actual = splitBasenameFromUrl(
        'http://localhost:9876/divaclient/',
        'divaclient',
      );
      expect(actual).toEqual('http://localhost:9876/');
    });

    it('splitBasenameFromUrl returns url with removed basename without /', () => {
      const actual = splitBasenameFromUrl(
        'http://localhost:9876/divaclient',
        'divaclient',
      );
      expect(actual).toEqual('http://localhost:9876/');
    });

    it('splitBasenameFromUrl returns epc url without basename', () => {
      const actual = splitBasenameFromUrl(
        'https://cora.epc.ub.uu.se/divaclient/',
        'divaclient',
      );
      expect(actual).toEqual('https://cora.epc.ub.uu.se/');
    });

    it('splitBasenameFromUrl returns epc url with removed basename without /', () => {
      const actual = splitBasenameFromUrl(
        'https://cora.epc.ub.uu.se/divaclient',
        'divaclient',
      );
      expect(actual).toEqual('https://cora.epc.ub.uu.se/');
    });

    it('splitBasenameFromUrl returns epc url with manuscript with removed basename without /', () => {
      const actual = splitBasenameFromUrl(
        'https://cora.epc.ub.uu.se/divaclient/create/record/thesisManuscript',
        'divaclient',
      );
      expect(actual).toEqual('https://cora.epc.ub.uu.se/');
    });
  });

  it('convertWebRedirectToUserSession converts to UserSession', () => {
    const expected: Auth = {
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // this is the authToken
        validForNoSeconds: '600',
        loginId: 'johdo290@user.uu.se',
        idInUserStorage: 'coraUser:111111111111111',
      },
      actionLinks: {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'https://pre.diva-portal.org/login/rest/authToken/user:11111111111111111',
        },
      },
    };

    const actual = convertWebRedirectToUserSession({
      token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      loginId: 'johdo290@user.uu.se',
      actionLinks: {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'https://pre.diva-portal.org/login/rest/authToken/user:11111111111111111',
        },
      },
    });
    expect(actual).toStrictEqual(expected);
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
        data: {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          validForNoSeconds: '600',
          loginId: 'johdo290@user.uu.se',
        },
      },
      'webRedirect',
    ],
    [
      {
        data: {
          token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          validForNoSeconds: '600',
          idInUserStorage: 'coraUser:111111111111111',
          loginId: 'coraUser:111111111111111',
          firstName: 'Everything',
          lastName: 'DiVA',
        },
      },
      'appToken',
    ],
  ])('checkTypeOfUser returns correct type of user', (userSession, type) => {
    const acutal = checkTypeOfUser(userSession);
    expect(acutal).toBe(type);
  });

  it.each([
    [
      {
        data: {
          token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          validForNoSeconds: '600',
          idInUserStorage: 'coraUser:111111111111111',
          loginId: 'coraUser:111111111111111',
          firstName: 'Everything',
          lastName: 'DiVA',
        },
      },
      'Everything DiVA',
    ],
    [
      {
        data: {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          validForNoSeconds: '600',
          loginId: 'johdo290@user.uu.se',
        },
      },
      'johdo290',
    ],
  ])('printUserNameOnPage', (user, name) => {
    const actual = printUserNameOnPage(user);
    expect(actual).toBe(name);
  });
});
