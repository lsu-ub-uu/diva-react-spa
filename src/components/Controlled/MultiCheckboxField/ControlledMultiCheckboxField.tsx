import { FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { Control, Controller, useController, useWatch } from 'react-hook-form';
import { Checkbox, Option } from '../../index';

interface ControlledMultiCheckboxFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  options: Option[];
}

export const ControlledMultiCheckboxField = (
  props: ControlledMultiCheckboxFieldProps,
) => {
  const {
    field: { ref, value, onChange },
  } = useController({
    name: props.name,
    control: props.control,
    defaultValue: [],
  });

  const checkboxIds =
    useWatch({ control: props.control, name: props.name }) || [];

  const handleChange = (val: any) => {
    const newArray = [...checkboxIds];
    const item = val;

    if (newArray.length > 0) {
      const index = newArray.findIndex((x) => x === item);
      if (index === -1) {
        newArray.push(item);
      } else {
        newArray.splice(index, 1);
      }
    } else {
      newArray.push(item);
    }

    onChange(newArray);
  };

  return (
    <FormControl
      size='small'
      variant='outlined'
    >
      <FormLabel component='legend'>{props.label}</FormLabel>
      <div>
        {props.options.map((option: Option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={props.name}
                  render={() => {
                    return (
                      <Checkbox
                        inputRef={ref}
                        checked={value?.some(
                          (checked: any) => checked === option.value,
                        )}
                        onChange={() => handleChange(option.value)}
                      />
                    );
                  }}
                  control={props.control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};
