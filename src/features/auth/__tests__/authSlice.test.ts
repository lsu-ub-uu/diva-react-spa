import { vi } from 'vitest';
import { writeState, deleteState, createInitialState } from '../authSlice';

/**
 * @vitest-environment jsdom
 */
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  localStorage.clear();
});
describe('authSlice', () => {
  it('writeState writes to localStorage', () => {
    const userSession = {
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
    const userSession = {
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
  it('createInitialState creates state with name from localStorage', () => {
    const userSession = {
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
  it('createInitialState returns null from localStorage', () => {
    expect(createInitialState()).toStrictEqual(null);
  });
});
