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

import { ActionLink } from '../utils/cora-data/CoraData';

export interface BFFRecordLink {
  name: string;
  recordType: string | undefined;
  id: string | undefined;
  readLink?: ActionLink;
}

export interface BFFBase {
  id: string;
}

export interface BFFRecordType extends BFFBase {}

export abstract interface BFFMetadata extends BFFBase {
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

export interface BFFAttributeReference {
  refCollectionVarId: string;
}

export interface BFFMetadataTextVariable extends BFFMetadata {
  regEx: string;
  finalValue?: string;
  attributeReferences?: BFFAttributeReference[];
}

export interface BFFMetadataNumberVariable extends BFFMetadata  {
  min: string;
  max: string;
  warningMin: string;
  warningMax: string;
  numberOfDecimals: string;
  finalValue?: string;
  attributeReferences?: BFFAttributeReference[];
}

export interface BFFMetadataCollectionVariable extends BFFMetadata  {
  refCollection: string;
  finalValue?: string;
  attributeReferences?: BFFAttributeReference[];
}

export interface BFFCollectionItemReference {
  refCollectionItemId: string;
}

export interface BFFMetadataItemCollection {
  id: string;
  nameInData: string;
  type: string;
  textId: string;
  defTextId: string;
  collectionItemReferences: BFFCollectionItemReference[];
}

export interface BFFMetadataGroup extends BFFMetadata {
  children: BFFMetadataChildReference[];
}

export interface BFFMetadataChildReference {
  childId: string;
  repeatMin: string;
  repeatMax: string;
  recordPartConstraint?: 'write' | 'readWrite';
}

export interface BFFPresentation extends BFFBase {
  // Types below are a little bit weird, metadata definitions needs to checked up on (attributes)
  type: 'pGroup' | 'pVar' | 'pNumVar' | 'pCollVar' | 'container' | 'pRecordLink' | 'pResourceLink' | 'presentation';
  presentationOf: string;
  mode: 'input' | 'output';
  inputType?: string;
  emptyTextId?: string;
  specifiedLabelTextId?: string;
  showLabel?: string;
}

export interface BFFPresentationGroup extends BFFPresentation {
  presentationOf: string;
  mode: 'input' | 'output';
  children: BFFPresentationChildReference[];
}

export interface BFFPresentationChildReference {
  childId: string;
  type: 'text' | 'presentation' | 'guiElement';
  minNumberOfRepeatingToShow?: string;
  textStyle?: string;
  childStyle?: string[];
  presentationSize?: string;
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
