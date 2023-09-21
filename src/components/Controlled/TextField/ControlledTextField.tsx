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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { FormControl, FormLabel, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export const ControlledTextField = (props: ControlledTextFieldProps) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue=''
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel
            htmlFor={field.name}
            aria-label={props.label}
            required={props.required}
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          <TextField
            id={field.name}
            size='small'
            error={error !== undefined}
            {...field}
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
              endAdornment: (
                <ErrorIcon
                  sx={{
                    color: 'red',
                    visibility: error !== undefined ? 'visible' : 'hidden',
                  }}
                />
              ),
            }}
          />
        </FormControl>
      )}
    />
  );
};
