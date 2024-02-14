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
import { createTextDefinition } from '../textDefinition/textDefinition';
import { dependencies } from '../config/configureServer';

/**
 * @desc Get translations
 * @route GET /api/translation/:lang
 * @access	Public
 */
export const getTranslations = async (req: Request, res: Response) => {
  try {
    const textDefinitions = createTextDefinition(dependencies, req.params.lang);
    res.status(200).json(textDefinitions);
  } catch (error: unknown) {
    res.status(500).json('Internal server error');
  }
};
