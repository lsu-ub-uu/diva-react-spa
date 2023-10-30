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
import coraPresentationWithOneCollectionVariable from '../../__mocks__/coraPresentationWithOneCollectionVariable.json';
import coraPresentationWithOneTextVariableHavingSpecifiedLabel from '../../__mocks__/coraPresentationWithOneTextVariableHavingSpecifiedLabel.json';
import coraPresentationWithOneTextVariableHavingShowLabelFalse from '../../__mocks__/coraPresentationWithOneTextVariableHavingShowLabelFalse.json';
import coraPresentationSurroundingContainer from '../../__mocks__/coraPresentationSurroundingContainer.json';
import coraPresentationSurroundingContainerWithTwoVarPresentationsOf from '../../__mocks__/coraPresentationSurroundingContainerWithTwoVarsPresentationsOf.json';
import coraPresentationRepeatingContainer from '../../__mocks__/coraPresentationRepeatingContainer.json';
import coraPresentationWithRecordLink from '../../__mocks__/coraPresentationRecordLink.json';
import { DataListWrapper } from '../../utils/cora-data/CoraData';

describe('transformCoraPresentations', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraPresentations(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  describe('pVar', () => {
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

    it('Returns one BFFPresentation for one pVar entry with specified label', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithOneTextVariableHavingSpecifiedLabel
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'input',
        inputType: 'someInputType',
        emptyTextId: 'somePlaceholderText',
        specifiedLabelTextId: 'someSpecifiedTextVarText'
      });
    });

    it('Returns one BFFPresentation for one pVar entry with label hidden/disabled', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithOneTextVariableHavingShowLabelFalse
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'input',
        inputType: 'someInputType',
        emptyTextId: 'somePlaceholderText',
        showLabel: 'false'
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
  });
  describe('pNumVar', () => {
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

    it('Returns one BFFPresentation for one pNumVar with missing emptyTextId', () => {
      const transformData = transformCoraPresentations(presentationListWithTwoPNumVar);
      expect(transformData[1]).toStrictEqual({
        id: 'someTextVarPNumVar2',
        type: 'pNumVar',
        presentationOf: 'someNumberVar2',
        mode: 'input'
      });
    });
  });

  // Groups testing
  describe('pGroup', () => {
    it('Should return one BFFPresentationGroup entry', () => {
      const transformData = transformCoraPresentations(coraPresentationGroup);
      expect(transformData).toHaveLength(1);
    });

    it('Returns one BFFPresentationGroup for one entry', () => {
      const transformData = transformCoraPresentations(coraPresentationGroup);
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        mode: 'input',
        children: [
          { childId: 'demoText', type: 'text', textStyle: 'h1TextStyle', childStyle: [] },
          { childId: 'recordInfoNewPGroup', type: 'presentation', childStyle: [] },
          { childId: 'bookTitleTextVarText', type: 'text', childStyle: [] },
          { childId: 'bookTitleTextVarPVar', type: 'presentation', childStyle: [] }
        ]
      });
    });

    it('Returns one BFFPresentationGroup for one entry with minNumberOfRepeatingToShow', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupWithMinNumberOfRepeatingToShow
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        mode: 'input',
        children: [
          {
            childId: 'demoText',
            type: 'text',
            textStyle: 'h1TextStyle',
            presentationSize: 'firstSmaller',
            childStyle: []
          },
          { childId: 'recordInfoNewPGroup', type: 'presentation', childStyle: [] },
          { childId: 'bookTitleTextVarText', type: 'text', childStyle: [] },
          {
            childId: 'bookTitleTextVarPVar',
            minNumberOfRepeatingToShow: '99',
            textStyle: 'h5TextStyle',
            type: 'presentation',
            childStyle: ['5', '3']
          }
        ]
      });
    });

    it('Returns only BFFPresentationGroup and BFFPresentation (pGroup, pRecordLink, pNumVar, pVar and pCollVar) entries and skips other types', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithMiscTypes as DataListWrapper
      );

      expect(transformData).toHaveLength(6);
    });
  });
  describe('pCollVar', () => {
    it('Returns one BFFPresentation for one pCollVar entry', () => {
      const transformData = transformCoraPresentations(coraPresentationWithOneCollectionVariable);
      expect(transformData[0]).toStrictEqual({
        id: 'examplePCollVar',
        type: 'pCollVar',
        presentationOf: 'exampleCollectionVar',
        mode: 'input',
        emptyTextId: 'initialEmptyValueText'
      });
    });
  });

  describe('pRecordLink', () => {
    it('Returns one BFFPresentation for one pRecordLink entry', () => {
      const transformData = transformCoraPresentations(coraPresentationWithRecordLink);
      expect(transformData[0]).toStrictEqual({
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'input'
        // TODO linkedRecordPresentations
        // TODO Search
      });
    });
  });

  describe('SContainer', () => {
    it('Returns one BFFPresentation for one SContainer', () => {
      const transformData = transformCoraPresentations(coraPresentationSurroundingContainer);
      expect(transformData[0]).toStrictEqual({
        id: 'labelInputSContainer',
        type: 'container',
        presentationsOf: ['showLabelCollectionVar'],
        mode: 'input',
        children: [
          { childId: 'labelHeadlineText', type: 'text', textStyle: 'h2TextStyle', childStyle: [] },
          { childId: 'showLabelPCollVar', type: 'presentation', childStyle: [] }
        ],
        repeat: 'children'
      });
    });
    it('Returns one BFFPresentation for one SContainer with two vars in presentationsOf', () => {
      const transformData = transformCoraPresentations(
        coraPresentationSurroundingContainerWithTwoVarPresentationsOf
      );
      expect(transformData[0]).toStrictEqual({
        id: 'labelInputSContainer',
        type: 'container',
        presentationsOf: ['showLabelCollectionVar', 'specifiedLabelTextLink'],
        mode: 'input',
        presentationStyle: 'card',
        children: [
          {
            childId: 'labelHeadlineText',
            type: 'text',
            minNumberOfRepeatingToShow: '99',
            childStyle: ['5'],
            textStyle: 'h2TextStyle'
          },
          { childId: 'showLabelPCollVar', type: 'presentation', childStyle: [] },
          { childId: 'specifiedLabelTextPLink', type: 'presentation', childStyle: [] }
        ],
        repeat: 'children'
      });
    });
  });
  describe.skip('RContainer', () => {
    it('Returns one BFFPresentation for one RContainer', () => {
      const transformData = transformCoraPresentations(coraPresentationRepeatingContainer);
      expect(transformData[0]).toStrictEqual({
        id: 'refPresentationTextLinkRContainer',
        type: 'container',
        presentationOf: 'exampleCoordinatesGroup',
        mode: 'input',
        children: [
          // do we need childStyle for Container children?
          { childId: 'exampleCoordinatesPGroup', type: 'presentation' },
          { childId: 'exampleCoordinatesAsMapPGroup', type: 'presentation' }
        ],
        repeat: 'this'
      });
    });
  });
});
