import { FormControl, FormLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { DatePicker } from '../../index';

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
