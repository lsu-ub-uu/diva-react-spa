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
import { dependencies } from '../config/configureServer';
import { errorHandler } from '../server';
import { createFormDefinition } from '../formDefinition/formDefinition';

/**
 * @desc Get form
 * @route GET /api/form
 * @access	Private
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
      mode as 'create' | 'update' | 'view'
    );

    res.status(200).json(formDef);
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
