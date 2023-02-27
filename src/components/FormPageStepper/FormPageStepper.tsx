import { styled } from '@mui/material/styles';
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import { useState } from 'react';

const steps = ['Fyll i uppgifter', 'Ladda upp filer', 'Granska & publicera'];

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 8,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#613985',
    borderRadius: 1,
    margin: '15px',
  },
}));

const CustomStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ffffff',
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
  ...(ownerState.active && {
    backgroundColor: '#613985;',
    border: '2px solid #613985',
    color: '#ffffff',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#C1B3CE;',
    border: '2px solid #C1B3CE',
    color: '#ffffff',
  }),
}));

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;
  const icons = {
    1: (
      <Typography
        sx={{
          lineHeight: 1,
          height: 12,
          width: 10,
        }}
      >
        1
      </Typography>
    ),
    2: (
      <Typography
        sx={{
          lineHeight: 1,
          height: 12,
          width: 10,
        }}
      >
        2
      </Typography>
    ),
    3: (
      <Typography
        sx={{
          lineHeight: 1,
          height: 12,
          width: 10,
        }}
      >
        3
      </Typography>
    ),
  };

  return (
    <CustomStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </CustomStepIconRoot>
  );
};

export const FormPageStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Button
        disableRipple
        variant='contained'
        onClick={() => setActiveStep(activeStep > 0 ? activeStep - 1 : 0)}
      >
        -
      </Button>
      <Button
        disableRipple
        variant='contained'
        onClick={() =>
          setActiveStep(activeStep < 2 ? activeStep + 1 : activeStep)
        }
      >
        +
      </Button>
      <div>
        <Typography>Step {activeStep + 1}</Typography>
      </div>
    </>
  );
};
