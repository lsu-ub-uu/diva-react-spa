import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel as MuiInputLabel,
  styled,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { Card, Search } from '../components';

const StyledInputLabel = styled(MuiInputLabel)(() => ({
  '&.MuiInputLabel-root': {
    fontSize: '1.2rem',
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(4),
  },
  '& .MuiInputBase-input': {
    width: '100%',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fcfcfb',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

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
          variant='standard'
          fullWidth
        >
          <StyledInputLabel
            size='normal'
            htmlFor='some-input'
          >
            Choose publication
            <IconButton
              disableRipple
              color='info'
              aria-label='info'
            >
              <InfoIcon />
            </IconButton>
          </StyledInputLabel>
          <StyledInput
            fullWidth
            defaultValue='default'
            id='some-input'
          />
          <Search
            onSubmit={(search) => console.log(search)}
            buttonText='btn'
            placeholderText='Search here'
            searchText='search text'
          />
        </FormControl>
      </Card>
    </div>
  );
};
