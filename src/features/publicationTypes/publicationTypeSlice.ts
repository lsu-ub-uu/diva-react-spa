import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PublicationType {
  value: string;
  label: string;
}

interface PublicationTypeState {
  publicationTypes: PublicationType[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}
const initialState: PublicationTypeState = {
  publicationTypes: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const publicationTypeSlice = createSlice({
  name: 'publicationType',
  initialState,
  reducers: {
    updating: (state) => {
      state.publicationTypes = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<PublicationType[]>) => {
      state.publicationTypes = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = publicationTypeSlice.actions;
export default publicationTypeSlice.reducer;
