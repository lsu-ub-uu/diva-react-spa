import { test, expect, vi } from 'vitest';
import { screen, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Login } from '../Login';
import { reduxRender } from '../../../../utils/testUtils';
/**
 * @vitest-environment jsdom
 */

describe('<Login />', () => {
  it('shows the account in a list', async () => {
    const user = userEvent.setup();
    reduxRender(<Login />);
  });
  it('saves to LocalStorage when clickin on an accont', () => {});
  it('deletes from LocalStorage when loggin out', () => {});
});
