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
import { Avatar, Button, Menu, MenuItem, Stack, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import { devAccounts, Account } from './devAccounts';
import { loginAsync, logoutAsync } from '../../../../features/auth/actions';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useBackdrop } from '../../../Backdrop/BackdropContext';
import { authStateSelector } from '../../../../features/auth/selectors';
import {
  loadLoginUnitsAsync,
  loginUnitsSelector,
} from '../../../../features/loginUnits';

export const Login = (): JSX.Element => {
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

  const handleSelection = (
    event: MouseEvent<HTMLElement>,
    account: Account,
  ) => {
    event.preventDefault();
    setBackdrop(true);
    dispatch(loginAsync(account, () => setBackdrop(false)));
    handleClose();
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
        >
          <Box>
            {authState.userSession.firstName} {authState.userSession.lastName}
          </Box>
          <Avatar
            alt='Logout user'
            onClick={handleLogout}
          >
            <PersonIcon />
          </Avatar>
        </Stack>
      ) : (
        <Stack>
          <Button onClick={handleClick}>{t('divaClient_LoginText')}</Button>
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
            {devAccounts.map((devAccount, index) => (
              <MenuItem
                key={`${index}_${devAccount.id}`}
                onClick={(event) => handleSelection(event, devAccount)}
              >
                {devAccount.lastName}
                {devAccount.firstName}
              </MenuItem>
            ))}
            {loginUnitsState?.loginUnits.map((loginUnit, index) => (
              <MenuItem
                key={`${index}_${loginUnit.loginDescription}`}
                // onClick={(event) => handleSelection(event, devAccount)}
              >
                {loginUnit.loginDescription}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      )}
    </div>
  );
};
