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
import { createFormMetaData } from '@/data/formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { transformToCoraData } from '@/cora/transform/transformToCora';
import { cleanJson } from '@/utils/structs/removeEmpty';
import { transformRecord } from '@/cora/transform/transformRecord';
import { RecordWrapper, DataGroup } from '@/cora/cora-data/CoraData';
import { postRecordData } from '@/cora/postRecordData';
import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';

export const createRecord = async (
  dependencies: Dependencies,
  formDefinition: RecordFormSchema,
  record: CoraRecord,
  auth: Auth,
) => {
  const validationTypeId = formDefinition.validationTypeId;
  const { validationTypePool } = dependencies;

  const recordType =
    validationTypePool.get(validationTypeId).validatesRecordTypeId;

  if (!validationTypePool.has(validationTypeId)) {
    throw new Error(`Validation type [${validationTypeId}] does not exist`);
  }

  const FORM_MODE_NEW = 'create';

  const formMetaData = createFormMetaData(
    dependencies,
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

  const createdRecord = transformRecord(dependencies, response.data);

  const recordInfo = getRecordInfo(createdRecord);
  const id = getValueFromRecordInfo(recordInfo, 'id')[0].value;

  return { id, recordType, data: createdRecord };
};
