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

import { CoraRecord, RecordInfo } from '@/features/record/types';

export const getRecordInfo = (response: CoraRecord): RecordInfo => {
  const temp = Object.entries(response.data).map(([, value]) => {
    return value['recordInfo'];
  });
  return temp[0];
};

export const getValueFromRecordInfo = (
  recordInfo: RecordInfo,
  name: string,
) => {
  return recordInfo[name];
};
