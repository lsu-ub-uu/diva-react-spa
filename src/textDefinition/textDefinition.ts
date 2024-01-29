/*
 * Copyright 2023 Uppsala University Library
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

import { Dependencies } from '../formDefinition/formDefinitionsDep';
import { BFFText } from '../config/bffTypes';
import { Lookup } from '../utils/structs/lookup';

export const createTextDefinition = (dependencies: Dependencies, lang: string) => {
  const { textPool } = dependencies;
  const textItemDefinitions = [];
  for (const [key, text] of textPool.entries()) {
    // @ts-ignore
    const value = text[lang];
    const obj = {};
    // @ts-ignore
    obj[key] = value;
    if (value !== undefined) textItemDefinitions.push(obj);
  }

  return textItemDefinitions.reduce(
    (obj, item) =>
      Object.assign(obj, {
        [Object.keys(item)[0]]: Object.values(item)[0]
      }),
    {}
  );
};
