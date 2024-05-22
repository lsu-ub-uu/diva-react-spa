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

interface LoginUnitsState {
  loginUnits: LoginUnitsArray[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export interface LoginUnitsArray {
  loginDescription: string;
  url: string;
  type: string;
}

const initialState: LoginUnitsState = {
  loginUnits: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const loginUnitsSlice = createSlice({
  name: 'loginUnits',
  initialState,
  reducers: {
    updating: (state) => {
      state.loginUnits = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<LoginUnitsArray[]>) => {
      state.loginUnits = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = loginUnitsSlice.actions;
export default loginUnitsSlice.reducer;
