import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from '@reduxjs/toolkit';

import publicationTypeReducer from '../features/publicationTypes/publicationTypeSlice';
import subjectCategoryReducer from '../features/subjectCategory/subjectCategorySlice';
import researchSubjectReducer from '../features/researchSubject/researchSubjectSlice';
import publicationsReducer from '../features/publications/publicationsSlice';
import authReducer from '../features/auth/authSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  publicationType: publicationTypeReducer,
  subjectCategory: subjectCategoryReducer,
  researchSubject: researchSubjectReducer,
  publications: publicationsReducer,
});

const store = configureStore({
  reducer: combinedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
