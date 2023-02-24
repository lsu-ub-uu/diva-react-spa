import { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';

interface TabsMenuProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          aria-label='Tab menu for DiVA'
          onChange={handleChange}
          variant='fullWidth'
          TabIndicatorProps={{
            style: {
              backgroundColor: '#613985',
              height: '4px',
              width: '33.33%',
              borderRadius: '4px 4px 0 0',
            },
          }}
        >
          <Tab
            label='Registrera & hantera'
            {...a11yProps('Registrera & hantera')}
          />
          <Tab
            label='Administrera'
            {...a11yProps('Administrera')}
          />
          <Tab
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
