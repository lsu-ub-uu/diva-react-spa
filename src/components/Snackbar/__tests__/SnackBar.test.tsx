import { test, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { render } from '../../../utils/testUtils';
/**
 * @vitest-environment jsdom
 */

const Button = ({ maxSnack }: { maxSnack?: number }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <SnackbarProvider maxSnack={maxSnack ?? 5}>
      <button
        type='button'
        onClick={() =>
          enqueueSnackbar(`Subject was successfully added`, {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          })
        }
      >
        Test Button
      </button>
    </SnackbarProvider>
  );
};
describe.skip('Snackbars', () => {
  it.skip('It renders a snackbars from <Button /> on select', async () => {
    const user = userEvent.setup();
    render(<Button />);
    const button = screen.getByRole('button', {
      name: 'Test Button',
    });
    await user.click(button);
    const snackbar = screen.queryByText('Subject was successfully added');

    expect(snackbar).toBeInTheDocument();
  });
  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])(
    'It renders %d snackbars from <Button /> on select',
    async (snacks) => {
      const user = userEvent.setup();
      render(<Button />);
      const button = screen.getByRole('button', {
        name: 'Test Button',
      });
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < snacks; i++) {
        // eslint-disable-next-line no-await-in-loop
        console.log('s', snacks);
        await user.click(button);
      }
      const snackbar = screen.queryAllByText('Subject was successfully added');
      const number = '%d';
      console.log(snacks);
      expect(snackbar).toHaveLength(snacks);
    },
  );
});
