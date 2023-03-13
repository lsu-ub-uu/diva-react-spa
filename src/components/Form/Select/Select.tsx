import {
  FormControl,
  FormLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';

export interface SelectionItem {
  label: string;
  value: string;
}

export interface SelectProps {
  loading?: boolean;
  label: string;
  items: SelectionItem[];
  value: string;
  onClose?: () => void;
  onSelectionUpdated?: () => void;
}

export const Select = (props: SelectProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  if (props.loading) return null;

  return (
    <FormControl
      fullWidth
      sx={{ mb: 2 }}
    >
      <FormLabel>{props.label}</FormLabel>
      <MuiSelect
        fullWidth
        value={value}
        onChange={handleChange}
        IconComponent={(props2) => <ExpandMoreIcon {...props2} />}
      >
        {props.items &&
          props.items.map((item) => {
            return (
              <MenuItem
                key={`select-item-${item.value}`}
                disableRipple
                value={item.value}
              >
                {item.label}
              </MenuItem>
            );
          })}
      </MuiSelect>
    </FormControl>
  );
};
