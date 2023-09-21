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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Alert, Select as MuiSelect, SelectProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

interface ExtendedSelectProps extends SelectProps {
  loading: boolean;
  loadingError?: boolean;
}

export const Select = React.forwardRef((props: ExtendedSelectProps, ref) => {
  const { loading, role, loadingError, ...remainingProps } = props;

  if (loading) return <span>Loading...</span>;
  if (loadingError)
    return <Alert severity='error'>Loading error occurred</Alert>;

  return (
    <MuiSelect
      role={role}
      ref={ref}
      {...remainingProps}
      IconComponent={ExpandMoreIcon}
    />
  );
});
