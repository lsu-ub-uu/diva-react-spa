import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  message: string;
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
});

export const { update, updating, hasError } = subjectCategorySlice.actions;
export default subjectCategorySlice.reducer;
