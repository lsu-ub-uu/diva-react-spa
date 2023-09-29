import { FormControl, FormLabel, IconButton, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../..';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  tooltip?: { title: string; body: string };
}

export const ControlledTextField = (props: ControlledTextFieldProps) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => {
        const fieldWithoutRef = { ...field, ref: undefined };
        return (
          <FormControl fullWidth>
            <FormLabel
              htmlFor={field.name}
              aria-label={props.label}
              required={props.required}
              error={error !== undefined}
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
              {props.label}
              {props.tooltip && (
                <Tooltip
                  title={t(props.tooltip.title)}
                  body={t(props.tooltip.body)}
                >
                  <IconButton
                    edge='end'
                    aria-label='Help'
                    disableRipple
                    color='default'
                  >
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
              )}
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
