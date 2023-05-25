import { AppThunk } from 'app/store';
import {
  UserSession,
  authenticated,
  authenticating,
  hasError,
} from './authSlice';
import { DummyAccount } from '../../components/Layout/Header/Login';

function DelayPromiseResolve(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const dummyLoginAsync =
  (dummyAccount: DummyAccount, callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authenticating());
      // replace with API call to BFF with userId and appToken to obtain authToken and name info
      console.log(dummyAccount.userId);
      console.log(dummyAccount.appToken);
      await DelayPromiseResolve(1000);
      // mocked session
      const tempSession = {
        givenName: 'John',
        familyName: 'Doe',
        authToken: new Date().getTime().toString(),
      } as UserSession;
      dispatch(authenticated(tempSession));
    } catch (e) {
      dispatch(hasError('login error'));
    } finally {
      if (callback) callback();
    }
  };
