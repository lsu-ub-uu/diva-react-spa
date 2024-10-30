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

import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { authStateSelector } from '../features/auth/selectors';

const PrivateRoutes = () => {
  const authState = useAppSelector(authStateSelector);
  return authState.isAuthenticated ? (
    <Outlet />
  ) : (
    <Alert severity='error'>
      <AlertTitle>Not Authorized</AlertTitle>
      You need to be logged in to be able to perform this action.
      <Stack
        sx={{ pt: 4 }}
        direction='column'
        spacing={0}
      >
        <Button
          variant='outlined'
          disableRipple
        >
          Some action
        </Button>
      </Stack>
    </Alert>
  );
};

export default PrivateRoutes;
