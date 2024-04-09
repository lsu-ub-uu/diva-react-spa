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

import { styled } from '@mui/material/styles';
import {
  Stepper,
  StepConnector,
  stepConnectorClasses,
  Typography,
} from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import { ReactNode, useState, useEffect } from 'react';
import Check from '@mui/icons-material/Check';

const StyledStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 8,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: '#613985',
    borderRadius: 1,
    margin: '15px',
  },
}));

interface StyledStepIconContainerProps {
  ownerState: 'active' | 'completed' | 'disabled';
}

const StyledStepIconContainer = styled('div')(
  (props: StyledStepIconContainerProps) => ({
    backgroundColor: '#ffffff',
    border: '2px solid #613985',
    zIndex: 1,
    color: '#613985',
    width: 50,
    height: 50,
    fontVariantNumeric: 'tabular-nums',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(props.ownerState === 'active' && {
      backgroundColor: '#613985;',
      border: '2px solid #613985',
      color: '#ffffff',
    }),
    ...(props.ownerState === 'completed' && {
      backgroundColor: '#C1B3CE;',
      border: '2px solid #C1B3CE',
      color: '#ffffff',
    }),
  }),
);

interface HorizontalStepperProps {
  children: ReactNode[];
  activeStep: number;
}

export const StepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;
  // eslint-disable-next-line no-nested-ternary
  const state = active ? 'active' : completed ? 'completed' : 'disabled';

  return (
    <StyledStepIconContainer
      ownerState={state}
      className={className}
    >
      {state === 'completed' && <Check />}
      {state === 'active' && (
        <Typography
          sx={{
            lineHeight: 1,
            height: 12,
            width: 10,
          }}
        >
          {props.icon}
        </Typography>
      )}
      {state === 'disabled' && (
        <Typography
          sx={{
            lineHeight: 1,
            height: 12,
            width: 10,
          }}
        >
          {props.icon}
        </Typography>
      )}
    </StyledStepIconContainer>
  );
};
export const HorizontalStepper = (props: HorizontalStepperProps) => {
  const [activeStep, setActiveStep] = useState(props.activeStep);

  useEffect(() => {
    setActiveStep(props.activeStep);
  }, [props.activeStep]);

  // const prev = () => setActiveStep(activeStep > 0 ? activeStep - 1 : 0);

  /* const next = () =>
    setActiveStep(
      activeStep < props.children.length - 1 ? activeStep + 1 : activeStep,
    ); */

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<StyledStepConnector />}
    >
      {props.children?.map((step) => step)}
    </Stepper>
  );
};
