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
import { DataGroup, DataListWrapper } from '@/cora/cora-data/CoraData';
import { getSearchResultDataListBySearchType } from '../cora/record';
import { errorHandler } from '@/data/errorHandler';
import { transformRecords } from '@/cora/transform/transformRecord';
import { dependencies } from '../configureServer';
import {
  createLinkedRecordDefinition,
  FormMetaData,
} from '@/data/formDefinition/formDefinition';
import { BFFMetadataGroup } from '@/cora/transform/bffTypes';
import { getSearchTermNameFromSearchLink } from '../cora/search';
import {
  createBFFMetadataReference,
  createMetaDataFromChildReference,
} from '@/data/formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { transformToCoraData } from '@/cora/transform/transformToCora';

/**
 * @desc Get result of a public search results
 * @route GET /api/search
 * @access Public
 */
export const getPublicSearchResult = async (req: Request, res: Response) => {
  try {
    const { searchTermValue } = req.query;
    const { searchType } = req.params;

    const searchTermName = getSearchTermNameFromSearchLink(
      dependencies,
      searchType,
    );

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
                  name: `${searchTermName}`,
                  value: `${searchTermValue}`,
                },
              ],
            },
          ],
        },
      ],
    };

    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      searchType,
      searchQuery,
      authToken,
    );

    const transformedRecords = transformRecords(dependencies, response.data);

    transformedRecords.forEach((transformedRecord) => {
      const recordType = dependencies.recordTypePool.get(
        transformedRecord.recordType,
      );
      const { listPresentationViewId } = recordType;

      const presentationGroup = dependencies.presentationPool.get(
        listPresentationViewId,
      );
      const metadataGroup = dependencies.metadataPool.get(
        presentationGroup.presentationOf,
      ) as BFFMetadataGroup;
      transformedRecord.presentation = createLinkedRecordDefinition(
        dependencies,
        metadataGroup,
        presentationGroup,
      );
    });
    res.status(200).json(transformedRecords);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

const createSearchMetaData = (id: string): FormMetaData => {
  const { metadataPool } = dependencies;
  const metadata = metadataPool.get(id);

  const metadataGroup: BFFMetadataGroup = metadataPool.get(
    metadata.id,
  ) as BFFMetadataGroup;

  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  return createMetaDataFromChildReference(formRootReference, metadataPool);
};

/**
 * @desc Get result of a public search results
 * @route GET /api/advanced/search
 * @access Public
 */
export const getAdvancedPublicSearchResult = async (
  req: Request,
  res: Response,
) => {
  try {
    const { query } = req.query;
    const queryObject = JSON.parse(query as string);

    const authToken = req.header('authToken') ?? '';
    const { searchType } = req.params;
    const searchLink = req.path.split('/')[req.path.split('/').length - 1];
    const searchName = dependencies.searchPool.get(searchLink);

    if (!dependencies.searchPool.has(searchLink)) {
      throw new Error(`Search [${searchLink}] does not exist`);
    }

    const searchMetadata = createSearchMetaData(searchName.metadataId);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(searchMetadata);
    const transformData = transformToCoraData(
      formMetaDataPathLookup,
      queryObject,
    );

    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      searchType,
      transformData[0] as DataGroup,
      authToken,
    );

    const transformedRecords = transformRecords(dependencies, response.data);

    const { fromNo, toNo, totalNo, containDataOfType } = response.data.dataList;

    transformedRecords.forEach((transformedRecord) => {
      const recordType = dependencies.recordTypePool.get(
        transformedRecord.recordType,
      );
      const { listPresentationViewId } = recordType;

      const presentationGroup = dependencies.presentationPool.get(
        listPresentationViewId,
      );
      const metadataGroup = dependencies.metadataPool.get(
        presentationGroup.presentationOf,
      ) as BFFMetadataGroup;
      transformedRecord.presentation = createLinkedRecordDefinition(
        dependencies,
        metadataGroup,
        presentationGroup,
      );
    });
    res.status(response.status).json({
      fromNo,
      toNo,
      totalNo,
      containDataOfType,
      data: transformedRecords,
    });
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Get created divaOutputs
 * @route GET /api/divaOutputs
 * @access  Public
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
                  value: '*',
                },
              ],
            },
          ],
        },
      ],
    };

    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      'diva-outputSearch',
      searchQuery,
      authToken,
    );

    const transformedRecords = transformRecords(dependencies, response.data);
    const { fromNo, toNo, totalNo, containDataOfType } = response.data.dataList;
    res.status(200).json({
      fromNo,
      toNo,
      totalNo,
      containDataOfType,
      data: transformedRecords,
    });
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
