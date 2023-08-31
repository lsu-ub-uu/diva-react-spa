import { FormControl, FormLabel, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export const ControlledTextField = (props: ControlledTextFieldProps) => {
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
            placeholder={props.placeholder}
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
