import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ResearchSubject {
  value: string;
  label: string;
}

interface ResearchSubjectState {
  researchSubjects: ResearchSubject[];
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
    update: (state, action: PayloadAction<ResearchSubject[]>) => {
      state.researchSubjects = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = researchSubjectSlice.actions;
export default researchSubjectSlice.reducer;
