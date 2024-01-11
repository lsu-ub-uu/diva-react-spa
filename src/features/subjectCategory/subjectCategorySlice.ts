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
import { getAllSubjectCategories } from './actions';

export interface SubjectCategory {
  id: string;
  name: string;
  disabled?: boolean;
  // todo parentId;
}

interface SubjectCategoryState {
  subjectCategories: SubjectCategory[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}
const initialState: SubjectCategoryState = {
  subjectCategories: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const subjectCategorySlice = createSlice({
  name: 'subjectCategory',
  initialState,
  reducers: {
    updating: (state) => {
      state.subjectCategories = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<SubjectCategory[]>) => {
      state.subjectCategories = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllSubjectCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSubjectCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.subjectCategories = action.payload;
        state.message = '';
      })
      .addCase(getAllSubjectCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { update, updating, hasError } = subjectCategorySlice.actions;
export default subjectCategorySlice.reducer;
