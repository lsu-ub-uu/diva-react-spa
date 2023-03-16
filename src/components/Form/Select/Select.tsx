import { Select as MuiSelect, SelectProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

interface ExtendedSelectProps extends SelectProps {
  loading: boolean;
}

export const Select = React.forwardRef((props: ExtendedSelectProps, ref) => {
  const { loading, ...remainingProps } = props;

  if (loading) return <span>Loading...</span>;

  return (
    <MuiSelect
      ref={ref}
      {...remainingProps}
      IconComponent={ExpandMoreIcon}
    />
  );
});
