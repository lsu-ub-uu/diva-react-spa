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
import { AppThunk } from '../../app/store';
import { hasError, update, updating } from './publicationsSlice';

export interface DivaOutput {
  id: string;
  title: string;
  validationType: string;
  createdAt: string;
  createdBy: string;
  userRights: string[];
}

export const transformToTable = (data: any) => {
  return data.map((record: any) => {
    const { validationType } = record;
    const title = getCorrectTitle(validationType, record);
    return {
      id: record.id,
      title: title ?? '',
      validationType: record.validationType,
      recordType: record.recordType,
      createdAt: record.createdAt,
      createdBy: record.createdBy,
      userRights: record.userRights,
    };
  });
};

export const getCorrectTitle = (validationType: any, record: any) => {
  return validationType === 'divaOutputSwepub'
    ? record.data.output.titleInfo.title.value
    : record.data.divaOutput.title.mainTitle.value;
};

export const loadPublicationsAsync =
  (callback?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updating());
      const response = await axios.get(`/divaOutputs`);
      const transformed = transformToTable(response.data);
      dispatch(update(transformed as DivaOutput[]));
    } catch (e) {
      console.log(e);
      dispatch(hasError('Error occurred loading publications'));
    } finally {
      if (callback) callback();
    }
  };
