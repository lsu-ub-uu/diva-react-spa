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
import { useForm } from 'react-hook-form';
import { ControlledDateTimePicker } from '@/components/Controlled';

/**
 * @vitest-environment jsdom
 */

export const DummyForm = (): JSX.Element => {
  const methods = useForm({
    defaultValues: { dateTimeField: new Date('1995-12-17T03:24:00') },
  });

  return (
    <ControlledDateTimePicker
      name='dateTimeField'
      label='Select Date time'
      control={methods.control}
    />
  );
};

describe('<ControlledDateTimePicker />', () => {
  it('renders component and finds the initial value by placeholder text', async () => {
    render(<DummyForm />);
    const datePickerInput = screen.getByPlaceholderText('yyyy-mm-dd hh:mm');
    const dpi = datePickerInput as HTMLInputElement;
    expect(dpi.value).toBe('1995-12-17 03:24');
  });
});
