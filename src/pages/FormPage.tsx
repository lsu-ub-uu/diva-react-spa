import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { AsidePortal, VerticalStepper } from '../components';

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
        <VerticalStepper steps={headingsList} />
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
