import { Account } from '@/components/Layout/Header/Login/devAccounts';
import axios from 'axios';
import { Auth } from '@/features/auth/authSlice';
import { requestAuthTokenOnLogin } from '../../../../bff/src/main/.server/cora/auth';

export async function loginWithAppToken(account: Account) {
  try {
    return requestAuthTokenOnLogin(
      account.idFromLogin,
      account.appToken,
      'apptoken',
    );
    /* const response = await axios.post(
       '/auth/appToken',
       { user: account.idFromLogin, appToken: account.appToken },
       { headers: { 'Content-Type': 'application/json' } },
     );
     return response.data.auth as Auth;*/
  } catch {
    return null;
  }
}
