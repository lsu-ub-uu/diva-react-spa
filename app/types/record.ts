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

import type { FormSchema } from '@/components/FormGenerator/types';

export interface BFFDataRecord {
  id?: string;
  recordType?: string;
  validationType?: string;
  createdAt?: string;
  createdBy?: string;
  updated?: BFFUpdate[];
  userRights?: BFFUserRight[];
  data: {
    [key: string]: Metadata;
  };
  presentation?: FormSchema;
  listPresentation?: FormSchema;
  autoCompletePresentation?: unknown;
}

export type BFFUserRight =
  | 'read'
  | 'read_incoming_links'
  | 'update'
  | 'index'
  | 'delete';

export interface BFFUpdate {
  updateAt: string;
  updatedBy: string;
}

export interface BFFSearchResult {
  data: BFFDataRecord[];
  fromNo: number;
  toNo: number;
  totalNo: number;
  containDataOfType: string;
}

export interface Metadata {
  recordInfo: RecordInfo;
  [key: string]: any;
}

export interface RecordInfo {
  [key: string]: any;
  createdBy?: Value[];
  dataDivider: Value;
  id: Value;
  tsCreated?: Value[];
  type?: Value[];
  updated?: UpdatedGroup[];
  validationType?: Value;
}

interface UpdatedGroup {
  tsUpdated: Value;
  updatedBy: Value;
}

export interface Value {
  value: string;
  [key: string]: any;
}
