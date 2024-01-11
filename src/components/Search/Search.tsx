/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { useEffect, FunctionComponent, ChangeEvent, useState } from 'react';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

export interface SearchFieldProps {
  placeholderText: string;
  searchText: string;
  onSubmit?: (value: string) => void;
  onSearchUpdated?: (value: string) => void;
}

const SearchTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
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
      }}
    />
  );
};
