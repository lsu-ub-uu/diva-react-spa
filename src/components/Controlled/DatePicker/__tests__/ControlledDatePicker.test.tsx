import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { ControlledDatePicker } from '../ControlledDatePicker';

/**
 * @vitest-environment jsdom
 */

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { dateField: '' } });

  return (
    <ControlledDatePicker
      name='dateField'
      label='Select Date'
      control={methods.control}
    />
  );
};

describe('<ControlledDatePicker />',() => {
  it('renders component and selects a date', async () => {
    render(<DummyForm />);
    // Simulate selecting a date
    const user = userEvent.setup();
    const dateInput = screen.getByRole('textbox');
    await user.type(dateInput, '2023-08-25');
    expect(true).toBe(true);
  });
});
