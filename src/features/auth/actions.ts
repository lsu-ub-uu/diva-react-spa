import { AppThunk } from 'app/store';
import {
  UserSession,
  authenticated,
  authenticating,
  hasError,
} from './authSlice';

export const dummyLoginAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authenticating());
      await DelayPromiseResolve(1000);
      const tempSession = {
        givenName: 'John',
        familyName: 'Doe',
        token: 'token' + new Date().getMilliseconds(),
      } as UserSession;
      dispatch(authenticated(tempSession));
    } catch (e) {
      dispatch(hasError('login error'));
    } finally {
      if (callback) callback();
    }
  };

function DelayPromiseResolve(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}
