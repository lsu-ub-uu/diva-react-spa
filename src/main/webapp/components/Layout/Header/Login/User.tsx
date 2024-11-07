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

import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { loader } from '@/root';
import {
  convertWebRedirectToUserSession,
  messageIsFromWindowOpenedFromHere,
  printUserNameOnPage,
} from '@/components/Layout/Header/Login/utils/utils';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Account,
  devAccounts,
} from '@/components/Layout/Header/Login/devAccounts';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

export default function User() {
  const { MODE } = import.meta.env;
  const { auth, loginUnits } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const { t } = useTranslation();
  const anchorEl = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = useNavigation();

  const returnTo = encodeURIComponent(location.pathname + location.search);

  const handleDevSelection = (account: Account) => {
    setMenuOpen(false);
    submit(
      { loginType: 'appToken', account: JSON.stringify(account), returnTo },
      { action: '/login', method: 'post' },
    );
  };

  const handleWebRedirectSelection = (url: string) => {
    try {
      window.open(MODE === 'development' ? '/devLogin' : url);
      window.addEventListener('message', receiveMessage, { once: true });
    } catch (e: any) {
      console.log(e.message());
    }
    setMenuOpen(false);
  };

  const receiveMessage = (event: any) => {
    if (event === undefined || event.data.source === 'react-devtools-bridge') {
      // dispatch(hasError('login error'));
    }

    if (event.data.source !== 'react-devtools-bridge') {
      if (messageIsFromWindowOpenedFromHere(event)) {
        submit(
          {
            loginType: 'webRedirect',
            auth: JSON.stringify(convertWebRedirectToUserSession(event.data)),
            returnTo,
          },
          { action: '/login', method: 'post' },
        );
      }
    }
  };

  if (!auth) {
    return (
      <>
        <Button
          ref={anchorEl}
          onClick={() => setMenuOpen(true)}
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' ? (
            <>
              {t('divaClient_LoginText')}{' '}
              <CircularProgress
                size='1em'
                sx={{ ml: 1 }}
              />
            </>
          ) : (
            t('divaClient_LoginText')
          )}
        </Button>
        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          anchorEl={anchorEl.current}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            disabled
            sx={{ py: 0 }}
          >
            <Typography variant='overline'>
              {t('divaClient_LoginDevAccountText')}
            </Typography>
          </MenuItem>
          {devAccounts.map((devAccount) => (
            <MenuItem
              key={devAccount.userId}
              onClick={() => handleDevSelection(devAccount)}
            >
              {devAccount.lastName} {devAccount.firstName}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            disabled
            sx={{ py: 0 }}
          >
            <Typography variant='overline'>
              {t('divaClient_LoginWebRedirectText')}
            </Typography>
          </MenuItem>
          {loginUnits
            .filter(({ type }) => type === 'webRedirect')
            .map(({ loginDescription, url }) => (
              <MenuItem
                key={loginDescription}
                onClick={() => handleWebRedirectSelection(url)}
              >
                {t(loginDescription)}
              </MenuItem>
            ))}
          <Divider />
          <MenuItem
            disabled
            sx={{ py: 0 }}
          >
            <Typography variant='overline'>
              {t('divaClient_LoginPasswordText')}
            </Typography>
          </MenuItem>
          {loginUnits
            .filter(({ type }) => type === 'password')
            .map(({ loginDescription, presentation }) => (
              <MenuItem
                key='tempLoginUnitPassword'
                component={Link}
                to={`/login?presentation=${encodeURIComponent(JSON.stringify(presentation))}&returnTo=${returnTo}`}
                onClick={() => setMenuOpen(false)}
              >
                {t(loginDescription)}
              </MenuItem>
            ))}
        </Menu>
      </>
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
        <input
          type='hidden'
          name='returnTo'
          value={returnTo}
        />
        <Button
          type='submit'
          endIcon={<LogoutIcon />}
        >
          {t('divaClient_LogoutText')}
        </Button>
      </Form>
    </Stack>
  );
}
