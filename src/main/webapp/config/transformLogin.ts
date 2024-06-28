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

import { DataListWrapper, RecordWrapper } from '../utils/cora-data/CoraData';
import { BFFLoginPassword, BFFLoginWebRedirect } from './bffTypes';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { createFormDefinition } from '../formDefinition/formDefinition';
import { dependencies } from './configureServer';

export const transformLogin = (
  dataListWrapper: DataListWrapper
): (BFFLoginWebRedirect | BFFLoginPassword)[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoraLoginToBFFLogin).filter((item) => item !== undefined);
};
//
const transformCoraLoginToBFFLogin = (
  coraRecordWrapper: RecordWrapper
): BFFLoginWebRedirect | BFFLoginPassword => {
  const coraRecord = coraRecordWrapper.record;

  const dataRecordGroup = coraRecord.data;

  const { attributes } = dataRecordGroup;
  const type = attributes?.type as string;
  const id = extractIdFromRecordInfo(dataRecordGroup);

  if (type === 'webRedirect') {
    const url = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'url');
    const loginName = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'loginName');
    return { id, loginName, url, type } as BFFLoginWebRedirect;
  }

  const description = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'description');
  const formDef = createFormDefinition(dependencies, 'loginPassword', 'create');
  return {
    id,
    type,
    metadata: '',
    presentation: formDef,
    description
  };
};
