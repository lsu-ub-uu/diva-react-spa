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

import { render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { ControlledTextField } from '../ControlledTextField';

/**
 * @vitest-environment jsdom
 */

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { title: 'test' } });

  return (
    <ControlledTextField
      required={false}
      placeholder='Enter Title'
      control={methods.control}
      name='title'
      label='Title'
    />
  );
};

describe('<ControlledTextField />', () => {
  it('renders component and finds a new entered value', async () => {
    render(<DummyForm />);

    const newContent = 'New Test Content';
    const inputElement = screen.getByPlaceholderText('Enter Title');
    await userEvent.type(inputElement, newContent);

    await waitFor(() =>
      expect(inputElement).toHaveValue('testNew Test Content'),
    );
  });
});
