import { test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { Provider as StateProvider } from 'react-redux';
import store from '../app/store';
import { SubjectCategoryPicker } from '../components';
/**
 * @vitest-environment jsdom
 */
const StateAndSnackbarProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <StateProvider store={store}>
      <SnackbarProvider maxSnack={5}>{children}</SnackbarProvider>
    </StateProvider>
  );
};
describe('Snackbars', () => {
  test('It renders a snackbars from <SubjectCategoryPicker /> on select', async () => {
    const user = userEvent.setup();
    render(<SubjectCategoryPicker />, { wrapper: StateAndSnackbarProviders });
    const button = screen.queryByRole('button', {
      name: 'Add national subject category',
    });
    await waitFor(() => screen.debug());
    // await waitFor(() => expect(button).toBeInTheDocument());
  });
});
