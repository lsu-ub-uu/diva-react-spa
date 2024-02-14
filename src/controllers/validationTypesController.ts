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
import { DataGroup, DataListWrapper, RecordWrapper } from '../utils/cora-data/CoraData';
import { getSearchResultDataListBySearchType, updateRecordDataById } from '../cora/cora';
import { transformCoraValidationTypes } from '../config/transformValidationTypes';
import { errorHandler } from '../server';
import { cleanJson } from '../utils/structs/removeEmpty';
import { dependencies } from '../config/configureServer';
import { createFormMetaData } from '../formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '../utils/structs/metadataPathLookup';
import { injectRecordInfoIntoDataGroup, transformToCoraData } from '../config/transformToCora';

/**
 * @desc Get validationTypes
 * @route GET /api/validationTypes
 * @access Public
 */
export const getValidationTypes = async (req: Request, res: Response) => {
  try {
    const authToken = req.header('authToken') ?? '';
    console.log('au', authToken);
    const searchQuery: DataGroup = {
      name: 'validationTypeSearch',
      children: [
        {
          name: 'include',
          children: [
            {
              name: 'includePart',
              children: [
                {
                  name: 'validatesRecordTypeSearchTerm',
                  value: 'recordType_divaOutput'
                }
              ]
            }
          ]
        }
      ]
    };

    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      'validationTypeSearch',
      searchQuery,
      authToken
    );
    const validationTypes = transformCoraValidationTypes(response.data);
    const optionList = validationTypes.map((validationType) => ({
      value: validationType.id,
      label: validationType.nameTextId
    }));
    res.status(200).json(optionList);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Post validationType
 * @route POST /api/validationTypes
 * @access Public
 */
export const postValidationTypes = async (req: Request, res: Response) => {
  try {
    const { validationTypeId, recordId } = req.params;
    const authToken = req.header('authToken') ?? '';

    const payload = cleanJson(req.body);
    const { lastUpdate, values } = payload;
    const recordType = Object.keys(values)[0];

    const { validationTypePool } = dependencies;

    if (!validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const FORM_MODE_UPDATE = 'update';
    const dataDivider = 'diva';

    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_UPDATE);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(formMetaDataPathLookup, values);
    const updateGroup = injectRecordInfoIntoDataGroup(
      transformData[0] as DataGroup,
      validationTypeId,
      dataDivider,
      recordId,
      recordType,
      lastUpdate.updatedBy,
      lastUpdate.updateAt
    );

    const response = await updateRecordDataById<RecordWrapper>(
      recordId,
      updateGroup,
      recordType,
      authToken
    );

    res.status(response.status).json({});
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
