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
import { useForm } from 'react-hook-form';
import { ControlledSelectField } from '../../index';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { optionSelect: 'option2' } });

  return (
    <ControlledSelectField
      required={false}
      placeholder='Select option'
      control={methods.control}
      name='optionSelect'
      options={options}
      label='Option label'
      isLoading={false}
      loadingError={false}
    />
  );
};

describe('<ControlledSelectField />', () => {
  it('renders component and test initial value', async () => {
    const { container } = render(<DummyForm />);
    const test = container.getElementsByClassName('MuiSelect-nativeInput');
    expect((test[0] as HTMLInputElement).value).toBe('option2');
  });
});
