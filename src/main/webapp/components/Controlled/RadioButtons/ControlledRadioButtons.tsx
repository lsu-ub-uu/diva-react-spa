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

import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from '@mui/material';
import { Option, Radio } from '../../index';

interface ControlledRadioButtonsProps {
  name: string;
  control?: Control<any>;
  label: string;
  options: Option[];
}

export const ControlledRadioButtons = (props: ControlledRadioButtonsProps) => {
  const generateRadioOptions = (options: Option[]) => {
    return options.map((singleOption) => (
      <FormControlLabel
        key={`radio-label-${singleOption.value}`}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl component='fieldset'>
          <FormLabel
            component='legend'
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          <RadioGroup
            value={props.options?.length ? value : ''}
            onChange={onChange}
          >
            {generateRadioOptions(props.options)}
          </RadioGroup>
          <FormHelperText error={error !== undefined}>
            {error !== undefined ? error.message : ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
