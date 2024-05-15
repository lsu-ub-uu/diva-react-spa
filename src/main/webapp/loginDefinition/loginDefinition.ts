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

import { Dependencies } from '../formDefinition/formDefinitionsDep';

interface LoginDefinition {
  loginDescription: string;
  url: string;
}
export const createLoginDefinition = (dependencies: Dependencies): LoginDefinition[] => {
  const { loginUnitPool, loginPool } = dependencies;

  const loginItemDefinitions: LoginDefinition[] = [];

  const loginUnitEntries = Array.from(loginUnitPool.entries());

  loginUnitEntries.forEach((login: any) => {
    const { url } = loginPool.get(login[1].login);
    const item = {
      loginDescription: login[1].loginDescription,
      url
    };
    loginItemDefinitions.push(item);
  });
  return loginItemDefinitions;
};
