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
