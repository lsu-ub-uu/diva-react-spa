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
import { Option } from '@/components';

interface ValidationTypeState {
  validationTypes: Option[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: ValidationTypeState = {
  validationTypes: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const validationTypeSlice = createSlice({
  name: 'validationType',
  initialState,
  reducers: {
    updating: (state) => {
      state.validationTypes = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<Option[]>) => {
      state.validationTypes = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = validationTypeSlice.actions;
export default validationTypeSlice.reducer;
