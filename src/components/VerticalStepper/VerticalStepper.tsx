import { ReactNode, useState, cloneElement, ReactElement } from 'react';
import { Box, Stepper, Button, Typography } from '@mui/material';

interface VerticalStepperProps {
  children: ReactNode[];
}

export const VerticalStepper = (props: VerticalStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return props.children.length;
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
          props.children.findIndex((step, i) => !(i in completed))
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
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Stepper
        sx={{
          '& .MuiStepper-root': {
            width: 'inherit',
            height: 'inherit',
          },
          '& .MuiSvgIcon-root': {
            borderRadius: '50%',
            stroke: '#613985',
            strokeWidth: '3px',
          },
          '& .MuiSvgIcon-root:not(.Mui-completed)': {
            color: 'white',
          },
          '& .MuiStepIcon-text': {
            fill: '#613985',
            display: 'none',
          },
          '& .MuiSvgIcon-root.Mui-active': {
            color: '#613985',
            stroke: '#613985',
            strokeWidth: '3px',
          },
          '& .MuiSvgIcon-root.Mui-completed': {
            color: '#c1b3ce',
            stroke: '#c1b3ce',
            strokeWidth: '3px',
          },
        }}
        orientation='vertical'
        nonLinear
        activeStep={activeStep}
      >
        {props.children?.map((step, i) => {
          return cloneElement(step as ReactElement, {
            onClick: handleStep(i),
            completed: completed[i],
            key: `step-${i}`,
          });
        })}
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
            {activeStep !== props.children.length &&
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
