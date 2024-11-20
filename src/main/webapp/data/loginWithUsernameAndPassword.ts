import { requestAuthTokenOnLogin } from '../../../../bff/src/main/webapp/cora/auth';

export const loginWithUsernameAndPassword = async (
  loginId: string,
  password: string,
) => {
  try {
    return await requestAuthTokenOnLogin(loginId, password, 'password');
  } catch {
    return null;
  }
};
