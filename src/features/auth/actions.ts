import axios from 'axios';
import { AppThunk } from 'app/store';
import { authenticated, authenticating, hasError } from './authSlice';
// eslint-disable-next-line import/no-cycle
import { Account } from '../../components/Layout/Header/Login';

const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

export const dummyLoginAsync =
  (account: Account, callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authenticating());
      const options = {
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await axios.post(
        `${BFF_API_URL}/auth/${account.idFromLogin}`,
        { token: account.appToken },
        options,
      );
      // console.log(response);

      dispatch(authenticated(response.data.authToken));
    } catch (e) {
      dispatch(hasError('login error'));
    } finally {
      if (callback) callback();
    }
  };
