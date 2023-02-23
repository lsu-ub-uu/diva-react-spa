import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './dummySlice';

export const loadDummyDataAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updating());
    const url = 'http://localhost:5174/fake-persons';
    const response = await fetch(url);
    const data = await response.json();
    dispatch(update(data));
  } catch (e) {
    dispatch(hasError('error occurred fetching dummy user data'));
  }
};
