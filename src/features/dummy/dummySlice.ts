import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  firstname: string;
  lastname: string;
  id: string;
}

interface DummyState {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}
const initialState: DummyState = {
  users: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const dummySlice = createSlice({
  name: 'dummy',
  initialState,
  reducers: {
    updating: (state) => {
      state.users = [];
      state.isLoading = true;
    },
    update: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const { update, updating, hasError } = dummySlice.actions;
export default dummySlice.reducer;
