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
import axios from 'axios';
import { RecordFormSchema } from '@/components/FormGenerator/types';
import { getRecordInfo, getValueFromRecordInfo } from '@/utils/getRecordInfo';
import { Auth } from '@/features/auth/authSlice';

export const createRecord = async (
  formDefinition: RecordFormSchema,
  record: CoraRecord,
  auth: Auth,
) => {
  const response = await axios.post(
    `/record/${formDefinition?.validationTypeId}`,
    record,
    { headers: { Authtoken: auth.data.token } },
  );
  const recordInfo = getRecordInfo(response.data);
  const id = getValueFromRecordInfo(recordInfo, 'id')[0].value;
  const recordType = getValueFromRecordInfo(recordInfo, 'type')[0].value;

  return { id, recordType, data: response.data };
};
