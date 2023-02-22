import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dummyReducer from '../features/dummy/dummySlice';

const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
