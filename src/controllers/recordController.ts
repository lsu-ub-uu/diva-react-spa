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
import { DataGroup, RecordWrapper } from '../utils/cora-data/CoraData';
import {
  deleteRecordDataById,
  getRecordDataById,
  postRecordData,
  updateRecordDataById
} from '../cora/record';
import { errorHandler } from '../server';
import { cleanJson } from '../utils/structs/removeEmpty';
import { dependencies } from '../config/configureServer';
import { createFormMetaData } from '../formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '../utils/structs/metadataPathLookup';
import { injectRecordInfoIntoDataGroup, transformToCoraData } from '../config/transformToCora';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import { transformRecord } from '../config/transformRecord';
import { createLinkedRecordDefinition } from '../formDefinition/formDefinition';
import { Dependencies } from '../formDefinition/formDefinitionsDep';
import * as TYPES from '../config/bffTypes';

/**
 * @desc Post an update to a record to Cora
 * @route POST /api/record/:validationTypeId/:recordId
 * @access Private
 */
export const postRecordByValidationTypeAndId = async (req: Request, res: Response) => {
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

/**
 * @desc Delete a record from Cora
 * @route DELETE /api/record/:validationTypeId/:recordId
 * @access Private
 */
export const deleteRecordByValidationTypeAndId = async (req: Request, res: Response) => {
  try {
    const { recordType, recordId } = req.params;
    const authToken = req.header('authToken') ?? '';

    const { recordTypePool } = dependencies;

    if (!recordTypePool.has(recordType)) {
      throw new Error(`Validation type [${recordType}] does not exist`);
    }

    const response = await deleteRecordDataById(recordId, recordType, authToken);

    res.status(response.status).json({ message: 'de' });
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Post a new record to Cora
 * @route POST /api/record/:validationTypeId/
 * @access Private
 */
export const postRecordByValidationType = async (req: Request, res: Response) => {
  try {
    const { validationTypeId } = req.params;
    const authToken = req.header('authToken') ?? '';

    const payload = cleanJson(req.body);
    const recordType = Object.keys(payload)[0];

    const { validationTypePool } = dependencies;

    if (!validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const FORM_MODE_NEW = 'create';
    const dataDivider = 'diva';

    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(formMetaDataPathLookup, payload);
    const newGroup = injectRecordInfoIntoDataGroup(
      transformData[0] as DataGroup,
      validationTypeId,
      dataDivider
    );
    const response = await postRecordData<RecordWrapper>(newGroup, recordType, authToken);
    const id = extractIdFromRecordInfo(response.data.record.data);

    res.status(response.status).json({ id }); // return id for now
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Get record data for existing records
 * @route GET /api/record/:recordType/:recordId
 * @access Private
 */
export const getRecordByRecordTypeAndId = async (req: Request, res: Response) => {
  try {
    const { presentationRecordLinkId } = req.query;
    const { recordType, recordId } = req.params;

    const authToken = req.header('authToken') ?? '';
    const response = await getRecordDataById<RecordWrapper>(recordType, recordId, authToken);
    const recordWrapper = response.data;
    const record = transformRecord(dependencies, recordWrapper);

    if (presentationRecordLinkId !== undefined) {
      const { presentationGroup, metadataGroup } = getGroupsFromPresentationLinkId(
        dependencies,
        presentationRecordLinkId as string
      );
      record.presentation = createLinkedRecordDefinition(
        dependencies,
        metadataGroup,
        presentationGroup
      );
    }

    res.status(response.status).json(record);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

export const getGroupsFromPresentationLinkId = (
  dependencies: Dependencies,
  presentationLinkId: string
) => {
  const presentationLink = dependencies.presentationPool.get(
    presentationLinkId
  ) as TYPES.BFFPresentationRecordLink;
  const { presentationId } = presentationLink.linkedRecordPresentations[0];
  const presentationGroup = dependencies.presentationPool.get(presentationId);
  const metadataGroup = dependencies.metadataPool.get(
    presentationGroup.presentationOf
  ) as TYPES.BFFMetadataGroup;
  return { presentationGroup, metadataGroup };
};
