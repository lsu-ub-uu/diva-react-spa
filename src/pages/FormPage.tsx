import { Box, Step, StepButton } from '@mui/material';
import { AsidePortal, VerticalStepper } from '../components';

export const FormPage = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <AsidePortal>
        <VerticalStepper>
          <Step key='Publikationstyp'>
            <StepButton href='#section-1'>Publikationstyp</StepButton>
          </Step>
          <Step key='FTest'>
            <StepButton href='#section-test'>Test</StepButton>
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
        <Box sx={{ height: '500px' }} />
        <h2 id='section-test'>Test</h2>

        <Box sx={{ height: '500px' }} />
        <h2>Konferens</h2>
        <Box sx={{ height: '500px' }} />
        <h2 id='section-2'>Identifikationer</h2>
        <Box sx={{ height: '500px' }} />
        <h2>Ingår i projekt</h2>
        <Box sx={{ height: '500px' }} />
        <h2>Nyckelord</h2>
        <Box sx={{ height: '500px' }} />
        <h2>Abstrakt</h2>
        <Box sx={{ height: '500px' }} />
        <h2 id='section-1'>Anmärkning</h2>
        <Box sx={{ height: '500px' }} />
      </div>
    </Box>
  );
};
