import React from 'react';
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
