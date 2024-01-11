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

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import { ControlledMultiCheckboxField } from '../ControlledMultiCheckboxField';

/**
 * @vitest-environment jsdom
 */

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { testField: [] } });

  return (
    <ControlledMultiCheckboxField
      name='testField'
      control={methods.control}
      label='Test Label'
      options={options}
    />
  );
};

describe('<ControlledMultiCheckboxField />', () => {
  it('renders component with options', () => {
    const { container } = render(<DummyForm />);

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(options.length);
  });

  it('updates selected options when checkboxes are clicked', async () => {
    const { container } = render(<DummyForm />);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    await userEvent.click(checkboxes[0]);

    await act(async () => {
      fireEvent.click(checkboxes[1]);
    });

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });
});
