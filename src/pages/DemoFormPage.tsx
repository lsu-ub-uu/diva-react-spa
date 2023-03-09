import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  RadioProps,
  Select,
  styled,
  TextField,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import { Card, Search } from '../components';

const StyledRadioIcon = styled('span')(() => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#fff',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
}));

const StyledCheckedRadioIcon = styled(StyledRadioIcon)({
  backgroundColor: '#137cbd',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

const CustomRadioTestButton = ({ ...props }: RadioProps) => {
  return (
    <Radio
      {...props}
      icon={<StyledRadioIcon />}
      checkedIcon={<StyledCheckedRadioIcon />}
      disableRipple
    />
  );
};

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
              control={<CustomRadioTestButton />}
              label='Publish now'
            />
            <FormControlLabel
              value='male'
              control={<CustomRadioTestButton />}
              label='Publish a later time'
            />
            <FormControlLabel
              value='other'
              control={<CustomRadioTestButton />}
              label='Some third option available'
            />
          </RadioGroup>
        </FormControl>
      </Card>
    </div>
  );
};
