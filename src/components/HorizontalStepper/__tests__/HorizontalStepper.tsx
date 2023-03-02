import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step, StepLabel } from '@mui/material';
import { HorizontalStepper, StepIcon } from '../HorizontalStepper';

/**
 * @vitest-environment jsdom
 */
describe('<HorizontalStepper />', () => {
  test('It renders the steps of the form', () => {
    render(
      <HorizontalStepper activeStep={0}>
        <Step key='Fyll i uppgifter'>
          <StepLabel StepIconComponent={StepIcon}>Fyll i uppgifter</StepLabel>
        </Step>
        <Step key='Ladda upp filer'>
          <StepLabel StepIconComponent={StepIcon}>Ladda upp filer</StepLabel>
        </Step>
        <Step key='Granska & publicera'>
          <StepLabel StepIconComponent={StepIcon}>
            Granska & publicera
          </StepLabel>
        </Step>
        <Step key='Granska & publicera2'>
          <StepLabel StepIconComponent={StepIcon}>Preview</StepLabel>
        </Step>
      </HorizontalStepper>,
    );

    const steps = screen.getAllByText(/[1-3]/);
    expect(steps).toHaveLength(3);
  });
  test('It goes to the next step when button is clicked', async () => {
    render(
      <HorizontalStepper activeStep={0}>
        <Step key='Fyll i uppgifter'>
          <StepLabel StepIconComponent={StepIcon}>Fyll i uppgifter</StepLabel>
        </Step>
        <Step key='Ladda upp filer'>
          <StepLabel StepIconComponent={StepIcon}>Ladda upp filer</StepLabel>
        </Step>
        <Step key='Granska & publicera'>
          <StepLabel StepIconComponent={StepIcon}>
            Granska & publicera
          </StepLabel>
        </Step>
        <Step key='Granska & publicera2'>
          <StepLabel StepIconComponent={StepIcon}>Preview</StepLabel>
        </Step>
      </HorizontalStepper>,
    );
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
