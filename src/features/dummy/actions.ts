import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './dummySlice';

const URL = `${window.location.protocol}//${window.location.host}`;

export const loadDummyDataAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updating());
    const url = `${URL}/fake-persons`;
    const response = await fetch(url);
    const data = await response.json();
    dispatch(update(data));
  } catch (e) {
    dispatch(hasError('error occurred fetching dummy user data'));
  }
};
