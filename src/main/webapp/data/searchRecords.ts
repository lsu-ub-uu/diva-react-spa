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

import axios from 'axios';
import { CoraSearchResult } from '@/features/record/types';
import { Auth } from '@/types/Auth';
import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';
import { FormMetaData } from '@/data/formDefinition/formDefinition';
import { BFFMetadataGroup } from '@/cora/transform/bffTypes';
import {
  createBFFMetadataReference,
  createMetaDataFromChildReference,
} from '@/data/formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { transformToCoraData } from '@/cora/transform/transformToCora';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType';
import { DataGroup, DataListWrapper } from '@/cora/cora-data/CoraData';

export const searchRecords = async (
  dependencies: Dependencies,
  searchType: string,
  query: any,
  auth?: Auth,
) => {
  const response = await axios.get(
    `/search/advanced/${searchType}?query=${encodeURIComponent(JSON.stringify(query))}`,
    auth ? { headers: { Authtoken: auth.data.token } } : undefined,
  );

  if (!dependencies.searchPool.has(searchType)) {
    throw new Error(`Search [${searchType}] does not exist`);
  }

  const searchName = dependencies.searchPool.get(searchType);

  const searchMetadata = createSearchMetaData(
    dependencies,
    searchName.metadataId,
  );
  const formMetaDataPathLookup = createFormMetaDataPathLookup(searchMetadata);
  const transformData = transformToCoraData(formMetaDataPathLookup, query);

  const response = await getSearchResultDataListBySearchType<DataListWrapper>(
    searchType,
    transformData[0] as DataGroup,
    auth?.data.token,
  );

  const transformedRecords = transformRecords(dependencies, response.data);

  const { fromNo, toNo, totalNo, containDataOfType } = response.data.dataList;

  transformedRecords.forEach((transformedRecord) => {
    const recordType = dependencies.recordTypePool.get(
      transformedRecord.recordType,
    );
    const { listPresentationViewId } = recordType;

    const presentationGroup = dependencies.presentationPool.get(
      listPresentationViewId,
    );
    const metadataGroup = dependencies.metadataPool.get(
      presentationGroup.presentationOf,
    ) as BFFMetadataGroup;
    transformedRecord.presentation = createLinkedRecordDefinition(
      dependencies,
      metadataGroup,
      presentationGroup,
    );
  });
  return response.data as CoraSearchResult;
};

const createSearchMetaData = (
  dependencies: Dependencies,
  id: string,
): FormMetaData => {
  const { metadataPool } = dependencies;
  const metadata = metadataPool.get(id);

  const metadataGroup: BFFMetadataGroup = metadataPool.get(
    metadata.id,
  ) as BFFMetadataGroup;

  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  return createMetaDataFromChildReference(formRootReference, metadataPool);
};
