import { useEffect, FunctionComponent, ChangeEvent, useState } from 'react';
import { Box, IconButton, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

export interface SearchFieldProps {
  placeholderText: string;
  searchText: string;
  onSubmit?: (value: string) => void;
  onSearchUpdated?: (value: string) => void;
}

const SearchTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  backgroundColor: '#fff',
  height: '2rem',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: 'none',
  },
}));

const SearchBox = styled(Box)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: 'none',
  },
}));

export const Search: FunctionComponent<SearchFieldProps> = (
  props: SearchFieldProps,
) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    if (props.onSearchUpdated) {
      props.onSearchUpdated(event.target.value);
    }
  };

  const clear = () => {
    setSearchText('');
    if (props.onSubmit) {
      props.onSubmit('');
    }
  };

  const onSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit(searchText);
    }
  };

  useEffect(() => {
    if (props.searchText) {
      setSearchText(props.searchText);
    }
  }, [props.searchText]);

  return (
    <SearchBox>
      <Box sx={{ width: '100%' }}>
        <SearchTextField
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          autoComplete='off'
          fullWidth
          id='search-field'
          variant='outlined'
          placeholder={props.placeholderText}
          value={searchText}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{
                  visibility: searchText.length > 0 ? 'visible' : 'hidden',
                }}
                onClick={clear}
              >
                <ClearIcon />
              </IconButton>
            ),
            sx: {
              height: '3rem',
            },
          }}
        />
      </Box>
    </SearchBox>
  );
};
