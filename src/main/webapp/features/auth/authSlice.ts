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
import { isValidJSON } from './utils/utils';

const LOCAL_STORAGE_NAME = 'diva_session';

// a temporary user session object

export interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  hasError: boolean;
  error?: string;
  userSession: any;
}

export const checkIfDataShouldBeSaved = (
  userSession: any | Record<string, never> | null,
) => {
  if (
    JSON.stringify(userSession) === '{}' ||
    JSON.stringify(userSession) === 'null'
  ) {
    return false;
  }
  return isValidJSON(JSON.stringify(userSession));
};

export const writeState = (userSession: any) => {
  if (checkIfDataShouldBeSaved(userSession)) {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userSession));
  }
};

export const deleteState = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_NAME);
};

export const createInitialState = (): any | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const storage = localStorage.getItem(LOCAL_STORAGE_NAME);
  if (!isValidJSON(storage)) {
    axios.defaults.headers.common = {
      Authtoken: '',
    };
    return null;
  }

  if (
    isValidJSON(storage) &&
    (JSON.parse(storage as string) === undefined ||
      JSON.parse(storage as string) === null)
  ) {
    axios.defaults.headers.common = {
      Authtoken: '',
    };
    return null;
  }

  const session = JSON.parse(storage as string);

  axios.defaults.headers.common = {
    Authtoken: session.data.token,
  };
  return session as any;
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
    authenticated: (state, action: PayloadAction<any>) => {
      state.isAuthenticating = false;
      state.isAuthenticated = true;
      state.hasError = false;
      state.error = '';
      state.userSession = action.payload;
      writeState(action.payload);
      // setting the auth header for axios client
      axios.defaults.headers.common = {
        Authtoken: action.payload.data.token,
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
