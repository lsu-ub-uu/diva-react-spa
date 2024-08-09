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

import { removeEmpty } from './removeEmpty';

export const renameObjectKey = (
  obj: { [key: string]: string },
  newKey: string,
) => {
  return Object.defineProperty(
    {},
    newKey,
    Object.getOwnPropertyDescriptor(
      obj,
      Object.keys(obj)[0],
    ) as PropertyDescriptor,
  );
};

export const convertObjectToUrl = (obj: any) => {
  const cleanedObj = removeEmpty(obj);
  // console.log(JSON.stringify(cleanedObj).toString())
  const urlSearchParam = new URLSearchParams(JSON.stringify(cleanedObj)).toString();
  return urlSearchParam;
};
