import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SESSION_STORAGE_NAME = 'diva_session';

// a temporary user session object
export interface UserSession {
  givenName: string;
  familyName: string;
  authToken: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  hasError: boolean;
  error?: string;
  userSession: UserSession | null;
}

function writeState(userSession: UserSession) {
  sessionStorage.setItem(SESSION_STORAGE_NAME, JSON.stringify(userSession));
}

function deleteState() {
  sessionStorage.removeItem(SESSION_STORAGE_NAME);
}

const createInitialState = (): UserSession | null => {
  if (sessionStorage.getItem(SESSION_STORAGE_NAME) == null) {
    return null;
  } else {
    return JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_NAME) as string,
    ) as UserSession;
  }
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
