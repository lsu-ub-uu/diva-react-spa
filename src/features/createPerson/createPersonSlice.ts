import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import personService from './createPersonService';
import { PersonCreateModel } from '../../pages/PersonCreatePage';

interface RecordTypeTypeState {
  person: PersonCreateModel;
  isLoading: boolean;
  isError: boolean;
  message: any;
}
const initialState: RecordTypeTypeState = {
  person: {
    authorisedName: {
      givenName: '',
      familyName: '',
    },
    recordInfo: {
      validationType: '',
    },
  },
  isLoading: false,
  isError: false,
  message: '',
};

// Get one recordType
export const postOnePerson = createAsyncThunk(
  'person/postOnePerson',
  async (data: PersonCreateModel, thunkAPI) => {
    try {
      console.log(data);
      return await personService.createOnePerson(data);
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
  name: 'person',
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
      .addCase(postOnePerson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postOnePerson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.person = action.payload;
        state.message = '';
      })
      .addCase(postOnePerson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = recordTypeSlice.actions;
export default recordTypeSlice.reducer;
