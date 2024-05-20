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

import { expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Login } from '../Login';
import { reduxRender } from '../../../../../utils/testUtils';

/**
 * @vitest-environment jsdom
 */

vi.spyOn(Storage.prototype, 'setItem');

const loginUnits = [
  {
    loginDescription: 'rkhTestDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/rkh?target=https://www.diva-portal.org/diva-test/idplogin/login',
    type: 'webRedirect',
  },
  {
    loginDescription: 'skhTestDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/uniarts?target=https://www.diva-portal.org/diva-test/idplogin/login',
    type: 'webRedirect',
  },
  {
    loginDescription: 'ltuDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/ltu?target=https://www.diva-portal.org/diva/idplogin/login',
    type: 'webRedirect',
  },
];

describe('<Login/>', () => {
  let mockAxios: MockAdapter;
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    const unitUrl: string = `/auth/loginUnits`;
    mockAxios.onGet(unitUrl).reply(200, loginUnits);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('shows the accounts in a list', async () => {
    const user = userEvent.setup();
    reduxRender(<Login />, {
      preloadedState: {
        loginUnits: {
          loginUnits,
          isLoading: false,
          isError: false,
          message: '',
        },
      },
    });

    const loginButton = screen.getByRole('button', {
      name: 'divaClient_LoginText',
    });
    await user.click(loginButton);

    await waitFor(() => {
      const userNameList = screen.queryAllByRole('menuitem');
      const listItems = userNameList.map((item) => item.textContent);
      expect(listItems).toHaveLength(8);
      expect(listItems).toEqual([
        'DiVAUser',
        'DiVAEverything',
        'AdminSystem',
        'UUdomainAdmin',
        'KTHdomainAdmin',
        'rkhTestDiVALoginUnitText',
        'skhTestDiVALoginUnitText',
        'ltuDiVALoginUnitText',
      ]);
    });
  });

  it.todo('saves to LocalStorage when loggin in', async () => {
    const user = userEvent.setup();
    reduxRender(<Login />);
    const loginButton = screen.getByRole('button', {
      name: 'Log in',
    });
    await user.click(loginButton);
    const userButton = screen.getByRole('menuitem', {
      name: 'divaSystemAdmin',
    });
    await user.click(userButton);
    // const userAvatar = await waitFor(() => screen.getByTestId('PersonIcon'));
    // screen.debug(userAvatar);
    // const avatar = screen.getByAltText('Logout user');
  });
  it.todo('deletes from LocalStorage when loggin out', () => {});
});
