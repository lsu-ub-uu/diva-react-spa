import axios from 'axios';
import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './publicationsSlice';

export interface DivaOutput {
  id: string;
  title: string;
  validationType: string;
  createdAt: string;
  createdBy: string;
}

export const loadPublicationsAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      const response = await axios.get(`/divaOutputs`);
      const transformed = response.data.map((record: any) => ({
        id: record.id,
        title: record.data.divaOutput.title.mainTitle.value,
        validationType: record.validationType,
        createdAt: record.createdAt,
        createdBy: record.createdBy,
      }));
      dispatch(update(transformed as DivaOutput[]));
    } catch (e) {
      console.log(e);
      dispatch(hasError('Error occurred loading publications'));
    } finally {
      if (callback) callback();
    }
  };
