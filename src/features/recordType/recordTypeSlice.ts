import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recordTypeService from './recordTypeService';

export interface RecordTypeType {
  value: string;
  label: string;
}

interface RecordTypeTypeState {
  recordType: RecordTypeType[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}
const initialState: RecordTypeTypeState = {
  recordType: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get one recordType
export const getRecordTypeByName = createAsyncThunk(
  'recordtype/getRecordTypeByName',
  async (id: string, thunkAPI) => {
    try {
      return await recordTypeService.findOneRecordType(id);
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

export const recordTypeSlice = createSlice({
  name: 'recordType',
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
      .addCase(getRecordTypeByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecordTypeByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.recordType = action.payload;
        state.message = '';
      })
      .addCase(getRecordTypeByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = recordTypeSlice.actions;
export default recordTypeSlice.reducer;
