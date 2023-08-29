import React from 'react';
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
