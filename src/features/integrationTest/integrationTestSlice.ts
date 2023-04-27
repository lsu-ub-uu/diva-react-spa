import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IntegrationTestType {
  value: string;
  label: string;
}

interface IntegrationTestTypeState {
  integration: IntegrationTestType[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}
const initialState: IntegrationTestTypeState = {
  integration: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const IntegrationTestSlice = createSlice({
  name: 'integrationTestType',
  initialState,
  reducers: {
    updating: (state) => {
      state.integration = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<IntegrationTestType[]>) => {
      state.integration = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = IntegrationTestSlice.actions;
export default IntegrationTestSlice.reducer;
