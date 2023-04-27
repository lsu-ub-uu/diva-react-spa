import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './integrationTestSlice';

// const BFF_API_URL = `https://cora.epc.ub.uu.se/diva/spaclientbff/api`;
const BFF_API_URL = `http://localhost:8081/api`;

export const loadIntegrationTestAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      const url = `${BFF_API_URL}/recordtype/recordType`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(update(data));
    } catch (e) {
      dispatch(hasError('error occurred loading integration test'));
    } finally {
      if (callback) callback();
    }
  };
