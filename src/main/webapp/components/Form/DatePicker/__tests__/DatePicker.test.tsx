/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { DatePicker } from '../DatePicker';

/**
 * @vitest-environment jsdom
 */

describe('<DatePicker />', () => {
  it('Renders', () => {
    render(
      <DatePicker
        onChange={vi.fn()}
        value={dayjs()}
      />,
    );
    const button = screen.getByRole('button');
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
    render(
      <DatePicker
        onChange={vi.fn()}
        value={dayjs()}
      />,
    );
    const user = userEvent.setup();
    const dateInput = screen.getByRole('textbox');

    await user.type(dateInput, year);

    expect(dateInput).toBeValid();
  });
});
