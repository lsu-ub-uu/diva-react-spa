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

import { FormControl, FormLabel, IconButton, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../..';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
  presentationStyle?: string;
  childStyle?: string[];
}

export const ControlledTextField = (props: ControlledTextFieldProps) => {
  const { t } = useTranslation();
  const displayMode =
    props.displayMode !== undefined ? props.displayMode : 'input';
  const childStyle = props.childStyle !== undefined ? props.childStyle[0] : '';
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => {
        const fieldWithoutRef = { ...field, ref: undefined };
        return (
          <FormControl fullWidth>
            <FormLabel
              htmlFor={field.name}
              aria-label={props.label}
              required={props.required}
              error={error !== undefined}
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
              {t(props.label)}
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
            {displayMode === 'input' ? (
              <TextField
                multiline={props.multiline ?? false}
                rows={props.multiline ? 3 : 1}
                id={field.name}
                size='small'
                error={error !== undefined}
                {...fieldWithoutRef}
                inputRef={field.ref}
                onBlur={field.onBlur}
                autoComplete='off'
                placeholder={
                  props.placeholder !== undefined
                    ? (t(props.placeholder) as string)
                    : ''
                }
                fullWidth
                variant='outlined'
                helperText={error !== undefined ? error.message : ' '}
                InputProps={{
                  readOnly: props.readOnly,
                  endAdornment: (
                    <ErrorIcon
                      sx={{
                        color: '#ff0000',
                        visibility: error !== undefined ? 'visible' : 'hidden',
                      }}
                    />
                  ),
                }}
              />
            ) : (
              <>
                <span>{field.value}</span>
                <input
                  type='hidden'
                  value={field.value}
                  name={field.name}
                />
              </>
            )}
          </FormControl>
        );
      }}
    />
  );
};
