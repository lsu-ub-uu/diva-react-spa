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

import emptyDataList from '../../__mocks__/emptyDataList.json';
import { transformCoraPresentations } from '../transformPresentations';
import presentationListWithTwoPVars from '../../__mocks__/coraPresentationWithTwoTextVariables.json';

describe('transformCoraPresentations', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraPresentations(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('Returns two entries', () => {
    const transformData = transformCoraPresentations(presentationListWithTwoPVars);
    expect(transformData).toHaveLength(2);
  });

  it('Returns one BFFPresentation for one entry', () => {
    const transformData = transformCoraPresentations(presentationListWithTwoPVars);
    expect(transformData[0]).toStrictEqual({
      id: 'someTextVarPVar',
      presentationOf: 'someTextVar',
      mode: 'input',
      inputType: 'someInputType'
    });
  });

})
