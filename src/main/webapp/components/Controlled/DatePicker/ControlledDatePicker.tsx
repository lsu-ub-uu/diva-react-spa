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

import { FormControl, FormLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { DatePicker } from '@/components';

interface ControlledDatePickerProps {
  name: string;
  control?: Control<any>;
  label: string;
  required?: boolean;
}

export const ControlledDatePicker = (props: ControlledDatePickerProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel
            required={props.required}
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          <DatePicker
            value={value}
            onChange={onChange}
            error={error}
          />
        </FormControl>
      )}
    />
  );
};
