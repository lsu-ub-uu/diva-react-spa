import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
} from '@mui/material';
import { Select } from '../../Form/Select/Select';
import { Option } from '../../index';

interface ControlledSelectFieldProps {
  name: string;
  control?: Control<any>;
  options?: Option[];
  isLoading: boolean;
  loadingError: boolean;
}

export const ControlledSelectField = (props: ControlledSelectFieldProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel
            required
            error={error !== undefined}
          >
            Publication type
          </FormLabel>
          <Select
            size='small'
            value={props.options?.length ? value : ''}
            onChange={onChange}
            ref={ref}
            fullWidth
            loadingError={props.loadingError}
            error={error !== undefined}
            loading={props.isLoading}
          >
            {props.options &&
              props.options.map((item) => {
                return (
                  <MenuItem
                    key={`option-${item.value}`}
                    disableRipple
                    value={item.value}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText error={error !== undefined}>
            {error !== undefined ? error.message : ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
