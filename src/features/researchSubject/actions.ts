import { createAsyncThunk } from '@reduxjs/toolkit';
import researchSubjectService from './researchSubjectService';

export const getAllResearchSubjects = createAsyncThunk(
  'researchSubject/getAllResearchSubjects',
  async (_, thunkAPI) => {
    try {
      return await researchSubjectService.loadResearchSubjectsAsync();
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
