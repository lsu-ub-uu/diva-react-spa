import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Search } from '../components';

export const DemoFormPage = () => {
  return (
    <div>
      <Card
        title='Publications and other stuff'
        variant='variant1'
        tooltipTitle='Publications help'
        tooltipBody='Publications help body text tooltip'
      >
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          size='small'
        >
          <FormLabel
            error
            required
          >
            Label for input
          </FormLabel>
          <TextField
            error
            required
            placeholder='placeholder'
            id='some-id'
            defaultValue='Hello World'
          />
        </FormControl>
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel>Search</FormLabel>
          <Search
            onSubmit={(search) => console.log(search)}
            placeholderText='Search here'
            searchText='search text'
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Choose something</FormLabel>
          {/* eslint-disable-next-line react/no-unstable-nested-components */}
          <Select IconComponent={(props) => <ExpandMoreIcon {...props} />}>
            <MenuItem value={10}>Stockholms Universitet</MenuItem>
            <MenuItem value={20}>Uppsala</MenuItem>
            <MenuItem value={30}>Test</MenuItem>
          </Select>
        </FormControl>
      </Card>
    </div>
  );
};
