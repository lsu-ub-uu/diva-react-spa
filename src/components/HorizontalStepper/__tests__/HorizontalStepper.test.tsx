/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { render, screen } from '@testing-library/react';
import { Step, StepLabel } from '@mui/material';
import { HorizontalStepper, StepIcon } from '../HorizontalStepper';

/**
 * @vitest-environment jsdom
 */
describe('<HorizontalStepper />', () => {
  it('It renders the steps of the form', () => {
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
        <Step key='Preview'>
          <StepLabel StepIconComponent={StepIcon}>Preview</StepLabel>
        </Step>
      </HorizontalStepper>,
    );

    const steps = screen.getAllByText(/[1-3]/);
    expect(steps).toHaveLength(3);
  });
  it('When on Step 1, Step 1 is active, Step 2-3 is disabled', async () => {
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
      </HorizontalStepper>,
    );

    const steps = screen.getAllByText(/[1-3]/);

    expect(steps[0]).toHaveTextContent('1');
    const step1Container = steps[0]?.closest('div')?.closest('span');
    const step2Container = steps[1]?.closest('div')?.closest('span');
    const step3Container = steps[2]?.closest('div')?.closest('span');

    expect(step1Container).toHaveClass('Mui-active');
    expect(step2Container).toHaveClass('Mui-disabled');
    expect(step3Container).toHaveClass('Mui-disabled');
  });
  it('When on Step 2, Step 1 is completed, Step 3 is disabled', async () => {
    render(
      <HorizontalStepper activeStep={1}>
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
      </HorizontalStepper>,
    );

    const completedSteps = screen.getAllByTestId('CheckIcon');
    expect(completedSteps).toHaveLength(1);

    const activeOrDisabledSteps = screen.getAllByText(/[1-3]/);
    expect(activeOrDisabledSteps).toHaveLength(2);
  });
  it('When on Step 3, Step 1-2 is completed, Step 3 is active', async () => {
    render(
      <HorizontalStepper activeStep={2}>
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
      </HorizontalStepper>,
    );

    const completedSteps = screen.getAllByTestId('CheckIcon');
    expect(completedSteps).toHaveLength(2);

    const activeOrDisabledSteps = screen.getAllByText(/[1-3]/);
    expect(activeOrDisabledSteps).toHaveLength(1);
  });
});
