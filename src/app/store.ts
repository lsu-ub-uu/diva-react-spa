import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from '@reduxjs/toolkit';
import dummyReducer from '../features/dummy/dummySlice';
import publicationTypeReducer from '../features/publicationTypes/publicationTypeSlice';
import subjectCategoryReducer from '../features/subjectCategory/subjectCategorySlice';

const combinedReducer = combineReducers({
  dummy: dummyReducer,
  publicationType: publicationTypeReducer,
  subjectCategory: subjectCategoryReducer,
});

const store = configureStore({
  reducer: combinedReducer,
  devTools: true, // todo change to env node env.
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
