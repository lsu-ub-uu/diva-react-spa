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
  readOnly?: boolean;
}

export const ControlledTextField = (props: ControlledTextFieldProps) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={props.control}
      name={props.name}
      /* defaultValue='' */
      render={({ field, fieldState: { error } }) => {
        const fieldWithoutRef = { ...field, ref: undefined };
        return (
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
              {...fieldWithoutRef}
              inputRef={field.ref}
              onBlur={field.onBlur}
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
                readOnly: props.readOnly,
                endAdornment: (
                  <ErrorIcon
                    sx={{
                      color: '#ff0000',
                      visibility: error !== undefined ? 'visible' : 'hidden',
                    }}
                  />
                ),
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};
