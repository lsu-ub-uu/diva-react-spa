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
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  formDef,
  formDefWithOneNumberVariable,
  formDefWithOneNumberVariableHavingDecimals,
  formDefWithOneTextVariable,
  formDefWithOneTextVariableWithMinNumberOfRepeatingToShow,
  formDefWithOneTextVariableHavingFinalValue,
  formDefWithOneCollectionVariable,
  formDefWithOneNumberVariableWithAttributeCollection,
  formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero,
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithOneNumberVariableAndGuiElementLink,
} from '../../../__mocks__/data/formDef';
import { FormGenerator } from '../FormGenerator';
import { FormSchema } from '../types';

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

  describe('form', () => {
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
      expect(submitButton).toBeInTheDocument();

      const inputElement = screen.getByPlaceholderText('someEmptyTextId');

      expect(inputElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputElement, 'a');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('textVariable', () => {
    test('Renders a form with TextVariable and validates it correctly and does not call the submit', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDef as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const inputElement = screen.getByRole('textbox', {
        name: 'someLabelTextId',
      });

      const user = userEvent.setup();
      await user.type(inputElement, 'does not validate');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    test('Renders a form with TextVariable and sets a finalValue', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneTextVariableHavingFinalValue as FormSchema}
        />,
      );
      const inputElement = screen.getByPlaceholderText('someEmptyTextId');
      expect(inputElement).toHaveValue('someFinalValue');
    });
  });

  describe('numberVariable', () => {
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

    test('Validates numberVariable being  outside the min interval', async () => {
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
      await user.type(inputNumberElement, '0');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    test('Validates numberVariable being outside the max interval', async () => {
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
      await user.type(inputNumberElement, '21');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    test('Validates numberVariable to have correct number of decimals', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableHavingDecimals as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '12.0123');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    test('Validates numberVariable to have decimals with two zeros', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableHavingDecimals as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '12.00');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('minNumberOfRepeatingToShow', () => {
    it('should render number of inputs based on repeatMin', () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShow as FormSchema
          }
        />,
      );

      const inputElements = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements).toHaveLength(2);
    });
  });

  describe('repeatMax', () => {
    it('Add button should be disabled when repeatMax is reached', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShow as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const buttonElement = screen.getByRole('button', {
        name: 'Add someNameInData',
      });

      const inputElements = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements).toHaveLength(2);

      const user = userEvent.setup();
      await user.click(buttonElement);

      const inputElements2 = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements2).toHaveLength(3);

      expect(buttonElement).toBeDisabled();
    });

    it('Move buttons should NOT be rendered when repeatMax is less or equal to one', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const removeButtonElement = screen.queryByLabelText('delete');
      expect(removeButtonElement).toBeInTheDocument();

      const moveUpButtonElement = screen.queryByLabelText('up');
      expect(moveUpButtonElement).not.toBeInTheDocument();

      const moveDownButtonElement = screen.queryByLabelText('down');
      expect(moveDownButtonElement).not.toBeInTheDocument();
    });
  });

  describe('repeatMin', () => {
    it('Remove buttons should be disabled when repeatMin is reached', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShow as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const removeButtonElements = screen.getAllByLabelText('delete');

      expect(removeButtonElements).toHaveLength(2);
      expect(removeButtonElements[0]).toBeDisabled();
      expect(removeButtonElements[1]).toBeDisabled();
    });

    it('Remove button should be visible when repeatMin is zero and minNumberOfRepeatingToShow is 1', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const removeButtonElements = screen.getAllByLabelText('delete');

      expect(removeButtonElements).toHaveLength(1);
      expect(removeButtonElements[0]).toBeEnabled();
    });
  });

  describe('collectionVariable', () => {
    it('Renders a form with collectionVariable and all its options', async () => {
      const mockSubmit = vi.fn();
      const { container } = render(
        <FormGenerator
          formSchema={formDefWithOneCollectionVariable as FormSchema}
          onSubmit={mockSubmit}
        />,
      );

      const selectInputs = container.getElementsByClassName(
        'MuiSelect-nativeInput',
      );

      expect(selectInputs).toHaveLength(1);
    });

    it('Renders a form with collectionVariable and validates it correctly and calls submit', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithOneCollectionVariable as FormSchema}
          onSubmit={mockSubmit}
        />,
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });

      const expandButton = screen.getByRole('button', { expanded: false });
      expect(expandButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(expandButton);
      const items = screen.getByRole('listbox');

      expect(items.children).toHaveLength(4); // includes None option

      await user.selectOptions(items, 'exampleBlueItemText');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('Renders a form with collectionVariable and validates it falsy and does not call submit', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithOneCollectionVariable as FormSchema}
          onSubmit={mockSubmit}
        />,
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });
  });

  describe('attribute collection', () => {
    it('renders a form with numberVariable and attribute collection selectBox and validates it', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneNumberVariableWithAttributeCollection as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const numberInput = screen.getByPlaceholderText('someEmptyTextId');
      expect(numberInput).toBeInTheDocument();

      const expandButton = screen.getByRole('button', { expanded: false });
      expect(expandButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(expandButton);
      const listBoxElement = screen.getByRole('listbox');

      expect(listBoxElement.children).toHaveLength(4);

      await user.selectOptions(listBoxElement, '<em>option.none</em>');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });
  });

  describe('group', () => {
    it('renders a form with group and renders its textVariable child', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneGroupHavingTextVariableAsChild as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const textInput = screen.getByPlaceholderText('someEmptyTextId');
      expect(textInput).toBeInTheDocument();
    });
  });

  describe('guiElementLink', () => {
    it('renders a form with numberVariable and a gui element link', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneNumberVariableAndGuiElementLink as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const link = screen.getByRole('link');

      expect(link).toHaveAttribute('href', 'http://www.google.se');
    });
  });
});
