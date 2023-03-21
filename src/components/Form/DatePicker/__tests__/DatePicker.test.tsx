import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { DatePicker } from '../DatePicker';

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

    expect(dateInput).toBeValid();
  });
  test.each([
    '2023-10-10',
    '2023-04-11',
    '2023-04-12',
    '2023-04-17',
    '2023-04-25',
    '2023-06-05',
    '2023-06-27',
    '2023-07-26',
    '2023-09-13',
    '2023-10-04',
  ])('It handels inputs %s', async (a) => {
    render(<DatePicker />);
    const user = userEvent.setup();
    const dateInput = screen.getByRole('textbox');

    await user.type(dateInput, a);

    expect(dateInput).toBeValid();
  });

  test('Today button click gives todays date', async () => {
    const today = dayjs().format('YYYY-MM-DD');
    render(<DatePicker />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Choose date' });
    await user.click(button);
    const todayButton = screen.getByRole('button', { name: 'Today' });
    await user.click(todayButton);

    const dateInput = screen.getByRole('textbox');
    await user.type(dateInput, today);
  });
  test('Picking a date gives that date', async () => {
    /* const today = dayjs().format('YYYY-MM-DD');
    render(<DatePicker />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Choose date' });
    await user.click(button);
    const todayButton = screen.getByRole('button', { name: 'Today' });
    await user.click(todayButton);

    const dateInput = screen.getByRole('textbox');
    await user.type(dateInput, today); */
  });
});
