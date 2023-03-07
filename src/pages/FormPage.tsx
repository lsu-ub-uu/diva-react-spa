import { Box, Step, StepButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { AsidePortal, VerticalStepper } from '../components';
import { handleStep } from '../components/VerticalStepper/VerticalStepper';

export const FormPage = () => {
  const [headingsList, setHeadingsList] = useState<string[]>([]);
  useEffect(() => {
    const findH2 = document.querySelectorAll('h2');
    const headingArray: string[] = [];

    Object.entries(findH2).forEach(([, value]) =>
      headingArray.push(value.textContent),
    );
    setHeadingsList(headingArray);
  }, []);

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <AsidePortal>
        <VerticalStepper steps={headingsList}>
          <Step key='Publikationstyp'>
            <StepButton>Publikationstyp</StepButton>
          </Step>
          <Step key='FTest'>
            <StepButton>Test</StepButton>
          </Step>
          <Step key='Konferens'>
            <StepButton>Konferens</StepButton>
          </Step>
          <Step key='Identifikationer'>
            <StepButton>Identifikationer</StepButton>
          </Step>
          <Step key='Ingår i projekt'>
            <StepButton>Ingår i projekt</StepButton>
          </Step>
          <Step key='Nyckelord'>
            <StepButton>Nyckelord</StepButton>
          </Step>
          <Step key='Abstrakt'>
            <StepButton>Abstrakt</StepButton>
          </Step>
          <Step key='Anmärkning'>
            <StepButton>Anmärkning</StepButton>
          </Step>
        </VerticalStepper>
      </AsidePortal>
      <div>
        <h2>Publikationstyp</h2>
        <h2>Test</h2>
        <h2>Konferens</h2>
        <h2>Identifikationer</h2>
        <h2>Ingår i projekt</h2>
        <h2>Nyckelord</h2>
        <h2>Abstrakt</h2>
        <h2>Anmärkning</h2>
      </div>
    </Box>
  );
};
