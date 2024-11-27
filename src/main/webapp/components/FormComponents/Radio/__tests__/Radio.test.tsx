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

import { render, screen } from '@testing-library/react';
import { FormControlLabel } from '@mui/material';
import userEvent from '@testing-library/user-event';
import { Radio } from '../../../index';

describe('<Radio />', () => {
  it('Renders', () => {
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
  it('Option gets selected on click', async () => {
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
