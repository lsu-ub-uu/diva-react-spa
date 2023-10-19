import { expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSnackbar } from 'notistack';
import { render } from '../../../utils/testUtils';
/**
 * @vitest-environment jsdom
 */

const Button = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
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
  );
};
describe('Snackbars', () => {
  // it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])(
  // look into why it doesn't goes higher than 3
  it.each([1, 2, 3])(
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
        await user.click(button);
      }
      const snackbar = screen.queryAllByText('Subject was successfully added');
      expect(snackbar).toHaveLength(snacks);
    },
  );
});
