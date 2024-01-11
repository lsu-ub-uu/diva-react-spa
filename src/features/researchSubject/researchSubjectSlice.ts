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
import { getAllResearchSubjects } from './actions';
import { SelectItem } from '../../components';

interface ResearchSubjectState {
  researchSubjects: SelectItem[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}
const initialState: ResearchSubjectState = {
  researchSubjects: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const researchSubjectSlice = createSlice({
  name: 'researchSubject',
  initialState,
  reducers: {
    updating: (state) => {
      state.researchSubjects = [];
      state.isLoading = true;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllResearchSubjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllResearchSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.researchSubjects = action.payload;
        state.message = '';
      })
      .addCase(getAllResearchSubjects.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = 'Error occurred fetching data';
      });
  },
});

export default researchSubjectSlice.reducer;
