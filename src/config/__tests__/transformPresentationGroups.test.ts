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

import emptyDataList from '../../__mocks__/emptyDataList.json';
import coraPresentationGroup from '../../__mocks__/coraPresentationGroup.json';
import coraPresentationGroupWithMinNumberOfRepeatingToShow from '../../__mocks__/coraPresentationGroupWithMinNumberOfRepeatingToShow.json';

import { transformCoraPresentationGroups } from '../transformPresentationGroups';

describe('transformTexts', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraPresentationGroups(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('Should return one BFFPresentationGroup entry', () => {
    const transformData = transformCoraPresentationGroups(coraPresentationGroup);
    expect(transformData).toHaveLength(1);
  });

  it('Returns one BFFPresentation for one entry', () => {
    const transformData = transformCoraPresentationGroups(coraPresentationGroup);
    expect(transformData[0]).toStrictEqual({
      id: 'someNewPGroup',
      presentationOf: 'someNewGroup',
      mode: 'input',
      children: [
        { childId: 'demoText', type: 'text' },
        { childId: 'recordInfoNewPGroup', type: 'presentation' },
        { childId: 'bookTitleTextVarText', type: 'text' },
        { childId: 'bookTitleTextVarPVar', type: 'presentation' }
      ]
    });
  });

  it('Returns one BFFPresentation for one entry with minNumberOfRepeatingToShow', () => {
    const transformData = transformCoraPresentationGroups(
      coraPresentationGroupWithMinNumberOfRepeatingToShow
    );
    expect(transformData[0]).toStrictEqual({
      id: 'someNewPGroup',
      presentationOf: 'someNewGroup',
      mode: 'input',
      children: [
        { childId: 'demoText', type: 'text' },
        { childId: 'recordInfoNewPGroup', type: 'presentation' },
        { childId: 'bookTitleTextVarText', type: 'text' },
        { childId: 'bookTitleTextVarPVar', type: 'presentation', minNumberOfRepeatingToShow: '99' }
      ]
    });
  });
});
