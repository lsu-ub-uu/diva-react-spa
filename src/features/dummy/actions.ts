import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './dummySlice';

export const loadDummyDataAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updating());
    const url =
      'https://gist.githubusercontent.com/Jerkovic/48461b292daa70d4594c0f205ce0fc1f/raw/c5a3e86b5e195d80f92c3c6da0130e47f3a88911/fake-persons.json';
    const response = await fetch(url);
    const data = await response.json();
    dispatch(update(data));
  } catch (e) {
    dispatch(hasError('error occurred fetching dummy user data'));
  }
};
