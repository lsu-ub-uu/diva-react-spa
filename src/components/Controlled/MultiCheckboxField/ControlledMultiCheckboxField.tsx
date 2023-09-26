import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Checkbox, Option } from '../../index';

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
              key={idx}
              control={
                <Checkbox
                  onChange={(e) => {
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
