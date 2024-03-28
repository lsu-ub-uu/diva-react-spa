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

describe('<ControlledTextField />', () => {
  it('renders component without label', async () => {
    const DummyFormWithoutLabel = (): JSX.Element => {
      const methods = useForm({ defaultValues: { title: 'test' } });

      return (
        <ControlledTextField
          required={false}
          placeholder='Enter Title'
          control={methods.control}
          name='title'
          label='Title'
          showLabel={false}
        />
      );
    };

    render(<DummyFormWithoutLabel />);
    const label = screen.queryByText('Title');
    expect(label).not.toBeInTheDocument();
  });

  it('renders component with label', async () => {
    const DummyFormWithLabel = (): JSX.Element => {
      const methods = useForm({ defaultValues: { title: 'test' } });

      return (
        <ControlledTextField
          required={false}
          placeholder='Enter Title'
          control={methods.control}
          name='title'
          label='Title'
          showLabel
        />
      );
    };

    render(<DummyFormWithLabel />);
    const label = screen.getByText('Title');
    expect(label).toBeInTheDocument();
  });

  it('renders component multiline', async () => {
    const DummyFormWithLabel = (): JSX.Element => {
      const methods = useForm({ defaultValues: { title: 'test' } });

      return (
        <ControlledTextField
          required={false}
          placeholder='Enter Title'
          control={methods.control}
          name='title'
          label='Title'
          multiline
        />
      );
    };

    render(<DummyFormWithLabel />);
    const multiline = screen.getByRole('textbox');
    const row = multiline.getAttribute('rows');
    expect(multiline).toBeInTheDocument();
    expect(row).toBe('3');
  });

  it('renders component singleline', async () => {
    const DummyFormWithLabel = (): JSX.Element => {
      const methods = useForm({ defaultValues: { title: 'test' } });

      return (
        <ControlledTextField
          required={false}
          placeholder='Enter Title'
          control={methods.control}
          name='title'
          label='Title'
          multiline={false}
        />
      );
    };

    render(<DummyFormWithLabel />);
    const multiline = screen.getByRole('textbox');
    const row = multiline.getAttribute('rows');
    expect(multiline).toBeInTheDocument();
    expect(row).toBe('1');
  });

  it('renders component and finds a new entered value', async () => {
    const DummyForm = (): JSX.Element => {
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

    render(<DummyForm />);

    const newContent = 'New Test Content';
    const inputElement = screen.getByPlaceholderText('Enter Title');
    await userEvent.type(inputElement, newContent);

    await waitFor(() =>
      expect(inputElement).toHaveValue('testNew Test Content'),
    );
  });
});
