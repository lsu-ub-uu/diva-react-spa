import { AppThunk } from 'app/store';
import {
  hasError,
  ResearchSubject,
  update,
  updating,
} from './researchSubjectSlice';

const URL = `${window.location.protocol}//${window.location.host}`;

export const loadResearchSubjectsAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      const url = `${URL}/research-subjects`;
      const response = await fetch(url);
      const data: ResearchSubject[] = await response.json();
      dispatch(update(data));
    } catch (e) {
      dispatch(hasError('Error occurred fetching research subjects'));
    } finally {
      if (callback) callback();
    }
  };
