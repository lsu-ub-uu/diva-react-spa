import React from 'react';
import {
  Alert,
  OutlinedInput,
  Select as MuiSelect,
  SelectProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

interface ExtendedSelectProps extends SelectProps {
  loading: boolean;
  loadingError?: boolean;
}

export const Select = React.forwardRef((props: ExtendedSelectProps, ref) => {
  const { loading, role, loadingError, ...remainingProps } = props;

  if (loadingError)
    return <Alert severity='error'>Loading error occurred</Alert>;

  return loading ? (
    <OutlinedInput
      size='small'
      fullWidth
      endAdornment={<CircularProgress size={20} />}
      readOnly
    />
  ) : (
    <MuiSelect
      role={role}
      ref={ref}
      {...remainingProps}
      IconComponent={!loading ? ExpandMoreIcon : undefined}
    />
  );
});
