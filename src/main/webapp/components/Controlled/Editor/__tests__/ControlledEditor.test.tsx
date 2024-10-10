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
import { ControlledEditor } from '../ControlledEditor';

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { title: 'test' } });

  return (
    <ControlledEditor
      required={false}
      toolbar='italic | alignleft aligncenter alignright'
      plugins='code'
      control={methods.control}
      name='title'
      label='Title'
    />
  );
};

describe('<ControlledEditor />', () => {
  it('renders component and finds the initial value', async () => {
    render(<DummyForm />);

    const newContent = 'New Test Content';
    const editorElement = screen.getByLabelText('Title');
    await userEvent.type(editorElement, newContent);

    await waitFor(() => expect(editorElement).toHaveValue('New Test Content'));
  });
});
