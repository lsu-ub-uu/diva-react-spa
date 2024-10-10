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

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { ControlledRadioButtons } from '@/components/Controlled';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { testField: '' } });

  return (
    <ControlledRadioButtons
      name='testField'
      control={methods.control}
      label='Test Label'
      options={options}
    />
  );
};

describe('<ControlledRadioButtons />', () => {
  it('renders component with button options', () => {
    const { container } = render(<DummyForm />);

    const radios = container.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(3);
  });

  it('updates radio button selection', async () => {
    const { container } = render(<DummyForm />);
    const radios = container.querySelectorAll('input[type="radio"]');
    await userEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
  });
});
