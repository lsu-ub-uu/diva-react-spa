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

import { Dependencies } from '../../formDefinition/formDefinitionsDep';
import { listToPool } from '../../utils/structs/listToPool';
import {
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFPresentation,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType
} from '../../config/bffTypes';
import { createLoginDefinition } from '../loginDefinition';

describe('loginDefinition', () => {
  let dependencies: Dependencies;

  beforeEach(() => {
    const loginUnitPool = listToPool<BFFLoginUnit>([
      {
        id: 'someLoginUnitId',
        login: 'someLoginDiVAwr',
        loginDescription: 'someDiVALoginUnitText'
      },
      {
        id: 'someOtherLoginUnitId',
        login: 'someOtherLoginDiVAwr',
        loginDescription: 'someDiVALoginUnitText2'
      },
      {
        id: 'someThirdLoginUnitId',
        login: 'uppsalaLDAP',
        loginDescription: 'someDiVALoginUnitText2'
      }
    ]);
    const loginPool = listToPool<BFFLoginWebRedirect | BFFLoginPassword>([
      {
        id: 'someLoginDiVAwr',
        loginName: 'DiVA Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      },
      {
        id: 'someOtherLoginDiVAwr',
        loginName: 'DiVA Other Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      },
      {
        id: 'uppsalaLDAP',
        metadata: 'someMetadata',
        presentation: 'somePresentation',
        url: 'http://www.google.se',
        type: 'ldap'
      }
    ]);

    dependencies = {
      textPool: listToPool<BFFText>([]),
      validationTypePool: listToPool<BFFValidationType>([]),
      metadataPool: listToPool<BFFMetadata>([]),
      presentationPool: listToPool<BFFPresentation | BFFPresentationGroup>([]),
      recordTypePool: listToPool<BFFRecordType>([]),
      searchPool: listToPool<BFFSearch>([]),
      loginUnitPool,
      loginPool
    };
  });

  it('should generate a object from loginUnits and logins', () => {
    const result = [
      {
        loginDescription: 'someDiVALoginUnitText',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      },
      {
        loginDescription: 'someDiVALoginUnitText2',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect'
      },
      {
        loginDescription: 'someDiVALoginUnitText2',
        type: 'ldap',
        url: 'http://www.google.se'
      }
    ];

    const actual = createLoginDefinition(dependencies);
    expect(actual).toStrictEqual(result);
  });
});
