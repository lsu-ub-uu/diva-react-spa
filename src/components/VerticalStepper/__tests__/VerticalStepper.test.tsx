import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VerticalStepper } from '../VerticalStepper';

/**
 * @vitest-environment jsdom
 */
describe('<VerticalStepper />', () => {
  test('The component renders with steps', () => {
    const steps = [
      'Publikationstyp',
      'Författare',
      'Konferens',
      'Identifikationer',
      'Ingår i projekt',
      'Nyckelord',
      'Abstrakt',
      'Anmärkning',
    ];
    render(<VerticalStepper steps={steps} />);
    const foundSteps = screen.getAllByRole('button');
    expect(foundSteps).toHaveLength(8 + 3); // TODO: remove + 3 when implemented.
  });
  test('The component renders with 3 steps', () => {
    const steps = ['Publikationstyp', 'Författare', 'Konferens'];
    render(<VerticalStepper steps={steps} />);
    const foundSteps = screen.getAllByRole('button');

    expect(foundSteps).toHaveLength(3 + 3); // TODO: remove + 3 when implemented.
  });
  test('Clicking the Complete Button marks it as Complete', async () => {
    const steps = [
      'Publikationstyp',
      'Författare',
      'Konferens',
      'Identifikationer',
      'Ingår i projekt',
      'Nyckelord',
      'Abstrakt',
      'Anmärkning',
    ];
    render(<VerticalStepper steps={steps} />);
    const user = userEvent.setup();
    const completeStepButton = screen.getByRole('button', {
      name: 'Complete Step',
    });
    // console.log(completeStepButton);
    expect(completeStepButton).toBeInTheDocument();
    await user.click(completeStepButton);

    const publikationstyp = screen.getByRole('button', {
      name: 'Publikationstyp',
    });
    expect(publikationstyp).toBeInTheDocument();
    const checkmark1 = screen.getByTestId('CheckCircleIcon');
    expect(checkmark1).toBeInTheDocument();
  });
});
