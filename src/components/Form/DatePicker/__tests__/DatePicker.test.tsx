import { test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FormControlLabel } from '@mui/material';
import userEvent from '@testing-library/user-event';
import { DatePicker } from '../DatePicker';

import dayjs from 'dayjs';

/**
 * @vitest-environment jsdom
 */

describe('<DatePicker />', () => {
  test('Renders', () => {
    render(<DatePicker />);
    const button = screen.getByRole('button', { name: 'Choose date' });
    expect(button).toBeInTheDocument();
  });

  test.skip('It handels text inputs', async () => {
    render(<DatePicker />);
    const user = userEvent.setup();
    const dateInput = screen.getByRole('textbox');
    await user.clear(dateInput);
    await user.type(dateInput, '2015');
    waitFor(() => {
      user.type(dateInput, '20151010');
    });
    screen.debug(dateInput);
    /*     await user.type(dateInput, '10');
    await user.type(dateInput, '23');
    expect(dateInput).toHaveValue('2015-10-23'); */
  });

  test('It handels button inputs', async () => {
    const today = dayjs().format('YYYY-MM-DD');
    console.log(today);
    render(<DatePicker />);
    const user = userEvent.setup();
    const dateInput = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Choose date' });
    await user.click(button);
    const todayButton = screen.getAllByRole('button', { name: 'Today' });
    screen.debug(todayButton);
    expect(todayButton).toBeDisabled();
    //await user.click(todayButton);

    //expect(dateInput).toHaveValue(today);
  });
});
