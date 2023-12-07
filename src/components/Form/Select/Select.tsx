import React from 'react';
import {
  Alert,
  OutlinedInput,
  Select as MuiSelect,
  SelectProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

interface ExtendedSelectProps extends SelectProps {
  loading: boolean;
  loadingError?: boolean;
}

export const Select = React.forwardRef((props: ExtendedSelectProps, ref) => {
  const { t } = useTranslation();
  const { loading, role, loadingError, ...remainingProps } = props;

  if (loadingError)
    return <Alert severity='error'>Loading error occurred</Alert>;

  return loading ? (
    <OutlinedInput
      placeholder={t('divaClient_loadingText') as string}
      size='small'
      fullWidth
      endAdornment={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20px',
          }}
        >
          <CircularProgress size={20} />
        </div>
      }
      readOnly
    />
  ) : (
    <MuiSelect
      role={role}
      ref={ref}
      {...remainingProps}
      IconComponent={ExpandMoreIcon}
    />
  );
});
