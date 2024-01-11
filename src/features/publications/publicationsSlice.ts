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
import { DivaOutput } from './actions';

interface PublicationState {
  publications: DivaOutput[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}
const initialState: PublicationState = {
  publications: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    updating: (state) => {
      state.publications = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<DivaOutput[]>) => {
      state.publications = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = publicationsSlice.actions;
export default publicationsSlice.reducer;
