import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import subjectCategoryService from './subjectCategoryService';

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

// Get all subject categories
export const getAllSubjectCategories = createAsyncThunk(
  'subjectCategory/getSubjectCategories',
  async (_, thunkAPI) => {
    try {
      return await subjectCategoryService.loadSubjectCategoriesAsync();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

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
