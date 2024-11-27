import { Account } from '@/components/Layout/Header/Login/devAccounts';
import { requestAuthTokenOnLogin } from '@/cora/requestAuthTokenOnLogin';

export async function loginWithAppToken(account: Account) {
  try {
    return requestAuthTokenOnLogin(
      account.idFromLogin,
      account.appToken,
      'apptoken',
    );
  } catch {
    return null;
  }
}
