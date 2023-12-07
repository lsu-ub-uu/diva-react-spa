import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option } from '../../components';

interface PublicationTypeState {
  publicationTypes: Option[];
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
    update: (state, action: PayloadAction<Option[]>) => {
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
