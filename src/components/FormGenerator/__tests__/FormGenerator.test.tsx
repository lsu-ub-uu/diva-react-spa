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

import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { formDef } from '../../../__mocks__/data/formDef';
import { FormGenerator } from '../FormGenerator';

/**
 * @vitest-environment jsdom
 */

describe('<FormGenerator />', () => {
  test('Renders a form from a given definition', () => {
    render(<FormGenerator formSchema={formDef} />);
    const inputElement = screen.getByPlaceholderText('someEmptyTextId');
    expect(inputElement).toBeInTheDocument();

    const headerElement = screen.getByText('someHeadlineTextId');
    expect(headerElement).toBeInTheDocument();
  });
});
