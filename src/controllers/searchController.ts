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
import * as console from 'console';
import { DataGroup, DataListWrapper } from '../utils/cora-data/CoraData';
import { getSearchResultDataListBySearchType } from '../cora/cora';
import { errorHandler } from '../server';
import { transformRecords } from '../config/transformRecord';
import { dependencies } from '../config/configureServer';

/**
 * @desc Get result of a public person search
 * @route GET /api/search
 * @access Public
 */
export const getPublicSearchResult = async (req: Request, res: Response) => {
  try {
    const { searchTermName, searchTermValue } = req.query;

    console.log(searchTermName, searchTermValue);

    const authToken = req.header('authToken') ?? '';
    const { searchType } = req.params;

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
                  name: `${searchTermName}`,
                  value: `${searchTermValue}`
                }
              ]
            }
          ]
        }
      ]
    };

    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      searchType,
      searchQuery,
      authToken
    );
    const temp = transformRecords(dependencies, response.data);
    console.log(temp);

    res.status(200).json(temp);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
