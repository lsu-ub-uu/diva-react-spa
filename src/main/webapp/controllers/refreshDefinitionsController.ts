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
import { loadStuffOnServerStart } from '../config/configureServer';
import { errorHandler } from '../app';

/**
 * @desc Get refreshed definitions
 * @route GET /api/refreshDefinitions
 * @access  Public
 * @description  Refresh the definitions collected from Cora in the pools.
 */
export const refreshDefinitions = async (req: Request, res: Response) => {
  try {
    await loadStuffOnServerStart();
    res.status(200).json({ message: 'Refreshed cora defs' });
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
