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

import axios from 'axios';
import { AppThunk } from '../../app/store';
import {
  authenticated,
  authenticating,
  hasError,
  logout,
  UserSession,
} from './authSlice';
import { Account } from '../../components/Layout/Header/Login/devAccounts';
import { loadPublicationTypesAsync } from '../publicationTypes';
import { loadPublicationsAsync } from '../publications';
import { deleteFromCora } from './utils/deleteFromCora';

const { VITE_BFF_API_URL } = import.meta.env;
export const loginAsync =
  (account: Account, callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authenticating());
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await axios.post(
        `/auth/${account.idFromLogin}`,
        { token: account.appToken },
        options,
      );

      dispatch(authenticated(response.data.authToken));
      dispatch(loadPublicationTypesAsync());
      dispatch(loadPublicationsAsync());
    } catch (e) {
      dispatch(hasError('login error'));
    } finally {
      if (callback) callback();
    }
  };

export const loginWebRedirectAsync =
  (account: UserSession, callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authenticating());
      dispatch(authenticated(account));
      dispatch(loadPublicationTypesAsync());
      dispatch(loadPublicationsAsync());
    } catch (e) {
      dispatch(hasError('login error'));
    } finally {
      if (callback) callback();
    }
  };

export const logoutAsync = (): AppThunk => async (dispatch) => {
  const userSession: UserSession = JSON.parse(
    localStorage.getItem('diva_session') as string,
  );

  const url = `${VITE_BFF_API_URL}/auth/${userSession.idFromLogin}`;

  try {
    dispatch(authenticating());

    const response = await deleteFromCora(url, userSession.id);
    dispatch(logout());
    dispatch(loadPublicationTypesAsync());
    dispatch(loadPublicationsAsync());
  } catch (e: any) {
    dispatch(logout());
    dispatch(hasError(e.message));
  }
};
