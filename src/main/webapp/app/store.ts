/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from '@reduxjs/toolkit';

import publicationTypeReducer from '@/features/publicationTypes/publicationTypeSlice';
import publicationsReducer from '@/features/publications/publicationsSlice';
import authReducer from '@/features/auth/authSlice';
import loginUnitsReducer from '@/features/loginUnits/loginUnitsSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  publicationType: publicationTypeReducer,
  publications: publicationsReducer,
  loginUnits: loginUnitsReducer,
});

const store = configureStore({
  reducer: combinedReducer,
  devTools: import.meta.env.MODE !== 'production',
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
