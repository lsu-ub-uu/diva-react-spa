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

import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
} from '@mui/material';
import { Select } from '../../Form/Select/Select';
import { Option } from '../../index';

interface ControlledSelectFieldProps {
  name: string;
  label: string;
  control?: Control<any>;
  options?: Option[];
  isLoading: boolean;
  loadingError: boolean;
  placeholder?: string;
  required?: boolean;
}

export const ControlledSelectField = (props: ControlledSelectFieldProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel
            htmlFor={props.name}
            required={props.required}
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          <Select
            sx={{
              '& .MuiSelect-select .notranslate::after': props.placeholder
                ? {
                    content: `"${props.placeholder}"`,
                    opacity: 0.42,
                  }
                : {},
            }}
            inputProps={{
              id: props.name,
            }}
            size='small'
            value={props.options?.length ? value : ''}
            onChange={onChange}
            ref={ref}
            fullWidth
            loadingError={props.loadingError}
            error={error !== undefined}
            loading={props.isLoading}
          >
            {props.options &&
              props.options.map((item, index) => {
                return (
                  <MenuItem
                    disabled={item.disabled}
                    key={`option-${index}`}
                    disableRipple
                    value={item.value}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText error={error !== undefined}>
            {error !== undefined ? error.message : ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
