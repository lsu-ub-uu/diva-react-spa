import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { ControlledEditor } from '../ControlledEditor';

/**
 * @vitest-environment jsdom
 */

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
