import { useState } from 'react';
import { styled, Tabs, Tab, Typography, Box } from '@mui/material';

interface TabsMenuProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabsMenuProps) {
  return (
    <div>
      {props.value === props.index && (
        <Box sx={{ p: 3 }}>
          <Typography>{props.children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TabsMenu = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          aria-label='Tab menu for DiVA'
          onChange={handleChange}
          variant='fullWidth'
          TabIndicatorProps={{
            style: {
              backgroundColor: '#613985',
              height: '4px',
              borderRadius: '4px 4px 0 0',
            },
          }}
        >
          <Tab
            label='Registrera & hantera'
            {...a11yProps(0)}
          />
          <Tab
            label='Administrera'
            {...a11yProps(1)}
          />
          <Tab
            label='Mina publikationer & projekt'
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
      >
        Registrera & hantera
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
      >
        Administrera
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
