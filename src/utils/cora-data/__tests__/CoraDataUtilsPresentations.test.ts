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

describe('converting childStyles to gridColspan', () => {
  it('should be able to convert one threeChildStyle to grid col span to be number 3', () => {
    const styles = ['threeChildStyle'];
    const expected = 3;
    const gridColSpan = convertStylesToGridColSpan(styles);
    expect(gridColSpan).toStrictEqual(expected);
  });

  it('should be able to convert one twelveChildStyle to grid col span to be number 12', () => {
    const styles = ['twelveChildStyle'];
    const expected = 12;
    const gridColSpan = convertStylesToGridColSpan(styles);
    expect(gridColSpan).toStrictEqual(expected);
  });

  it('should be able to convert empty childStyle to grid col span to be default number 12', () => {
    const styles: string[] = [];
    const expected = 12;
    const gridColSpan = convertStylesToGridColSpan(styles);
    expect(gridColSpan).toStrictEqual(expected);
  });

  it('should be able to convert childStyle containing other settings to grid col span to be default number 12', () => {
    const styles: string[] = ['inline', 'frame'];
    const expected = 12;
    const gridColSpan = convertStylesToGridColSpan(styles);
    expect(gridColSpan).toStrictEqual(expected);
  });

  it('should be able to convert childStyle containing other settings and a fiveChildStyle to grid col span to be default number 5', () => {
    const styles: string[] = ['inline', 'frame', 'fiveChildStyle'];
    const expected = 5;
    const gridColSpan = convertStylesToGridColSpan(styles);
    expect(gridColSpan).toStrictEqual(expected);
  });

  it('should be able to convert childStyle containing other settings and multiple numberChildStyle to take the first being 2', () => {
    const styles: string[] = ['inline', 'twoChildStyle', 'frame', 'fiveChildStyle'];
    const expected = 2;
    const gridColSpan = convertStylesToGridColSpan(styles);
    expect(gridColSpan).toStrictEqual(expected);
  });
});
