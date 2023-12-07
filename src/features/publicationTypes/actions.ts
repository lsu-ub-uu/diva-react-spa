import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './publicationTypeSlice';

const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

export const loadPublicationTypesAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      // validationTypes in Cora is really our available publications types.
      const url = `${BFF_API_URL}/validationTypes`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(update(data));
    } catch (e) {
      dispatch(hasError('Error occurred loading publication types'));
    } finally {
      if (callback) callback();
    }
  };
