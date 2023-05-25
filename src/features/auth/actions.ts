import { AppThunk } from 'app/store';
import {
  UserSession,
  authenticated,
  authenticating,
  hasError,
} from './authSlice';

function DelayPromiseResolve(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const dummyLoginAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authenticating());
      // replace with API call to BFF to obtain authToken
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
