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

import { Form, Link, useLoaderData } from '@remix-run/react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { loader } from '@/root';
import { printUserNameOnPage } from '@/components/Layout/Header/Login/utils/utils';
import LogoutIcon from '@mui/icons-material/Logout';

export default function User() {
  const { auth } = useLoaderData<typeof loader>();

  if (!auth) {
    return (
      <Button
        component={Link}
        to='/login'
      >
        Logga in
      </Button>
    );
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={2}
      style={{ marginTop: '-1px' }}
    >
      <Box style={{ fontSize: '14px' }}>{printUserNameOnPage(auth)}</Box>
      <Form
        action='/logout'
        method='post'
      >
        <Button
          type='submit'
          endIcon={<LogoutIcon />}
        >
          Log out
        </Button>
      </Form>
    </Stack>
  );
}
