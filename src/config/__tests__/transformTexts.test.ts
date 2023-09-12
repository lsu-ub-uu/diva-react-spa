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
import coraTextWithOneChild from '../../__mocks__/coraTextWithOneChild.json';
import { transformCoraTexts } from '../transformTexts';

describe('transformTexts', () => {

  it('Empty list should return empty list', () => {
    const transformData = transformCoraTexts(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('Returns one text entry', () => {
    const textDataList = transformCoraTexts(coraTextWithOneChild);
    expect(textDataList).toHaveLength(1);
  });

  it('Returns one text entry with id and sv/en languages', () => {
    const textDataList = transformCoraTexts(coraTextWithOneChild);
    const firstText = textDataList[0];
    expect(firstText).toStrictEqual({
      id: 'someText',
      en: 'This is some text in english',
      sv: 'Det här är nån text på svenska',
    });
  });

});
