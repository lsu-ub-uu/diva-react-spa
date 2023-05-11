import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './publicationTypeSlice';

const URL = `${window.location.protocol}//${window.location.host}`;
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

export const loadPublicationTypesAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      const url = `${BFF_API_URL}/publication/types`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(update(data));
    } catch (e) {
      dispatch(hasError('error occurred loading publication types'));
    } finally {
      if (callback) callback();
    }
  };
