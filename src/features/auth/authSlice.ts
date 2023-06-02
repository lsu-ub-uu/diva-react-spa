import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LOCAL_STORAGE_NAME = 'diva_session';

// a temporary user session object
export interface UserSession {
  id: string;
  validForNoSeconds: string;
  idInUserStorage: string;
  idFromLogin: string;
  lastName: string;
  firstName: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  hasError: boolean;
  error?: string;
  userSession: UserSession | null;
}

export const writeState = (userSession: UserSession) => {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userSession));
};

export const deleteState = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_NAME);
};

export const createInitialState = (): UserSession | null => {
  if (localStorage.getItem(LOCAL_STORAGE_NAME) == null) {
    return null;
  }
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_NAME) as string,
  ) as UserSession;
};

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  hasError: false,
  error: '',
  userSession: createInitialState(),
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticating: (state) => {
      state.isAuthenticating = true;
    },
    hasError: (state, action: PayloadAction<string>) => {
      state.hasError = true;
      state.error = `${action.payload}`;
      state.isAuthenticating = false;
    },
    authenticated: (state, action: PayloadAction<UserSession>) => {
      state.isAuthenticating = false;
      state.isAuthenticated = true;
      state.hasError = false;
      state.error = '';
      state.userSession = action.payload;
      writeState(action.payload as UserSession);
    },
    logout: (state) => {
      state.hasError = false;
      state.isAuthenticating = false;
      state.isAuthenticated = false;
      state.userSession = null;
      deleteState();
    },
  },
});

export const { authenticated, logout, authenticating, hasError } =
  authSlice.actions;

export default authSlice.reducer;