import axios from 'axios';
import { Auth } from '@/features/auth/authSlice';

export const loginWithUsernameAndPassword = async (
  loginId: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      `/auth/password`,
      { user: loginId, password },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data.authToken as Auth;
  } catch {
    return null;
  }
};
