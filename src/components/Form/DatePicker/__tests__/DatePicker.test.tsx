import { test } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { DatePicker } from '../DatePicker';
import { DoDisturb } from '@mui/icons-material';

/**
 * @vitest-environment jsdom
 */

describe('<DatePicker />', () => {
  test('Renders', () => {
    render(<DatePicker />);
    const button = screen.getByRole('button', { name: 'Choose date' });
    expect(button).toBeInTheDocument();
  });

  test('It handels text inputs', async () => {
    render(<DatePicker />);
    const user = userEvent.setup();
    const dateInput = screen.getByRole('textbox');

    await user.type(dateInput, '2023-10-10');
    //expect(dateInput).toHaveValue('2023-10-10');
    expect(dateInput).toBeValid();
  });

  test.skip('It handels button inputs', async () => {
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
