import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ControlledDateTimePicker } from '../ControlledDateTimePicker';

/**
 * @vitest-environment jsdom
 */

export const DummyForm = (): JSX.Element => {
  const methods = useForm({
    defaultValues: { dateTimeField: new Date('1995-12-17T03:24:00') },
  });

  return (
    <ControlledDateTimePicker
      name='dateTimeField'
      label='Select Date time'
      control={methods.control}
    />
  );
};

describe('<ControlledDateTimePicker />', () => {
  it('renders component and finds the initial value by placeholder text', async () => {
    render(<DummyForm />);
    const datePickerInput = screen.getByPlaceholderText('yyyy-mm-dd hh:mm');
    const dpi = datePickerInput as HTMLInputElement;
    expect(dpi.value).toBe('1995-12-17 03:24');
  });
});
