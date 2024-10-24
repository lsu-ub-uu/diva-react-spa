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

import axios from 'axios';
import { AppThunk } from '@/app/store';
import { hasError, LoginUnitsArray, update, updating } from './loginUnitsSlice';

export const loadLoginUnitsAsync =
  (callback?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      const response = await axios.get(`/auth/loginUnits`);
      dispatch(update(response.data as LoginUnitsArray[]));
    } catch {
      dispatch(hasError('Error occurred loading login units'));
    } finally {
      if (callback) callback();
    }
  };
