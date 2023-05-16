import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  PaginationRequest,
  PersonSearchRequest,
  PersonSearchResult,
} from 'types/personSearchResult';
import searchService from './searchService';

interface SearchState {
  search: PersonSearchResult;
  isLoading: boolean;
  isError: boolean;
  message: any;
}
const initialState: SearchState = {
  search: {
    fromNumber: 0,
    toNumber: 0,
    totalNumber: 0,
    data: [],
  } as PersonSearchResult,
  isLoading: false,
  isError: false,
  message: '',
};

// Get one recordType
export const searchPersonByTerm = createAsyncThunk(
  'search/searchPersonByTerm',
  async (searchPersonRequest: PersonSearchRequest, thunkAPI) => {
    try {
      return await searchService.personSearch(searchPersonRequest);
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
      .addCase(searchPersonByTerm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPersonByTerm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.search = action.payload;
        state.message = '';
      })
      .addCase(searchPersonByTerm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
