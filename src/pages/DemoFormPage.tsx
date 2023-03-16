import { FormControl, FormLabel } from '@mui/material';
import React from 'react';
import { Card, Search } from '../components';

export const DemoFormPage = () => {
  return (
    <div>
      <Card
        title='Search'
        variant='variant1'
        tooltipTitle='Search'
        tooltipBody='Search help body text tooltip'
      >
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel>Search</FormLabel>
          <Search
            onSubmit={(search) => console.log(search)}
            placeholderText='Search here'
            searchText='Enter search phrase'
          />
        </FormControl>
      </Card>
    </div>
  );
};
