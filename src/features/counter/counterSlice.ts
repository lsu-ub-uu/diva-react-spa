import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  isError: boolean;
  message: string;
}
const initialState: CounterState = {
  value: 0,
  isError: false,
  message: '',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
