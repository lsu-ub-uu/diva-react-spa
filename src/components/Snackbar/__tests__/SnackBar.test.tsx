import { test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider, useSnackbar } from 'notistack';
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
describe('Snackbars', () => {
  test('It renders a snackbars from <Button /> on select', async () => {
    const user = userEvent.setup();
    render(<Button />);
    const button = screen.getByRole('button', {
      name: 'Test Button',
    });
    await user.click(button);
    const snackbar = screen.queryByRole('alert', {
      name: 'was successfully added',
    });
    waitFor(() => {
      expect(snackbar).toBeInTheDocument();
    });
  });

  test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])(
    'It renders %d snack',
    async (snacks) => {
      const user = userEvent.setup();
      render(<Button maxSnack={snacks} />);
      const button = screen.getByRole('button', {
        name: 'Test Button',
      });
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < snacks; i++) {
        // eslint-disable-next-line no-await-in-loop
        await user.click(button);
      }

      const snackbar = screen.queryByRole('alert', {
        name: 'was successfully added',
      });

      waitFor(() => {
        expect(snackbar).toBeCalledTimes(snacks);
      });
    },
  );
});
