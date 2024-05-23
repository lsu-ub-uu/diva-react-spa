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

import { useState, MouseEvent } from 'react';
import { Avatar, Button, Menu, MenuItem, Stack, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import { devAccounts, Account } from './devAccounts';
import { dummyLoginAsync } from '../../../../features/auth/actions';
import { logout } from '../../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useBackdrop } from '../../../Backdrop/BackdropContext';
import { authStateSelector } from '../../../../features/auth/selectors';
import { loadPublicationsAsync } from '../../../../features/publications';
import { loadPublicationTypesAsync } from '../../../../features/publicationTypes';

export const Login = (): JSX.Element => {
  const { t } = useTranslation();
  const { setBackdrop } = useBackdrop();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const authState = useAppSelector(authStateSelector);

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
    dispatch(dummyLoginAsync(account, () => setBackdrop(false)));
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(loadPublicationTypesAsync());
    dispatch(loadPublicationsAsync());
  };

  return (
    <div>
      {authState.userSession !== null ? (
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
          style={{ marginTop: '-4px' }}
        >
          <Box>
            {`${authState.userSession.firstName} ${authState.userSession.lastName}`}
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
                {devAccount.firstName}
                {devAccount.lastName}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      )}
    </div>
  );
};
