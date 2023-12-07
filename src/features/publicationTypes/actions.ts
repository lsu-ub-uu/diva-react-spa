import axios from 'axios';
import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './publicationTypeSlice';
import { Option } from '../../components';

export const loadPublicationTypesAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      // validationTypes in Cora is really our available publications types.
      const response = await axios.get(`/validationTypes`);
      dispatch(update(response.data as Option[]));
    } catch (e) {
      dispatch(hasError('Error occurred loading publication types'));
    } finally {
      if (callback) callback();
    }
  };
