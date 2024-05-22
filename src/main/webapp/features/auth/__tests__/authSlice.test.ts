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
 */

import { vi } from 'vitest';
import {
  writeState,
  deleteState,
  createInitialState,
  UserSession,
} from '../authSlice';

/**
 * @vitest-environment jsdom
 */
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  localStorage.clear();
});
describe('authSlice', () => {
  it('writeState writes to localStorage', () => {
    const userSession: UserSession = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      idFromLogin: 'coraUser:111111111111111',
      firstName: 'Everything',
      lastName: 'DiVA',
    };

    expect.assertions(2);

    writeState(userSession);
    expect(setItemSpy).toHaveBeenCalledWith(
      'diva_session',
      JSON.stringify(userSession),
    );
    const getLocalStorage = localStorage.getItem('diva_session');
    expect(getLocalStorage).toEqual(JSON.stringify(userSession));
  });

  it('deleteState deletes to localStorage', () => {
    const userSession: UserSession = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      idFromLogin: 'coraUser:111111111111111',
      firstName: 'Everything',
      lastName: 'DiVA',
    };

    localStorage.setItem('diva_session', JSON.stringify(userSession));
    deleteState();
    const getLocalStorage = localStorage.getItem('diva_session');
    expect(getLocalStorage).toStrictEqual(null);
  });

  it('createInitialState creates state with name from localStorage for authToken', () => {
    const userSession: UserSession = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      idFromLogin: 'coraUser:111111111111111',
      firstName: 'Everything',
      lastName: 'DiVA',
    };

    localStorage.setItem('diva_session', JSON.stringify(userSession));

    expect(createInitialState()).toStrictEqual(userSession);
  });

  it('createInitialState creates state with name from localStorage for webRedirect', () => {
    const userSession: UserSession = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idFromLogin: 'coraUser:111111111111111',
    };

    localStorage.setItem('diva_session', JSON.stringify(userSession));

    expect(createInitialState()).toStrictEqual(userSession);
  });
  describe('createInitialState', () => {
    it('createInitialState returns null from localStorage from undefined', () => {
      // @ts-ignore
      localStorage.setItem('diva_session', undefined);
      expect(createInitialState()).toStrictEqual(null);
    });

    it('createInitialState returns null from localStorage from null', () => {
      // @ts-ignore
      localStorage.setItem('diva_session', null);
      expect(createInitialState()).toStrictEqual(null);
    });

    it('createInitialState returns null from localStorage from {}', () => {
      // @ts-ignore
      localStorage.setItem('diva_session', {});
      expect(createInitialState()).toStrictEqual(null);
    });
  });
});
