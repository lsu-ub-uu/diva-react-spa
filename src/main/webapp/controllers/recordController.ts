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
import { transformToCoraData } from '../config/transformToCora';
import { transformRecord } from '../config/transformRecord';
import { createLinkedRecordDefinition } from '../formDefinition/formDefinition';
import * as TYPES from '../config/bffTypes';
import { BFFMetadataGroup, BFFMetadataRecordLink } from '../config/bffTypes';

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
    const { values } = payload;

    const { validationTypePool } = dependencies;
    const recordType = validationTypePool.get(validationTypeId).validatesRecordTypeId;
    if (!validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const FORM_MODE_UPDATE = 'update';

    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_UPDATE);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(formMetaDataPathLookup, values);

    const response = await updateRecordDataById<RecordWrapper>(
      recordId,
      transformData[0] as DataGroup,
      recordType,
      authToken
    );
    res.status(response.status).json({});
  } catch (error: unknown) {
    console.error(error);
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
    console.error(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Create a new record to Cora
 * @route POST /api/record/:validationTypeId/
 * @access Private
 */
export const postRecordByValidationType = async (req: Request, res: Response) => {
  try {
    const { validationTypeId } = req.params;
    const authToken = req.header('authToken') ?? '';

    const payload = cleanJson(req.body);

    const { validationTypePool } = dependencies;
    const recordType = validationTypePool.get(validationTypeId).validatesRecordTypeId;
    if (!validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const FORM_MODE_NEW = 'create';

    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(formMetaDataPathLookup, payload);

    const response = await postRecordData<RecordWrapper>(
      transformData[0] as DataGroup,
      recordType,
      authToken
    );
    const record = transformRecord(dependencies, response.data);
    res.status(response.status).json(record); // return id for now
  } catch (error: unknown) {
    console.error(error);
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
        presentationRecordLinkId as string
      );
      record.presentation = createLinkedRecordDefinition(
        dependencies,
        metadataGroup,
        presentationGroup
      );
      const listPresentationGroup = dependencies.presentationPool.get(
        dependencies.recordTypePool.get(recordType).listPresentationViewId
      );
      record.listPresentation = createLinkedRecordDefinition(
        dependencies,
        metadataGroup,
        listPresentationGroup
      );
    }

    res.status(response.status).json(record);
  } catch (error: unknown) {
    console.error(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Get record data for new record
 * @route GET /api/record/:validationType
 * @access Private
 */
export const getRecordByValidationTypeId = async (req: Request, res: Response) => {
  try {
    const { validationTypeId } = req.params;

    // const authToken = req.header('authToken') ?? '';
    const validationType = dependencies.validationTypePool.get(validationTypeId);
    const recordTypeGroup = dependencies.recordTypePool.get(validationType.validatesRecordTypeId);
    const metadataGroup = dependencies.metadataPool.get(
      recordTypeGroup.metadataId
    ) as BFFMetadataGroup;
    const recordInfoChildGroup = dependencies.metadataPool.get(
      metadataGroup.children[0].childId
    ) as BFFMetadataGroup;

    const recordInfo = recordInfoChildGroup.children
      .filter((child) => parseInt(child.repeatMin) > 0)
      .map((child) => dependencies.metadataPool.get(child.childId) as BFFMetadataRecordLink)
      .reduce<Record<string, any>>((acc, curr) => {
        if (curr.finalValue !== undefined) {
          acc[curr.nameInData] = { value: curr.finalValue };
        }
        return acc;
      }, {});

    const record = {
      data: { [metadataGroup.nameInData]: { [recordInfoChildGroup.nameInData]: recordInfo } }
    };

    res.status(200).json(record);
  } catch (error: unknown) {
    console.error(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

export const getGroupsFromPresentationLinkId = (presentationLinkId: string) => {
  const presentationLink = dependencies.presentationPool.get(
    presentationLinkId
  ) as TYPES.BFFPresentationRecordLink;
  const presentationId =
    presentationLink.linkedRecordPresentations !== undefined
      ? presentationLink.linkedRecordPresentations[0].presentationId
      : presentationLink.id;
  const presentationGroup = dependencies.presentationPool.get(presentationId);
  const metadataGroup = dependencies.metadataPool.get(
    presentationGroup.presentationOf
  ) as TYPES.BFFMetadataGroup;
  return { presentationGroup, metadataGroup };
};
