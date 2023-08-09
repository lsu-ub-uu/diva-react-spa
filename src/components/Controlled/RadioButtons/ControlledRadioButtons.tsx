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
