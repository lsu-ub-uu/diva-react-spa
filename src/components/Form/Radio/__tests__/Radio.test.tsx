import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormControlLabel } from '@mui/material';
import { Radio } from '../Radio';
import userEvent from '@testing-library/user-event';

/**
 * @vitest-environment jsdom
 */

describe('<Radio />', () => {
  test('Renders', () => {
    render(
      <form>
        <FormControlLabel
          value='female'
          control={<Radio />}
          label='Female'
        />
      </form>,
    );
    const button = screen.getByLabelText('Female');
    expect(button).toBeInTheDocument();
  });
  test('Option gets selected on click', async () => {
    render(
      <form>
        <FormControlLabel
          value='female'
          control={<Radio />}
          label='Female'
        />
      </form>,
    );
    const user = userEvent.setup();
    const radio = screen.getByRole('radio', { name: 'Female' });

    expect(radio).not.toBeChecked();

    await user.click(radio);
    expect(radio).toBeChecked();
  });
});
