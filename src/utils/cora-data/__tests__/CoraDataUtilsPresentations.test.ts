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

import { convertStylesToGridColSpan } from '../CoraDataUtilsPresentations';
import { removeEmpty } from '../../structs/removeEmpty';

function convertStylesToBFFStyles(styles: string[]) {
  const DEFAULT_COLSPAN: string[] = [];
  const convertedColSpans = styles.length
    ? styles.map((style) => {
        switch (style) {
          case 'compactChildStyle':
            return 'compact';
          case 'frameChildStyle':
            return 'frame';
          case 'blockChildStyle':
            return 'block';
          case 'specificationChildStyle':
            return 'specification';
          case 'rowBasedChildStyle':
            return 'row';
          default:
            return [];
        }
      })
    : [DEFAULT_COLSPAN];

  const cleaned = removeEmpty(convertedColSpans)[0];
  return cleaned ?? DEFAULT_COLSPAN;
}

describe('converting childStyles to gridColspan', () => {
  it.each([
    [['threeChildStyle'], 3],
    [['twelveChildStyle'], 12],
    [[], 12],
    [['inline', 'frame'], 12],
    [['inline', 'frame', 'fiveChildStyle'], 5],
    [['inline', 'twoChildStyle', 'frame', 'fiveChildStyle'], 2]
  ])('should be able to convert childStyle "%s" to grid col span to be %d', (args1, args2) => {
    const styles: string[] = args1;
    const gridColSpan = convertStylesToGridColSpan(styles);
    expect(gridColSpan).toStrictEqual(args2);
  });
  it.each([
    [['compactChildStyle'], 'compact'],
    [['frameChildStyle'], 'frame'],
    [['blockChildStyle'], 'block'],
    [['specificationChildStyle'], 'specification'],
    [['rowBasedChildStyle'], 'row'],
    [[], []]
  ])(
    'should be able to convert presentationStyle "%s" to BFFpresentationStyle to be %s',
    (args1, args2) => {
      const styles: string[] = args1;
      const gridColSpan = convertStylesToBFFStyles(styles);
      expect(gridColSpan).toStrictEqual(args2);
    }
  );
});
