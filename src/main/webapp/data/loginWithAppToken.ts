import { Account } from '@/components/Layout/Header/Login/devAccounts';
import { requestAuthTokenOnLogin } from '../../../../bff/src/main/webapp/cora/auth';
import { Auth } from '@/features/auth/authSlice';

export async function loginWithAppToken(account: Account) {
  try {
    const auth = await requestAuthTokenOnLogin(
      account.idFromLogin,
      account.appToken,
      'apptoken',
    );
    return auth as Auth;
  } catch {
    return null;
  }
}
