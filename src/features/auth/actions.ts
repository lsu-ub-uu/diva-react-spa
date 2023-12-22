import axios from 'axios';
import { AppThunk } from 'app/store';
import { authenticated, authenticating, hasError } from './authSlice';
import { Account } from '../../components/Layout/Header/Login';
import { loadPublicationTypesAsync } from '../publicationTypes';
import { loadPublicationsAsync } from '../publications';

export const dummyLoginAsync =
  (account: Account, callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authenticating());
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await axios.post(
        `/auth/${account.idFromLogin}`,
        { token: account.appToken },
        options,
      );

      dispatch(authenticated(response.data.authToken));
      dispatch(loadPublicationTypesAsync());
      dispatch(loadPublicationsAsync());
    } catch (e) {
      dispatch(hasError('login error'));
    } finally {
      if (callback) callback();
    }
  };
