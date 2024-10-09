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

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { ChangeEvent } from 'react';
import { Checkbox, Option } from '@/components';

interface ControlledMultiCheckboxFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  options: Option[];
  required?: boolean;
}

export const ControlledMultiCheckboxField = (
  props: ControlledMultiCheckboxFieldProps,
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel
            required={props.required}
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          {props.options.map((option: Option, idx: number) => (
            <FormControlLabel
              key={`${option.label}_${idx}`}
              control={
                <Checkbox
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const newValue = e.target.checked
                      ? [...value, option.value]
                      : value.filter((item: any) => item !== option.value);
                    onChange(newValue);
                  }}
                  checked={Array.isArray(value) && value.includes(option.value)}
                />
              }
              label={option.label}
            />
          ))}
          <FormHelperText error={error !== undefined}>
            {error !== undefined ? error.message : ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
