import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from '@reduxjs/toolkit';
import dummyReducer from '../features/dummy/dummySlice';
import publicationTypeReducer from '../features/publicationTypes/publicationTypeSlice';
import subjectCategoryReducer from '../features/subjectCategory/subjectCategorySlice';
import researchSubjectReducer from '../features/researchSubject/researchSubjectSlice';
import integrationTestReducer from '../features/integrationTest/integrationTestSlice';
import recordTypeReducer from '../features/recordType/recordTypeSlice';

const combinedReducer = combineReducers({
  dummy: dummyReducer,
  publicationType: publicationTypeReducer,
  subjectCategory: subjectCategoryReducer,
  researchSubject: researchSubjectReducer,
  integrationTest: integrationTestReducer,
  recordType: recordTypeReducer,
});

const store = configureStore({
  reducer: combinedReducer,
  devTools: process.env.NODE_ENV !== 'production',
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
