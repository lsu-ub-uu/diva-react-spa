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
