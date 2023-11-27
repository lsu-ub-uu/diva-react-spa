import React from 'react';
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
