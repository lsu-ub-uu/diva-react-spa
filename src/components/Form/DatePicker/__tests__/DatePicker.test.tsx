import { test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
  test.each([
    '2006-09-21',
    '2006-10-09',
    '2008-01-22',
    '2008-02-22',
    '2008-03-25',
    '2008-08-27',
    '2010-11-26',
    '2012-01-19',
    '2012-02-07',
    '2013-03-04',
    '2013-08-16',
    '2014-04-07',
    '2014-05-30',
    '2014-09-25',
    '2014-11-28',
    '2020-07-29',
    '2021-03-19',
    '2021-11-19',
    '2023-01-12',
    '2023-11-01',
  ])('It handels input: %s', async (year) => {
    render(<DatePicker />);
    const user = userEvent.setup();
    const dateInput = screen.getByRole('textbox');

    await user.type(dateInput, year);

    expect(dateInput).toBeValid();
  });

  test.only('Today button click gives todays date', async () => {
    const today = dayjs().format('YYYY-MM-DD');
    render(<DatePicker />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Choose date' });
    await user.click(button);
    const todayButton = screen.getByRole('button', { name: 'Today' });
    user.click(todayButton);
    const dateInput = screen.getByRole('textbox');
    waitFor(() => {
      expect(dateInput).toHaveValue(today.toString());
    });
  });
});
