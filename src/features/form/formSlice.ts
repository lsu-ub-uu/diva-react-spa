import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import formService from './formService';

interface FormTypeState {
  form: {};
  isLoading: boolean;
  isError: boolean;
  message: any;
}
const initialState: FormTypeState = {
  form: {},
  isLoading: false,
  isError: false,
  message: '',
};

// Get one recordType
export const getOneForm = createAsyncThunk(
  'person/getForm',
  async (data: string, thunkAPI) => {
    try {
      // console.log(data);
      return await formService.getForm(data);
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

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.form = action.payload;
        state.message = '';
      })
      .addCase(getOneForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = formSlice.actions;
export default formSlice.reducer;
