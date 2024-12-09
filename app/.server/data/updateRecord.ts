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

import { BFFDataRecord } from '@/types/record';
import { Auth } from '@/types/Auth';
import { createFormMetaData } from '@/.server/data/formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { transformToCoraData } from '@/.server/cora/transform/transformToCora';
import { DataGroup, RecordWrapper } from '@/.server/cora/cora-data/CoraData';
import { transformRecord } from '@/.server/cora/transform/transformRecord';
import { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import { updateRecordDataById } from '@/.server/cora/updateRecordDataById';

export const updateRecord = async (
  dependencies: Dependencies,
  validationTypeId: string,
  recordId: string,
  data: BFFDataRecord,
  auth: Auth,
) => {
  const { validationTypePool } = dependencies;
  const recordType =
    validationTypePool.get(validationTypeId).validatesRecordTypeId;
  if (!validationTypePool.has(validationTypeId)) {
    throw new Error(`Validation type [${validationTypeId}] does not exist`);
  }

  const FORM_MODE_UPDATE = 'update';

  const formMetaData = createFormMetaData(
    dependencies,
    validationTypeId,
    FORM_MODE_UPDATE,
  );
  const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);

  const transformData = transformToCoraData(formMetaDataPathLookup, data);

  const response = await updateRecordDataById<RecordWrapper>(
    recordId,
    transformData[0] as DataGroup,
    recordType,
    auth.data.token,
  );

  const record = transformRecord(dependencies, response.data);

  return record as BFFDataRecord;
};