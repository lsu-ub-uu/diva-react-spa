import { createAsyncThunk } from '@reduxjs/toolkit';
import subjectCategoryService from './subjectCategoryService';

export const getAllSubjectCategories = createAsyncThunk(
  'subjectCategory/getAllSubjectCategories',
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
