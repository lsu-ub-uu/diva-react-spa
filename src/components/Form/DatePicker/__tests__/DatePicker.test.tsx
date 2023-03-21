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

  test.each([
    '1621-08-04',
    '1623-06-06',
    '1636-02-05',
    '1648-10-12',
    '1695-06-10',
    '1710-05-06',
    '1722-09-18',
    '1723-12-21',
    '1726-09-26',
    '1781-04-13',
    '1795-12-10',
    '1804-11-20',
    '1809-04-19',
    '1812-04-09',
    '1854-06-22',
    '1861-06-14',
    '1864-07-07',
    '1872-01-17',
    '1876-08-22',
    '1882-12-25',
  ])('It shows errors on too early dates: %s', async (a) => {
    render(<DatePicker />);
    const user = userEvent.setup();
    const dateInput = screen.queryByRole('textbox');

    await user.type(dateInput, a);

    expect(dateInput).toBeInvalid();
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
  ])('It handels input: %s', async (a) => {
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
