import { expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from '../Login';
import { reduxRender } from '../../../../utils/testUtils';
/**
 * @vitest-environment jsdom
 */

const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  localStorage.clear();
});

describe('<Login />', () => {
  it.skip('shows the account in a list', async () => {
    const user = userEvent.setup();
    reduxRender(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Log in' });
    await user.click(loginButton);
    const userNameList = screen.getAllByRole('menuitem');
    // screen.debug(userNameList);
    const listItems = userNameList.map((item) => item.textContent);

    expect.assertions(2);
    expect(listItems).toHaveLength(3);
    expect(listItems).toEqual([
      'divaSystemAdmin',
      'divadomainAdminUU',
      'divadomainAdminKTH',
    ]);
  });
  it.failing('saves to LocalStorage when loggin in', async () => {
    const user = userEvent.setup();
    reduxRender(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Log in' });
    await user.click(loginButton);
    const userButton = screen.getByRole('menuitem', {
      name: 'divaSystemAdmin',
    });
    await user.click(userButton);
    // const userAvatar = await waitFor(() => screen.getByTestId('PersonIcon'));
    // screen.debug(userAvatar);
    // const avatar = screen.getByAltText('Logout user');
  });
  it.skip('deletes from LocalStorage when loggin out', () => {});
});
