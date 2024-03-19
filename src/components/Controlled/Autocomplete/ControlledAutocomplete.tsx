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
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../Tooltip/Tooltip';
import { FormGenerator } from '../../FormGenerator/FormGenerator';
import { FormSchema } from '../../FormGenerator/types';
import { CoraRecord } from '../../../app/hooks';
import { LinkedRecord } from '../../LinkedRecord/LinkedRecord';

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
  presentationRecordLinkId?: string;
  recordType?: string;
}

export const ControlledAutocomplete = (
  props: AutoCompleteProps,
): JSX.Element => {
  const { t } = useTranslation();

  const [options, setOptions] = useState<CoraRecord[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [presentationValue, setPresentationValue] = useState<CoraRecord | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // eslint-disable-next-line consistent-return
    const fetchData = async () => {
      try {
        if (inputValue === '') {
          return undefined;
        }
        const response = await axios.get(
          `/search/${props.searchLink}?searchTermValue=${inputValue}`,
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
  }, [inputValue, props.searchLink, presentationValue]);

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
              noOptionsText={t('divaClient_noOptionsText' as string)}
              popupIcon={<ExpandMoreIcon />}
              onChange={(
                event: React.SyntheticEvent,
                newValue: CoraRecord | null,
              ) => {
                field.onChange(newValue?.id);
                setPresentationValue(newValue);
              }}
              disablePortal
              id={field.name}
              sx={{ width: '100%' }}
              filterOptions={(x) => x}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={options}
              getOptionLabel={(option) => option.id}
              renderInput={(params) => (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {presentationValue !== null ? (
                    <LinkedRecord
                      recordType={props.recordType as string}
                      id={field.value}
                      presentationRecordLinkId={
                        props.presentationRecordLinkId as string
                      }
                    />
                  ) : (
                    <TextField
                      {...params}
                      {...fieldWithoutRef}
                      sx={{ marginTop: '0' }}
                      placeholder={
                        props.placeholder !== undefined
                          ? (t(props.placeholder) as string)
                          : ''
                      }
                      margin='normal'
                      error={error !== undefined}
                    />
                  )}
                </>
              )}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderOption={(renderProps, option) => {
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
