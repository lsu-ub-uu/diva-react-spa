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

import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  formDef,
  formDefWithOneNumberVariable,
  formDefWithOneTextVariable,
} from '../../../__mocks__/data/formDef';
import { FormGenerator, FormSchema } from '../FormGenerator';

/**
 * @vitest-environment jsdom
 */

describe('<FormGenerator />', () => {
  vi.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: (str: string) => str,
      };
    },
  }));

  test('Renders a form from a given definition', () => {
    const mockSubmit = vi.fn();
    render(
      <FormGenerator
        formSchema={formDef as FormSchema}
        onSubmit={mockSubmit}
      />,
    );
    const inputElement = screen.getByPlaceholderText('someEmptyTextId');
    expect(inputElement).toBeInTheDocument();

    const inputNumberElement = screen.getByPlaceholderText(
      'someNumberPlaceholderTextId',
    );
    expect(inputNumberElement).toBeInTheDocument();

    const headerElement = screen.getByText(
      'presentationTypeTextCollectionVarDefText',
    );
    expect(headerElement).toBeInTheDocument();
  });

  test('Renders a form from a given definition and submits it', async () => {
    const mockSubmit = vi.fn();

    render(
      <FormGenerator
        onSubmit={mockSubmit}
        formSchema={formDefWithOneTextVariable as FormSchema}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const inputElement = screen.getByPlaceholderText('someEmptyTextId');

    const user = userEvent.setup();
    await user.type(inputElement, 'a');
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  test('Renders a form withTextVariable and validates it correctly and does not call the submit', async () => {
    const mockSubmit = vi.fn();

    render(
      <FormGenerator
        onSubmit={mockSubmit}
        formSchema={formDef as FormSchema}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const inputElement = screen.getByPlaceholderText('someEmptyTextId');

    const user = userEvent.setup();
    await user.type(inputElement, 'does not validate');
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(0);
  });

  test('Renders a form with numberVariable and validates it correctly and does not call the submit', async () => {
    const mockSubmit = vi.fn();

    render(
      <FormGenerator
        onSubmit={mockSubmit}
        formSchema={formDefWithOneNumberVariable as FormSchema}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const inputNumberElement = screen.getByPlaceholderText(
      'someNumberPlaceholderTextId',
    );

    const user = userEvent.setup();
    await user.type(inputNumberElement, 'does not validate');
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(0);
  });

  test('Validates numberVariable being in inside the min/max interval', async () => {
    const mockSubmit = vi.fn();

    render(
      <FormGenerator
        onSubmit={mockSubmit}
        formSchema={formDef as FormSchema}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const inputNumberElement = screen.getByPlaceholderText(
      'someNumberPlaceholderTextId',
    );

    const user = userEvent.setup();
    await user.type(inputNumberElement, '1');
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(0);
  });
});
