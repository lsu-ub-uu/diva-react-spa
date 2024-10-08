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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/sv';
import 'dayjs/locale/en-gb';
import { svSE } from '@mui/x-date-pickers/locales';
import { TextField, TextFieldProps } from '@mui/material';
import { Dayjs } from 'dayjs';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface ExtendedDatePickerProps
  extends Omit<DatePickerProps<Dayjs, Dayjs>, 'renderInput'> {
  error?: FieldError;
}

const swedenLocale =
  svSE.components.MuiLocalizationProvider.defaultProps.localeText;

export const DatePicker = React.forwardRef(
  (props: ExtendedDatePickerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale='sv'
        localeText={swedenLocale}
      >
        <MuiDatePicker
          {...props}
          ref={ref}
          PopperProps={{
            sx: {
              '& .MuiPaper-root': { border: '2px solid #000000' },
            },
          }}
          renderInput={(params: TextFieldProps) => (
            <TextField
              size='small'
              {...params}
              onChange={params.onChange}
              helperText={props.error !== undefined ? props.error.message : ' '}
              error={props.error !== undefined}
            />
          )}
          componentsProps={{
            actionBar: {
              actions: ['today', 'clear'],
            },
          }}
        />
      </LocalizationProvider>
    );
  },
);
