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

import { useState, MouseEvent, useEffect } from 'react';
import { Button, Menu, MenuItem, Stack, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Account, getDevAccounts } from './devAccounts';
import {
  loginAsync,
  loginWebRedirectAsync,
  logoutAsync,
} from '@/features/auth/actions';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useBackdrop } from '@/components';
import { authStateSelector } from '@/features/auth/selectors';
import { loadLoginUnitsAsync, loginUnitsSelector } from '@/features/loginUnits';
import {
  convertWebRedirectToUserSession,
  messageIsFromWindowOpenedFromHere,
  printUserNameOnPage,
  splitBasenameFromUrl,
  splitSlashFromUrl,
} from './utils/utils';
import { hasError } from '@/features/auth/authSlice';

export const Login = (): JSX.Element => {
  const { MODE } = import.meta.env;
  const { t } = useTranslation();
  const { setBackdrop } = useBackdrop();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const authState = useAppSelector(authStateSelector);
  const loginUnitsState = useAppSelector(loginUnitsSelector);

  useEffect(() => {
    dispatch(loadLoginUnitsAsync());
  }, [dispatch]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDevSelection = (
    event: MouseEvent<HTMLElement>,
    account: Account,
  ) => {
    event.preventDefault();
    setBackdrop(true);
    dispatch(loginAsync(account, () => setBackdrop(false)));
    handleClose();
  };

  const handleWebRedirectSelection = (
    event: MouseEvent<HTMLElement>,
    url: string,
  ) => {
    try {
      window.open(MODE === 'development' ? 'http://localhost:1234' : url);
      window.addEventListener('message', receiveMessage, { once: true });
    } catch (e: any) {
      if (e === undefined) {
        console.log('undef', event);
      }
      console.log(e.message());
    }
    handleClose();
  };

  const receiveMessage = (event: any) => {
    if (event === undefined || event.data.source === 'react-devtools-bridge') {
      dispatch(hasError('login error'));
    }

    if (event.data.source !== 'react-devtools-bridge') {
      if (
        messageIsFromWindowOpenedFromHere(
          splitSlashFromUrl(
            splitBasenameFromUrl(window.location.href, 'divaclient'),
          ),
          splitSlashFromUrl(event.origin as string),
        )
      ) {
        dispatch(
          loginWebRedirectAsync(
            convertWebRedirectToUserSession(event.data),
            () => setBackdrop(false),
          ),
        );
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <div>
      {authState.userSession !== null ? (
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
          style={{ marginTop: '-2px' }}
        >
          <Box style={{ fontSize: '14px' }}>
            {printUserNameOnPage(authState.userSession)}
          </Box>
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            onClick={handleLogout}
            style={{ fontSize: '14px' }}
          >
            {t('divaClient_LogoutText')}
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <Stack>
          <Button
            style={{ fontSize: '14px' }}
            onClick={handleClick}
          >
            {t('divaClient_LoginText')}
          </Button>
          <Menu
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            id='login-dropdown-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {getDevAccounts().map((devAccount, index) => (
              <MenuItem
                key={`${index}_${devAccount.id}`}
                onClick={(event: MouseEvent<HTMLButtonElement>) =>
                  handleDevSelection(event, devAccount)
                }
              >
                {devAccount.lastName}
                {devAccount.firstName}
              </MenuItem>
            ))}
            {loginUnitsState?.loginUnits.map((loginUnit, index) =>
              loginUnit.type === 'webRedirect' ? (
                <MenuItem
                  key={`${index}_${loginUnit.loginDescription}`}
                  onClick={(event: MouseEvent<HTMLButtonElement>) =>
                    handleWebRedirectSelection(event, loginUnit.url)
                  }
                >
                  {t(loginUnit.loginDescription)}
                </MenuItem>
              ) : (
                <MenuItem
                  key='tempLoginUnitPassword'
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Link
                    style={{
                      color: 'black',
                      textDecorationLine: 'none',
                    }}
                    to={`/login?presentation=${JSON.stringify(
                      loginUnit.presentation,
                    )}`}
                  >
                    {t(loginUnit.loginDescription)}
                  </Link>
                </MenuItem>
              ),
            )}
          </Menu>
        </Stack>
      )}
    </div>
  );
};
