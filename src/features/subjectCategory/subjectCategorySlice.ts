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
