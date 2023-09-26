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
import presentationListWithTwoPNumVar from '../../__mocks__/coraPresentationWithTwoNumberVariables.json';
import coraPresentationGroupWithMissingEmptyTextId from '../../__mocks__/coraPresentationGroupWithMissingEmptyTextId.json';
import coraPresentationGroup from '../../__mocks__/coraPresentationGroup.json';
import coraPresentationGroupWithMinNumberOfRepeatingToShow from '../../__mocks__/coraPresentationGroupWithMinNumberOfRepeatingToShow.json';
import coraPresentationWithMiscTypes from '../../__mocks__/coraPresentationWithMiscTypes.json';
import { DataListWrapper } from '../../utils/cora-data/CoraData';

describe('transformCoraPresentations', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraPresentations(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('Returns two BFFPresentation of type pVar', () => {
    const transformData = transformCoraPresentations(presentationListWithTwoPVars);
    expect(transformData).toHaveLength(2);
  });

  it('Returns one BFFPresentation for one pVar entry', () => {
    const transformData = transformCoraPresentations(presentationListWithTwoPVars);
    expect(transformData[0]).toStrictEqual({
      id: 'someTextVarPVar',
      type: 'pVar',
      presentationOf: 'someTextVar',
      mode: 'input',
      inputType: 'someInputType',
      emptyTextId: 'somePlaceholderText'
    });
  });

  it('Returns one BFFPresentation for one pNumVar entry', () => {
    const transformData = transformCoraPresentations(presentationListWithTwoPNumVar);
    expect(transformData[0]).toStrictEqual({
      id: 'someTextVarPNumVar',
      type: 'pNumVar',
      presentationOf: 'someNumberVar',
      mode: 'input',
      emptyTextId: 'somePlaceholderText'
    });
  });

  it('Returns one BFFPresentation for one pVar with missing emptyTextId', () => {
    const transformData = transformCoraPresentations(coraPresentationGroupWithMissingEmptyTextId);
    expect(transformData[0]).toStrictEqual({
      id: 'someTextVarPVar',
      type: 'pVar',
      presentationOf: 'someTextVar',
      mode: 'input',
      inputType: 'someInputType'
    });
  });

  // Groups testing

  it('Should return one BFFPresentationGroup entry', () => {
    const transformData = transformCoraPresentations(coraPresentationGroup);
    expect(transformData).toHaveLength(1);
  });

  it('Returns one BFFPresentationGroup for one entry', () => {
    const transformData = transformCoraPresentations(coraPresentationGroup);
    expect(transformData[0]).toStrictEqual({
      id: 'someNewPGroup',
      presentationOf: 'someNewGroup',
      mode: 'input',
      children: [
        { childId: 'demoText', type: 'text', textStyle: 'h1TextStyle', childStyles: [] },
        { childId: 'recordInfoNewPGroup', type: 'presentation', childStyles: [] },
        { childId: 'bookTitleTextVarText', type: 'text', childStyles: [] },
        { childId: 'bookTitleTextVarPVar', type: 'presentation', childStyles: [] }
      ]
    });
  });

  it('Returns one BFFPresentationGroup for one entry with minNumberOfRepeatingToShow', () => {
    const transformData = transformCoraPresentations(
      coraPresentationGroupWithMinNumberOfRepeatingToShow
    );
    expect(transformData[0]).toStrictEqual({
      id: 'someNewPGroup',
      presentationOf: 'someNewGroup',
      mode: 'input',
      children: [
        {
          childId: 'demoText',
          type: 'text',
          textStyle: 'h1TextStyle',
          presentationSize: 'firstSmaller',
          childStyles: []
        },
        { childId: 'recordInfoNewPGroup', type: 'presentation', childStyles: [] },
        { childId: 'bookTitleTextVarText', type: 'text', childStyles: [] },
        {
          childId: 'bookTitleTextVarPVar',
          minNumberOfRepeatingToShow: '99',
          textStyle: 'h5TextStyle',
          type: 'presentation',
          childStyles: ['5', '3']
        }
      ]
    });
  });

  it('Returns only BFFPresentationGroup and BFFPresentation (pVar) entries and skips other types', () => {
    const transformData = transformCoraPresentations(
      coraPresentationWithMiscTypes as DataListWrapper
    );

    expect(transformData).toHaveLength(3);
  });
});
