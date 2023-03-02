import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
} from '@mui/material';

interface FormStepperProps {
  steps: string[];
}
/* const steps = [
  'Publikationstyp',
  'Författare',
  'Konferens',
  'Identifikationer',
  'Ingår i projekt',
  'Nyckelord',
  'Abstrakt',
  'Anmärkning',
]; */

export const FormStepper = (props: FormStepperProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return props.steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          props.steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        sx={{
          '& .MuiStepIcon-root': {
            color: '#613985',
          },
          '& .MuiStepLabel-root .Mui-completed': {
            color: '#613985',
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: '#613985',
          },
        }}
        orientation='vertical'
        nonLinear
        activeStep={activeStep}
      >
        {props.steps.map((label, index) => (
          <Step
            sx={{}}
            key={label}
            completed={completed[index]}
          >
            <StepButton
              color='inherit'
              onClick={handleStep(index)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        {allStepsCompleted() ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              sx={{ mr: 1 }}
            >
              Next
            </Button>
            {activeStep !== props.steps.length &&
              (completed[activeStep] ? (
                <Typography
                  variant='caption'
                  sx={{ display: 'inline-block' }}
                >
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? 'Finish'
                    : 'Complete Step'}
                </Button>
              ))}
          </Box>
        )}
      </div>
    </Box>
  );
};
