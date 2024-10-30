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

import { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Alert } from '@mui/material';

interface ErrorSummaryProps {
  title?: string;
  errors: FieldErrors;
}

export const ErrorSummary = (props: ErrorSummaryProps) => {
  if (Object.keys(props.errors).length === 0) {
    return null;
  }

  return (
    <Alert
      severity='error'
      sx={{ mb: 2 }}
    >
      <span>{props.title ?? 'FormComponents validation error(s):'}</span>
      <ul>
        {Object.entries(props.errors).map(([fieldName, errors]) => {
          if (errors instanceof Array) {
            return errors.map((error, index) => {
              if (!error) return null;
              return Object.entries(error).flatMap(([subFieldName]) => {
                return (
                  <ErrorMessage
                    errors={props.errors}
                    name={`${fieldName}.${index}.${subFieldName}`}
                    key={`${fieldName}-${index}-${subFieldName}`}
                    as='li'
                  />
                );
              });
            });
          }
          return (
            <ErrorMessage
              errors={props.errors}
              name={fieldName as string}
              as='li'
              key={fieldName}
            />
          );
        })}
      </ul>
    </Alert>
  );
};
