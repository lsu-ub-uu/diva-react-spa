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

import * as console from 'console';
import {
  CoraRecord,
  DataGroup,
  DataList,
  DataListWrapper,
  RecordWrapper
} from '../utils/cora-data/CoraData';
import { BFFLoginUnit, BFFMetadata } from './bffTypes';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';

export const transformLoginUnit = (dataListWrapper: DataListWrapper): BFFLoginUnit[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoraLoginUnitToBFFLoginUnit).filter((item) => item !== undefined);
};

const transformCoraLoginUnitToBFFLoginUnit = (coraRecordWrapper: RecordWrapper) => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  return transformRecordGroupLoginUnitToBFF(dataRecordGroup) as BFFLoginUnit;
};

const transformRecordGroupLoginUnitToBFF = (dataRecordGroup: DataGroup) => {
  const loginUnit = transformSingleLoginUnit(dataRecordGroup) as BFFLoginUnit;
  return {
    id: loginUnit.id,
    login: loginUnit.login,
    loginDescription: 'b'
  };
};

const transformSingleLoginUnit = (childGroup: DataGroup) => {
  const id = extractIdFromRecordInfo(childGroup);
  const login = extractLinkedRecordIdFromNamedRecordLink(childGroup, 'login');
  console.log(id);
  return { id, login };
  // console.log(JSON.stringify(child, null, 2));
};
