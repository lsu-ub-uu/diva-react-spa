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

import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete as MuiAutocomplete } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';

interface AutoCompleteProps {
  placeholder?: string;
  readOnly?: boolean;
  displayMode?: string;
  parentPresentationStyle?: string;
  onSelected?: (id: string) => void;
  searchLink?: string;
}

interface AutoCompleteSearchResultProps {
  id: string;
  recordType: string;
  validationType: string;
  createdAt: string;
  createdBy: string;
  updated: unknown[];
  userRights: string[];
  data: unknown;
}

export const Autocomplete = (props: AutoCompleteProps): JSX.Element => {
  // const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AutoCompleteSearchResultProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const loading = open && options.length === 0;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!loading) {
      return undefined;
    }

    const fetchData = async () => {
      try {
        if (inputValue === '') {
          setOptions(inputValue ? [inputValue] : []);
          return undefined;
        }
        const response = await axios.get(
          `/search/${props.searchLink}?searchTermName=${props.searchLink}Term&searchTermValue=${inputValue}`,
        );
        console.log(response);

        if (isMounted) {
          setError(null);
          setOptions(response.data);
          // setIsLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('Unexpected error occurred');
          }
          // setIsLoading(false);
        }
      }
    };

    fetchData().then();

    return () => {
      isMounted = false;
    };
  }, [inputValue, loading, props.searchLink]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <MuiAutocomplete
      size='small'
      popupIcon={<ExpandMoreIcon />}
      onChange={(
        event: React.SyntheticEvent,
        value: AutoCompleteSearchResultProps | null,
      ) => {
        // onChange={(event: React.SyntheticEvent, value: SelectItem | null) => {
        if (props.onSelected && value != null) props.onSelected(value.id);
        // if (props.onSelected && value != null) props.onSelected(value.id);
      }}
      id='autocomplete-test'
      sx={{ width: '100%' }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={options}
      getOptionLabel={(option) => option.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholder ?? 'Search'}
          margin='normal'
        />
      )}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(renderProps, option, { inputValue }) => {
        return <li {...renderProps}>{option.id}</li>;
      }}
    />
  );
};
