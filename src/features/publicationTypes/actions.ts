import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './publicationTypeSlice';

const URL = `${window.location.protocol}//${window.location.host}`;

export const loadPublicationTypesAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      const url = `${URL}/publication-types`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(update(data));
    } catch (e) {
      dispatch(hasError('error occurred loading publication types'));
    } finally {
      if (callback) callback();
    }
  };
