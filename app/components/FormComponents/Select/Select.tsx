/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */


import {
  Alert,
  type  BaseSelectProps,
  CircularProgress,
  OutlinedInput,
  Select as MuiSelect,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useTranslation } from 'react-i18next';

interface ExtendedSelectProps extends BaseSelectProps {
  loading: boolean;
  loadingError?: boolean;
}

export const Select = function Select(props: ExtendedSelectProps) {
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
      ref={props.ref}
      {...remainingProps}
      IconComponent={ExpandMoreIcon}
    />
  );
};
