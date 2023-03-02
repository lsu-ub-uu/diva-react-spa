import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormPageStepper } from '../FormPageStepper';

/**
 * @vitest-environment jsdom
 */
describe('<FormPageStepper />', () => {
  test('It renders the steps of the form', () => {
    render(<FormPageStepper />);

    const steps = screen.getAllByText(/[1-3]/);
    expect(steps).toHaveLength(3);
  });
  test('It goes to the next step when button is clicked', async () => {
    render(<FormPageStepper />);
    const user = userEvent.setup();
    const nextButton = screen.getByRole('button', {
      name: 'Gå till nästa steg',
    });
    expect(nextButton).toBeInTheDocument();

    const steps = screen.queryAllByText(/[1-3]/);
    const step1Container = steps[0].closest('div')?.closest('span');
    const step2Container = steps[1].closest('div')?.closest('span');
    const step3Container = steps[2].closest('div')?.closest('span');
    expect(step1Container).toHaveClass('Mui-active');

    await user.click(nextButton);
    expect(step1Container).toHaveClass('Mui-completed');
    expect(step2Container).toHaveClass('Mui-active');
    expect(step3Container).toHaveClass('Mui-disabled');
  });
});
