import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ControlledSelectField } from '../ControlledSelectField';

/**
 * @vitest-environment jsdom
 */

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { optionSelect: 'option2' } });

  return (
    <ControlledSelectField
      required={false}
      placeholder='Select option'
      control={methods.control}
      name='optionSelect'
      options={options}
      label='Option label'
      isLoading={false}
      loadingError={false}
    />
  );
};

describe('<ControlledSelectField />', () => {
  it('renders component and test initial value', async () => {
    const { container } = render(<DummyForm />);
    const test = container.getElementsByClassName('MuiSelect-nativeInput');
    expect((test[0] as HTMLInputElement).value).toBe('option2');
  });
  it('can get controlled select field by label text', async () => {
    render(<DummyForm />);
    const test = screen.getByLabelText('Option label');
    expect((test as HTMLInputElement).value).toBe('option2');
  });
});
