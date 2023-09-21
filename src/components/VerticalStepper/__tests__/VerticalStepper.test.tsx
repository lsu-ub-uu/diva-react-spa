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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step, StepButton } from '@mui/material';
import { VerticalStepper } from '../VerticalStepper';

/**
 * @vitest-environment jsdom
 */
describe('<VerticalStepper />', () => {
  test('The component renders with steps', () => {
    render(
      <VerticalStepper>
        <Step key='Publikationstyp'>
          <StepButton href='#section-1'>Publikationstyp</StepButton>
        </Step>
        <Step key='FTest'>
          <StepButton href='#section-2'>Test</StepButton>
        </Step>
        <Step key='Konferens'>
          <StepButton href='#section-3'>Konferens</StepButton>
        </Step>
        <Step key='Identifikationer'>
          <StepButton href='#section-4'>Identifikationer</StepButton>
        </Step>
        <Step key='Ingår i projekt'>
          <StepButton href='#section-5'>Ingår i projekt</StepButton>
        </Step>
        <Step key='Nyckelord'>
          <StepButton href='#section-6'>Nyckelord</StepButton>
        </Step>
        <Step key='Abstrakt'>
          <StepButton href='#section-7'>Abstrakt</StepButton>
        </Step>
        <Step key='Anmärkning'>
          <StepButton href='#section-8'>Anmärkning</StepButton>
        </Step>
      </VerticalStepper>,
    );
    const foundSteps = screen.getAllByRole('link');
    expect(foundSteps).toHaveLength(8);
  });
  test('The component renders with 3 steps', () => {
    render(
      <VerticalStepper>
        <Step key='Publikationstyp'>
          <StepButton href='#section-1'>Publikationstyp</StepButton>
        </Step>
        <Step key='FTest'>
          <StepButton href='#section-2'>Test</StepButton>
        </Step>
        <Step key='Konferens'>
          <StepButton href='#section-3'>Konferens</StepButton>
        </Step>
      </VerticalStepper>,
    );
    const foundSteps = screen.getAllByRole('button');

    expect(foundSteps).toHaveLength(3);
  });
  test('Clicking the Complete Button marks it as Complete', async () => {
    render(
      <VerticalStepper>
        <Step key='Publikationstyp'>
          <StepButton href='#section-1'>Publikationstyp</StepButton>
        </Step>
        <Step key='FTest'>
          <StepButton href='#section-2'>Test</StepButton>
        </Step>
        <Step key='Konferens'>
          <StepButton href='#section-3'>Konferens</StepButton>
        </Step>
        <Step key='Identifikationer'>
          <StepButton href='#section-4'>Identifikationer</StepButton>
        </Step>
        <Step key='Ingår i projekt'>
          <StepButton href='#section-5'>Ingår i projekt</StepButton>
        </Step>
        <Step key='Nyckelord'>
          <StepButton href='#section-6'>Nyckelord</StepButton>
        </Step>
        <Step key='Abstrakt'>
          <StepButton href='#section-7'>Abstrakt</StepButton>
        </Step>
        <Step key='Anmärkning'>
          <StepButton href='#section-8'>Anmärkning</StepButton>
        </Step>
      </VerticalStepper>,
    );
    const user = userEvent.setup();
    const completeStepButton = screen.getByRole('button', {
      name: 'Complete Step',
    });
    // console.log(completeStepButton);
    expect(completeStepButton).toBeInTheDocument();
    await user.click(completeStepButton);

    const publikationstyp = screen.getByRole('link', {
      name: 'Publikationstyp',
    });
    expect(publikationstyp).toBeInTheDocument();
    const checkmark1 = screen.getByTestId('CheckCircleIcon');
    expect(checkmark1).toBeInTheDocument();
  });
});
