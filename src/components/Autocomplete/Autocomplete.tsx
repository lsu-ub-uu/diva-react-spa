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
import {
  Autocomplete as MuiAutocomplete,
  FormLabel,
  IconButton,
} from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { SelectItem, Tooltip } from '../index';

interface AutoCompleteProps {
  name: string;
  // control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
  parentPresentationStyle?: string;
  showLabel?: boolean;
  options: SelectItem[];
  onSelected?: (id: string) => void;
  searchLink?: string;
}

interface AutoCompleteSearchResult {
  // title: string;
  // year: number;
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
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AutoCompleteSearchResult[]>([]);
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
          setOptions(value ? [value] : []);
          return undefined;
        }
        const response = await axios.get(
          `/search/${props.searchLink}?searchTermName=personNameSearchTerm&searchTermValue=${inputValue}`,
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
  }, [inputValue, loading, props.searchLink, value]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const { t } = useTranslation();
  return (
    <>
      <FormLabel
        // htmlFor={field.name}
        aria-label={props.label}
        required={props.required}
        // error={error !== undefined}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {props.showLabel === true ? t(props.label) : null}
        {props.tooltip && (
          <Tooltip
            title={t(props.tooltip.title)}
            body={t(props.tooltip.body)}
          >
            <IconButton
              edge='end'
              aria-label='Help'
              disableRipple
              color='default'
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </FormLabel>
      <MuiAutocomplete
        size='small'
        popupIcon={<ExpandMoreIcon />}
        onChange={(
          event: React.SyntheticEvent,
          value: AutoCompleteSearchResult | null,
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
          console.log('ggtgggg', option);
          // const matches = match(option.title, inputValue, {
          //   insideWords: true,
          // });
          // const parts = parse(option.title, matches);

          return (
            <li {...renderProps}>
              <p>{option.id}</p>
             {/* <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>*/}
            </li>
          );
        }}
      />
    </>
  );
};
