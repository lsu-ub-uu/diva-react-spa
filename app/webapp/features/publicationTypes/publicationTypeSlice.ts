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
import { Option } from '../../components';

interface PublicationTypeState {
  publicationTypes: Option[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: PublicationTypeState = {
  publicationTypes: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const publicationTypeSlice = createSlice({
  name: 'publicationType',
  initialState,
  reducers: {
    updating: (state) => {
      state.publicationTypes = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<Option[]>) => {
      state.publicationTypes = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = publicationTypeSlice.actions;
export default publicationTypeSlice.reducer;
