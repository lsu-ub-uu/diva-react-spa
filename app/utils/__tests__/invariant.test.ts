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

import { invariant } from '@/utils/invariant';
import * as cdu from '@/.server/cora/cora-data/CoraDataUtils';

describe('invariant', () => {
  it('does not throw error', () => {
    const validationType = 'someValidationType'
    const throwMessage = 'Record has no validation type'
    const actual = invariant(validationType, throwMessage);
    expect(actual).toBe(undefined)
  })
  it('does throw error', () => {
    const customMessage = 'Value is not defined.';
    expect(() => invariant(null)).toThrow('Invariant. Value is not defined.');
    expect(() => invariant(undefined)).toThrow('Invariant. Value is not defined.');
    expect(() => invariant(null, customMessage)).toThrow(customMessage);
  })
})
