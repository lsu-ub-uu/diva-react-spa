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
import { DataGroup, DataListWrapper, RecordWrapper } from '../utils/cora-data/CoraData';
import { BFFLoginUnit, BFFLoginWebRedirect } from './bffTypes';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';
import { getFirstDataGroupWithNameInData } from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractAttributesReferences } from './transformMetadata';

export const transformLogin = (dataListWrapper: DataListWrapper): BFFLoginWebRedirect[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoraLoginToBFFLogin).filter((item) => item !== undefined);
};
//
const transformCoraLoginToBFFLogin = (coraRecordWrapper: RecordWrapper): BFFLoginWebRedirect => {
  const coraRecord = coraRecordWrapper.record;

  const dataRecordGroup = coraRecord.data;

  const id = extractIdFromRecordInfo(dataRecordGroup);
  const loginName = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'loginName');
  const url = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'url');
  const { attributes } = dataRecordGroup;
  const type = attributes?.type as string;
  return { id, loginName, url, type };
};
