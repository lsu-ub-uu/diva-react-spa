import { expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from '../Login';
import { reduxRender } from '../../../../utils/testUtils';
/**
 * @vitest-environment jsdom
 */

vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  localStorage.clear();
});

describe('<Login />', () => {
  it('shows the account in a list', async () => {
    const user = userEvent.setup();
    reduxRender(<Login />);
    const loginButton = screen.getByRole('button', { name: 'Log in' });
    await user.click(loginButton);
    const userNameList = screen.getAllByRole('menuitem');
    // screen.debug(userNameList);
    const listItems = userNameList.map((item) => item.textContent);

    expect.assertions(2);
    expect(listItems).toHaveLength(4);
    expect(listItems).toEqual([
      'divaEverythingDiVA',
      'divaSystemAdmin',
      'divadomainAdminUU',
      'divadomainAdminKTH',
    ]);
  });
  it.todo('saves to LocalStorage when loggin in', async () => {
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
  it.todo('deletes from LocalStorage when loggin out', () => {});
});
