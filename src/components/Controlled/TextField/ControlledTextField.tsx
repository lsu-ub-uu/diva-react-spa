import { FormControl, FormLabel, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeHolder?: string;
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
            required={false}
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          <TextField
            error={error !== undefined}
            {...field}
            autoComplete='off'
            placeholder={props.placeHolder}
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
