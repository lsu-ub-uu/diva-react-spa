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
 */

import { CoraRecord } from '@/features/record/types';

import { RecordFormSchema } from '@/components/FormGenerator/types';
import { getRecordInfo, getValueFromRecordInfo } from '@/utils/getRecordInfo';
import { Auth } from '@/types/Auth';
import { createFormMetaData } from '../../../../bff/src/main/webapp/formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '../../../../bff/src/main/webapp/utils/structs/metadataPathLookup';
import { transformToCoraData } from '../../../../bff/src/main/webapp/config/transformToCora';
import { cleanJson } from '../../../../bff/src/main/webapp/utils/structs/removeEmpty';
import { postRecordData } from '../../../../bff/src/main/webapp/cora/record';
import { transformRecord } from '../../../../bff/src/main/webapp/config/transformRecord';
import {
  RecordWrapper,
  DataGroup,
} from '../../../../bff/src/main/webapp/utils/cora-data/CoraData';

export const createRecord = async (
  pool: any,
  formDefinition: RecordFormSchema,
  record: CoraRecord,
  auth: Auth,
) => {
  const validationTypeId = formDefinition.validationTypeId;
  const { validationTypePool } = pool;

  const recordType =
    validationTypePool.get(validationTypeId).validatesRecordTypeId;

  if (!validationTypePool.has(validationTypeId)) {
    throw new Error(`Validation type [${validationTypeId}] does not exist`);
  }

  const FORM_MODE_NEW = 'create';

  const formMetaData = createFormMetaData(
    pool,
    validationTypeId,
    FORM_MODE_NEW,
  );
  const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
  const payload = cleanJson(record);
  const transformData = transformToCoraData(formMetaDataPathLookup, payload);

  const response = await postRecordData<RecordWrapper>(
    transformData[0] as DataGroup,
    recordType,
    auth.data.token,
  );

  const createdRecord = transformRecord(pool, response.data);

  const recordInfo = getRecordInfo(createdRecord);
  const id = getValueFromRecordInfo(recordInfo, 'id')[0].value;

  return { id, recordType, data: createdRecord };
};
