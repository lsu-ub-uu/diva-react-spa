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
 */

import 'dotenv/config';
import type { DataListWrapper } from '@/.server/cora/cora-data/CoraData';
import { transformCoraTexts } from '@/.server/cora/transform/transformTexts';
import { transformMetadata } from '@/.server/cora/transform/transformMetadata';
import { listToPool } from '@/utils/structs/listToPool';
import type {
  BFFGuiElement,
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '@/.server/cora/transform/bffTypes';
import { transformCoraPresentations } from '@/.server/cora/transform/transformPresentations';
import { transformCoraValidationTypes } from '@/.server/cora/transform/transformValidationTypes';
import { transformCoraRecordTypes } from '@/.server/cora/transform/transformRecordTypes';
import type { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import { transformCoraSearch } from '@/.server/cora/transform/transformCoraSearch';
import { transformLoginUnit } from '@/.server/cora/transform/transformLoginUnit';
import { transformLogin } from '@/.server/cora/transform/transformLogin';
import { getRecordDataListByType } from '@/.server/cora/getRecordDataListByType';

const getPoolsFromCora = (poolTypes: string[]) => {
  const promises = poolTypes.map((type) =>
    getRecordDataListByType<DataListWrapper>(type, ''),
  );
  return Promise.all(promises);
};

const dependencies: Dependencies = {
  metadataPool: listToPool<BFFMetadata>([]),
  presentationPool: listToPool<BFFPresentation>([]),
  recordTypePool: listToPool<BFFRecordType>([]),
  textPool: listToPool<BFFText>([]),
  validationTypePool: listToPool<BFFValidationType>([]),
  searchPool: listToPool<BFFSearch>([]),
  loginUnitPool: listToPool<BFFLoginUnit>([]),
  loginPool: listToPool<BFFLoginWebRedirect>([]),
};

const loadStuffOnServerStart = async () => {
  const response = await getRecordDataListByType<DataListWrapper>('text');
  const texts = transformCoraTexts(response.data);

  const types = [
    'metadata',
    'presentation',
    'validationType',
    'guiElement',
    'recordType',
    'search',
    'loginUnit',
    'login',
  ];
  const result = await getPoolsFromCora(types);

  const metadata = transformMetadata(result[0].data);
  const metadataPool = listToPool<BFFMetadata>(metadata);
  const presentation = transformCoraPresentations(result[1].data);
  const guiElements = transformCoraPresentations(result[3].data);

  const presentationPool = listToPool<
    BFFPresentationBase | BFFPresentationGroup | BFFGuiElement
  >([...presentation, ...guiElements]);

  const validationTypes = transformCoraValidationTypes(result[2].data);
  const validationTypePool = listToPool<BFFValidationType>(validationTypes);

  const recordTypes = transformCoraRecordTypes(result[4].data);
  const recordTypePool = listToPool<BFFRecordType>(recordTypes);

  const search = transformCoraSearch(result[5].data);
  const searchPool = listToPool<BFFSearch>(search);

  const loginUnit = transformLoginUnit(result[6].data);
  const loginUnitPool = listToPool<BFFLoginUnit>(loginUnit);

  const login = transformLogin(result[7].data);
  const loginPool = listToPool<BFFLoginWebRedirect | BFFLoginPassword>(login);

  dependencies.validationTypePool = validationTypePool;
  dependencies.recordTypePool = recordTypePool;
  dependencies.metadataPool = metadataPool;
  dependencies.presentationPool = presentationPool;
  dependencies.textPool = listToPool<BFFText>(texts);
  dependencies.searchPool = searchPool;
  dependencies.loginUnitPool = loginUnitPool;
  dependencies.loginPool = loginPool;
};
export { dependencies, loadStuffOnServerStart };
