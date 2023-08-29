import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { ControlledRadioButtons } from '../ControlledRadioButtons';

/**
 * @vitest-environment jsdom
 */

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
