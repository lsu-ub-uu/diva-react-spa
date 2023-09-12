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

export interface BFFBase {
  id: string;
}

export interface BFFRecordType extends BFFBase {}

export interface BFFMetadata extends BFFBase {
  nameInData: string;
  type:
    | 'group'
    | 'numberVariable'
    | 'resourceLink'
    | 'collectionItem'
    | 'recordLink'
    | 'textVariable'
    | 'collectionVariable'
    | 'itemCollection';
  textId: string;
  defTextId: string;
}
export interface BFFMetadataTextVariable extends BFFMetadata {
  regEx: string;
  finalValue?: string;
}
export interface BFFMetadataGroup extends BFFMetadata {
  children: unknown[];
  repeatMin: string;
  repeatMax: string;
}

export interface BFFPresentation extends BFFBase {
  presentationOf: string;
  mode: 'input' | 'output';
  inputType: string;
  emptyTextId: string;
}
export interface BFFPresentationGroup extends BFFBase {
  presentationOf: string;
  mode: 'input' | 'output';
}

export interface BFFText extends BFFBase {
  sv: string;
  en?: string;
}

export interface BFFValidationType extends BFFBase {
  validatesRecordTypeId: string;
  newMetadataGroupId: string;
  metadataGroupId: string;
  newPresentationGroupId: string;
  presentationGroupId: string;
  nameTextId: string;
  defTextId: string;
}
