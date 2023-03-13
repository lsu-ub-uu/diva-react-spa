import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from '@reduxjs/toolkit';
import dummyReducer from '../features/dummy/dummySlice';
import publicationTypeReducer from '../features/publicationTypes/publicationTypeSlice';

const combinedReducer = combineReducers({
  dummy: dummyReducer,
  publicationType: publicationTypeReducer,
});

const store = configureStore({
  reducer: combinedReducer,
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
