/*
 * Copyright 2024 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Request, Response } from 'express';
import * as console from 'node:console';
import { dependencies } from '../config/configureServer';
import { DataGroup, DataListWrapper } from '../utils/cora-data/CoraData';
import { getSearchResultDataListBySearchType } from '../cora/record';
import { transformRecords } from '../config/transformRecord';
import { errorHandler } from '../server';

/**
 * @desc Get created divaOutputs
 * @route GET /api/divaOutputs
 * @access	Public
 */
export const getDivaOutputs = async (req: Request, res: Response) => {
  try {
    const authToken = req.header('authToken') ?? '';
    const searchQuery: DataGroup = {
      name: 'search',
      children: [
        {
          name: 'include',
          children: [
            {
              name: 'includePart',
              children: [
                {
                  name: 'genericSearchTerm',
                  value: '*'
                }
              ]
            }
          ]
        }
      ]
    };

    const responseDivaOutput = await getSearchResultDataListBySearchType<DataListWrapper>(
      'divaOutputSearch',
      searchQuery,
      authToken
    );

    const responseDivaOutputSwepub = await getSearchResultDataListBySearchType<DataListWrapper>(
      'divaOutputSwepubSearch',
      searchQuery,
      authToken
    );

    const recordsDivaOutput = transformRecords(dependencies, responseDivaOutput.data);
    const recordsDivaOutputSwepub = transformRecords(dependencies, responseDivaOutputSwepub.data);
    res.status(200).json([...recordsDivaOutput, ...recordsDivaOutputSwepub]);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
