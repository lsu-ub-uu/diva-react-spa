import { FormControl, FormLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { DateTimePicker } from '../../index';

interface ControlledDateTimePickerProps {
  name: string;
  control?: Control<any>;
  label: string;
  required?: boolean;
}

export const ControlledDateTimePicker = (
  props: ControlledDateTimePickerProps,
) => {
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
          <DateTimePicker
            views={['year', 'day']}
            value={value}
            onChange={onChange}
            error={error}
          />
        </FormControl>
      )}
    />
  );
};
