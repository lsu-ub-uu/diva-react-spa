import { requestAuthTokenOnLogin } from '@/cora/requestAuthTokenOnLogin';

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
