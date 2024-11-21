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
import { dependencies } from '../configureServer';
import { errorHandler } from '@/data/errorHandler';
import {
  createFormDefinition,
  createLinkedRecordDefinition,
} from '@/data/formDefinition/formDefinition';
import { BFFMetadataGroup } from '@/cora/transform/bffTypes';

/**
 * @desc Get requested form
 * @route GET /api/form
 * @access  Private
 */
export const getForm = async (req: Request, res: Response) => {
  try {
    const { validationTypeId, mode } = req.params;

    if (!['create', 'update', 'view'].includes(mode)) {
      throw new Error(`Mode [${mode}] is not supported`);
    }

    if (!dependencies.validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const formDef = createFormDefinition(
      dependencies,
      validationTypeId,
      mode as 'create' | 'update' | 'view',
    );

    res.status(200).json(formDef);
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Get requested form
 * @route GET /api/form/search
 * @access  Private
 */
export const getSearchForm = async (req: Request, res: Response) => {
  try {
    const { searchId } = req.params;

    if (!dependencies.searchPool.has(searchId)) {
      res
        .status(404)
        .json({ message: `SearchId [${searchId}] does not exist` })
        .send();
      return;
    }

    const searchFromPool = dependencies.searchPool.get(searchId);
    const searchMetadataGroup = dependencies.metadataPool.get(
      searchFromPool.metadataId,
    ) as BFFMetadataGroup;
    const searchPresentationGroup = dependencies.presentationPool.get(
      searchFromPool.presentationId,
    );

    const { form } = createLinkedRecordDefinition(
      dependencies,
      searchMetadataGroup,
      searchPresentationGroup,
    );

    res.status(200).json({
      form,
      recordTypeToSearchIn: searchFromPool.recordTypeToSearchIn,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
