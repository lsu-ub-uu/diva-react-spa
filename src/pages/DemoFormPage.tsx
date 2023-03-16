import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import { Card, Search, Radio } from '../components';

export const DemoFormPage = () => {
  return (
    <div>
      <Card
        title='Publications'
        variant='variant1'
        tooltipTitle='Publications help'
        tooltipBody='Publications help body text tooltip'
      >
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel
            error
            required
          >
            Label for input
          </FormLabel>
          <TextField
            variant='outlined'
            error
            required
            placeholder='placeholder'
            id='some-id'
            defaultValue='Hello World'
            helperText='Some error text'
            InputProps={{
              endAdornment: (
                <ErrorIcon
                  sx={{
                    color: 'red',
                    visibility: 'visible',
                  }}
                />
              ),
            }}
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
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel>Choose something</FormLabel>
          {/* eslint-disable-next-line react/no-unstable-nested-components */}
          <Select
            value={20}
            IconComponent={(props) => <ExpandMoreIcon {...props} />}
          >
            <MenuItem
              disableRipple
              value={10}
            >
              Stockholms Universitet
            </MenuItem>
            <MenuItem
              disableRipple
              value={20}
            >
              Uppsala
            </MenuItem>
            <MenuItem
              disableRipple
              value={30}
            >
              Test
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>
            Radio options
          </FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Publish now'
            />
            <FormControlLabel
              value='male'
              control={<Radio />}
              label='Publish a later time'
            />
            <FormControlLabel
              value='other'
              control={<Radio />}
              label='Some third option available'
            />
          </RadioGroup>
        </FormControl>
      </Card>
    </div>
  );
};
