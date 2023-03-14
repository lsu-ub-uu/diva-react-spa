import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, styled } from '@mui/material';

interface TabsMenuProps {
  children: React.ReactNode;
  value: number;
  index: number;
}
const StyledTab = styled(Tab)({
  color: '#666666',
  '&.Mui-selected': {
    color: '#ffffff',
    fontWeight: '700',
  },
});
const TabPanel = (props: TabsMenuProps) => {
  return (
    <div>
      {props.value === props.index && (
        <Box sx={{ p: 3 }}>
          <Typography>{props.children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (name: string) => {
  return {
    id: `${name}`,
    'aria-controls': `${name}`,
  };
};

export const TabsMenu = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: '#613985', borderWidth: '2px' }}>
        <Tabs
          disableRipple
          value={value}
          aria-label='Tab menu for DiVA'
          onChange={handleChange}
          variant='fullWidth'
          sx={{ color: '#ffffff' }}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#613985',
              height: '100%',
              width: '33.33%',
              borderRadius: '8px 8px 0 0',
              zIndex: '-1',
              // transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
          }}
        >
          <StyledTab
            disableRipple
            label='Registrera & hantera'
            {...a11yProps('Registrera & hantera')}
          />
          <StyledTab
            disableRipple
            label='Administrera'
            {...a11yProps('Administrera')}
          />
          <StyledTab
            disableRipple
            label='Mina publikationer & projekt'
            {...a11yProps('Mina publikationer & projekt')}
          />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
      >
        Registrera & hantera puplikationer
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
      >
        Administrera publikationer
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
      >
        Mina publikationer & projekt
      </TabPanel>
    </Box>
  );
};
