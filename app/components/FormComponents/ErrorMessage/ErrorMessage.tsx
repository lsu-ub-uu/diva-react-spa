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

import type { FieldErrors } from 'react-hook-form';
import { Alert } from '@mui/material';

interface ErrorMessageProp {
  title?: string;
  errors: FieldErrors;
}

export const ErrorMessage = (props: ErrorMessageProp): JSX.Element | null => {
  if (Object.entries(props.errors).length < 1) return null;

  return (
    <Alert
      severity='error'
      sx={{ mb: 2 }}
    >
      <span>{props.title ?? 'FormComponents validation error(s):'}</span>
      <ul>
        {props.errors &&
          Object.entries(props.errors).map(([field, err]) => (
            <li key={field}>
              {(err?.message ?? 'TODO HANDLE SUBFORM ERRORS').toString()}
            </li>
          ))}
      </ul>
    </Alert>
  );
};
