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
  FormControl,
  FormLabel,
  IconButton,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Control, Controller } from 'react-hook-form';
import { t } from 'i18next';
import { Tooltip } from '../Tooltip/Tooltip';
import {FormGenerator} from "../FormGenerator/FormGenerator";
import {FormSchema} from "../FormGenerator/types";

interface AutoCompleteProps {
  name: string;
  placeholder?: string;
  label: string;
  readOnly?: boolean;
  displayMode?: string;
  parentPresentationStyle?: string;
  onSelected?: (id: string) => void;
  searchLink?: string;
  control?: Control<any>;
  showLabel?: boolean;
  tooltip?: { title: string; body: string };
}

export interface AutoCompleteSearchResultProps {
  id: string;
  recordType: string;
  validationType: string;
  createdAt: string;
  createdBy: string;
  updated: AutoCompleteSearchResultDataInterface[];
  userRights: Array<'read' | 'read_incoming_links' | 'update' | 'index'>;
  data: unknown;
  presentation?: unknown;
}
interface AutoCompleteSearchResultDataInterface {
  updateAt: string;
  updatedBy: string;
}

export const Autocomplete = (props: AutoCompleteProps): JSX.Element => {
  const [options, setOptions] = useState<AutoCompleteSearchResultProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (inputValue === '') {
          setOptions(inputValue ? [inputValue] : []);
          return undefined;
        }
        const response = await axios.get(
          `/search/${props.searchLink}?searchTermName=${props.searchLink}Term&searchTermValue=${inputValue}`,
        );

        if (isMounted) {
          setError(null);
          setOptions(response.data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('Unexpected error occurred');
          }
        }
      }
    };

    fetchData().then();

    return () => {
      isMounted = false;
    };
  }, [inputValue, loading, props.searchLink]);

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => {
        const fieldWithoutRef = { ...field, ref: undefined };
        return (
          <FormControl
            fullWidth
            sx={{
              flexDirection:
                props.parentPresentationStyle === 'inline' ? 'row' : 'column',
              alignItems: 'baseline',
            }}
          >
            <FormLabel
              htmlFor={field.name}
              aria-label={props.label}
              error={error !== undefined}
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
                newValue: AutoCompleteSearchResultProps | null,
              ) => {
                // setValue(newValue?.id);
                //
                // if (props.onSelected && value !== null) {
                //   // @ts-ignore
                //   setValue(newValue.id as string);
                //   // @ts-ignore
                //   return props.onSelected(newValue.id as string);
                // }
                field.onChange(newValue?.id);
                // console.log('newValue', newValue?.id);
                // console.log('value', value);
              }}
              id='autocomplete-test'
              sx={{ width: '100%' }}
              filterOptions={(x) => x}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={options}
              getOptionLabel={(option) => option.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...fieldWithoutRef}
                  placeholder={props.placeholder ?? 'Search'}
                  margin='normal'
                />
              )}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderOption={(renderProps, option, { inputValue }) => {
                return (
                  <li {...renderProps}>
                    <FormGenerator
                      record={option}
                      onSubmit={() => {}}
                      onInvalid={() => {}}
                      formSchema={option.presentation as FormSchema}
                      linkedData
                    />
                  </li>
                );
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};
