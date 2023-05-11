import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import searchService from './searchService';

export interface SearchPersonInterface {
  givenName: string;
  familyName: string;
  domain: string;
  academicTitle: string;
  ORCID_ID: string;
  id: string;
}

interface SearchState {
  search: SearchPersonInterface[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}
const initialState: SearchState = {
  search: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get one recordType
export const getPersonByName = createAsyncThunk(
  'search/getPersonByName',
  async (name: string, thunkAPI) => {
    try {
      return await searchService.searchPersonsAsAdmin(name);
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

export const searchSlice = createSlice({
  name: 'search',
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
      .addCase(getPersonByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPersonByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.search = action.payload;
        state.message = '';
      })
      .addCase(getPersonByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
