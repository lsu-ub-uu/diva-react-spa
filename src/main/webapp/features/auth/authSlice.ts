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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const LOCAL_STORAGE_NAME = 'diva_session';

// a temporary user session object
export interface UserSession {
  id: string; // this is the authToken
  validForNoSeconds: string;
  idInUserStorage: string;
  idFromLogin: string;
  lastName: string;
  firstName: string;
  logoutURL: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  hasError: boolean;
  error?: string;
  userSession: UserSession | null;
}

export const writeState = (userSession: UserSession) => {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userSession));
};

export const deleteState = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_NAME);
};

export const createInitialState = (): UserSession | null => {
  if (localStorage.getItem(LOCAL_STORAGE_NAME) == null) {
    axios.defaults.headers.common = {
      Authtoken: '',
    };
    return null;
  }

  const session = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_NAME) as string,
  ) as UserSession;
  axios.defaults.headers.common = {
    Authtoken: session.id,
  };
  return session;
};

const initialState = {
  isAuthenticated: createInitialState() !== null,
  isAuthenticating: false,
  hasError: false,
  error: '',
  userSession: createInitialState(),
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticating: (state) => {
      state.isAuthenticating = true;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.hasError = true;
      state.error = `${action.payload}`;
      state.isAuthenticating = false;
    },
    authenticated: (state, action: PayloadAction<UserSession>) => {
      state.isAuthenticating = false;
      state.isAuthenticated = true;
      state.hasError = false;
      state.error = '';
      state.userSession = action.payload;
      writeState(action.payload as UserSession);
      // setting the auth header for axios client
      axios.defaults.headers.common = {
        Authtoken: action.payload.id,
      };
    },
    logout: (state) => {
      state.hasError = false;
      state.isAuthenticating = false;
      state.isAuthenticated = false;
      state.userSession = null;
      deleteState();
      axios.defaults.headers.common = {
        Authtoken: '',
      };
    },
  },
});

export const { authenticated, logout, authenticating, hasError } =
  authSlice.actions;

export default authSlice.reducer;
