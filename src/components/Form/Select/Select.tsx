import { Alert, Select as MuiSelect, SelectProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

interface ExtendedSelectProps extends SelectProps {
  loading: boolean;
  loadingError?: boolean;
}

export const Select = React.forwardRef((props: ExtendedSelectProps, ref) => {
  const { loading, loadingError, ...remainingProps } = props;

  if (loading) return <span>Loading...</span>;
  if (loadingError) return <Alert severity='error'>Loading error</Alert>;

  return (
    <MuiSelect
      ref={ref}
      {...remainingProps}
      IconComponent={ExpandMoreIcon}
    />
  );
});
