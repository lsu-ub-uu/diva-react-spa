import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ControlledDatePicker } from '../ControlledDatePicker';

/**
 * @vitest-environment jsdom
 */

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { dateField: '2023-08-25' } });

  return (
    <ControlledDatePicker
      name='dateField'
      label='Select Date'
      control={methods.control}
    />
  );
};

describe('<ControlledDatePicker />', () => {
  it('renders component and finds the initial value by placeholder ', async () => {
    render(<DummyForm />);
    const datePickerInput = screen.getByPlaceholderText('yyyy-mm-dd');
    const dpi = datePickerInput as HTMLInputElement;
    expect(dpi.value).toBe('2023-08-25');
  });
});
