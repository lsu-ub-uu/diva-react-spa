/*
 * Copyright 2024 Uppsala University Library
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

import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { Alert, AlertTitle } from '@mui/material';

export const DefaultErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Alert severity='error'>
        <AlertTitle>
          {error.status} {error.statusText}
        </AlertTitle>
        <p>{error.data}</p>
      </Alert>
    );
  } else if (error instanceof Error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </Alert>
    );
  } else {
    return (
      <Alert severity='error'>
        <AlertTitle>Unknown Error</AlertTitle>
      </Alert>
    );
  }
};
