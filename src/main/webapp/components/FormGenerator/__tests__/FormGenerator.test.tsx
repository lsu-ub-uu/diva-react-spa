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

import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  formDefWithGroupWithSpecifiedHeadlineLevel,
  formDefWithGroupWithDefaultHeadlineLevel,
  formDefWithOneRepeatingTextVariableWithModeOutput,
  formDefWithOneCollectionVariableWithModeOutput,
  formDefWithOneNumberVariableBeingOptional,
  formDefWithOneTextVariableBeingOptional,
  formDefWithOneRecordLinkBeingOptional,
  formDefWithOneRecordLinkBeingRequired,
  formDefWithOneTextVariableBeingRepeating,
  formDefContributorGroupWithAuthorGroupAuthor,
  formDefWithOneNumberVariableAndOptionalNumberVariableWithAttributeCollection,
  formDefWithOptionalGroupWithRequiredVar,
  formDefWithOneOptionalNumberVariableWithAttributeCollection,
  formDefWithOneGroupWithAttributeCollection,
  formDefWithTwoTextVariableHavingFinalValue,
  formDefWithTwoTextVariableWithModeOutput,
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
    it('Renders a form from a given definition', () => {
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

    it('Renders a form from a given definition and submits it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneTextVariable as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      expect(submitButton).toBeInTheDocument();

      const inputElement = screen.getByPlaceholderText('someEmptyTextId');

      expect(inputElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputElement, 'a');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('form with linked data', () => {
    it('Renders a form from a given definition', () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDef as FormSchema}
          onSubmit={mockSubmit}
          linkedData
        />,
      );
      const inputElement = screen.getByPlaceholderText('someEmptyTextId');
      expect(inputElement).toBeInTheDocument();

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );
      expect(inputNumberElement).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      expect(submitButton).not.toBeInTheDocument();
    });
  });

  describe('recordLink', () => {
    it('Validates recordLink being optional and having minNumberToShow 1!', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneRecordLinkBeingOptional as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('Do not validate an empty recordLink being required', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneRecordLinkBeingRequired as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });
  });

  describe('textVariable', () => {
    it('Renders a form with TextVariable and validates it correctly and does not call the submit', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDef as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      const inputElement = screen.getByRole('textbox', {
        name: 'someLabelTextId',
      });

      const user = userEvent.setup();
      await user.type(inputElement, 'does not validate');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('Renders a form with TextVariable and sets a finalValue', async () => {
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

    it('Renders a form with TextVariable and sets a finalValue 2', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneTextVariableHavingFinalValue as FormSchema}
        />,
      );
      const inputElement = screen.getByPlaceholderText('someEmptyTextId');
      expect(inputElement).toHaveValue('someFinalValue');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();

      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('Renders a form with TextVariable and sets a finalValue 3', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithTwoTextVariableHavingFinalValue as FormSchema}
        />,
      );
      const inputElement = screen.getByPlaceholderText('someEmptyTextId1');
      expect(inputElement).toHaveValue('someFinalValue1');
      const inputElement2 = screen.getByPlaceholderText('someEmptyTextId2');
      expect(inputElement2).toHaveValue('someFinalValue2');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();

      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('Renders a form with TextVariable with mode output', async () => {
      const mockSubmit = vi.fn();
      const coraRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            exampleTextVar: {
              value: 'someTestText',
            },
          },
        },
      };
      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOneRepeatingTextVariableWithModeOutput as FormSchema
          }
          record={coraRecord}
        />,
      );
      const inputElement = screen.getByText('someTestText');
      expect(inputElement).toBeInTheDocument();
    });

    it('Validates textVariable being optional and having minNumberToShow 1!', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneTextVariableBeingOptional as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    test.skip('Validates textVariable being optional with repeatMax > 1 and having minNumberToShow 1!', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneTextVariableBeingRepeating as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('Does not validate a textVariable being optional and having minNumberToShow 1 with bad input', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneTextVariableBeingOptional as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText('someEmptyTextId');

      const user = userEvent.setup();
      await user.type(inputElement, '????'); // enter some invalid text
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('numberVariable', () => {
    it('Renders a form with numberVariable and validates it correctly and does not call the submit', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariable as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, 'does not validate');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('Validates numberVariable being  outside the min interval', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariable as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '0');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('Validates numberVariable being outside the max interval', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariable as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '21');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('Not validating an numberVariable not having correct value', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableBeingOptional as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputNumberElement, 'aaa');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(0);
        expect((inputNumberElement as HTMLInputElement).value).toBe('aaa');
      });
    });

    it('Validates numberVariable to have correct number of decimals', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableHavingDecimals as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '12.0123');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('Validates numberVariable to have decimals with two zeros', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableHavingDecimals as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '12.00');
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('Validates numberVariable being optional and having minNumberToShow 1!', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableBeingOptional as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('Validates numberVariable being optional (having minNumberToShow 1) and the user enters a valid range value ', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableBeingOptional as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );
      expect(inputElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputElement, '10');
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
    it('Add button should not be rendered when repeatMax is reached', async () => {
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
        name: 'someNameInDataLabel',
      });

      const inputElements = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements).toHaveLength(2);

      const user = userEvent.setup();
      await user.click(buttonElement);

      const inputElements2 = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements2).toHaveLength(3);

      expect(buttonElement).not.toBeInTheDocument();
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

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

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

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('Renders a form with CollectionVariable with mode output', async () => {
      const mockSubmit = vi.fn();
      const coraRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            colour: {
              value: 'blue',
            },
          },
        },
      };
      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOneCollectionVariableWithModeOutput as FormSchema
          }
          record={coraRecord}
        />,
      );
      const inputElement = screen.getByText('exampleBlueItemText');
      expect(inputElement.tagName).toBe('SPAN');
    });
  });

  describe('attribute collection', () => {
    it('renders a form with numberVariable and attribute and does NOT validate it when skipped', async () => {
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
      await user.type(numberInput, '12');
      await user.click(expandButton);
      const listBoxElement = screen.getByRole('listbox');

      expect(listBoxElement.children).toHaveLength(4);

      await user.selectOptions(
        listBoxElement,
        '<em>divaClient_optionNoneText</em>',
      );

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a form with numberVariable and attribute and validates it when filled', async () => {
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

      const attributeButton = screen.getByRole('button', { expanded: false });
      expect(attributeButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(numberInput, '12');

      await user.click(attributeButton);
      const listBoxElement = screen.getByRole('listbox');

      expect(listBoxElement.children).toHaveLength(4);
      await user.selectOptions(listBoxElement, 'exampleBlueItemText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a form with a optional numberVariable and attribute and validates it when variable is skipped', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneOptionalNumberVariableWithAttributeCollection as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const numberInput = screen.getByLabelText('someNumberVar2IdLabel');
      expect(numberInput).toBeInTheDocument();
      const attributeButton = screen.getByRole('button', { expanded: false });
      expect(attributeButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(attributeButton);
      const listBoxElement = screen.getByRole('listbox');

      expect(listBoxElement.children).toHaveLength(4);
      await user.selectOptions(listBoxElement, 'exampleBlueItemText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a form with numberVariable and a optional numberVariable and attribute and validates it', async () => {
      it('renders a form with numberVariable and a optional numberVariable and skipable attribute and validates it', async () => {
        const mockSubmit = vi.fn();
        render(
          <FormGenerator
            formSchema={
              formDefWithOneNumberVariableAndOptionalNumberVariableWithAttributeCollection as FormSchema
            }
            onSubmit={mockSubmit}
          />,
        );
        const numberInput = screen.getByLabelText('someNumberVarIdLabel');
        expect(numberInput).toBeInTheDocument();
        const numberInput2 = screen.getByLabelText('someNumberVar2IdLabel');
        expect(numberInput2).toBeInTheDocument();
        const attributeButton = screen.getByRole('button', { expanded: false });
        expect(attributeButton).toBeInTheDocument();

        const user = userEvent.setup();
        await user.type(numberInput, '2');

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });
        await waitFor(() => {
          expect(submitButton).toBeInTheDocument();
        });
        await user.click(submitButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
      });

      it('renders a form with numberVariable and a group with a optional textVariable and attribute and validates it', async () => {
        const mockSubmit = vi.fn();
        render(
          <FormGenerator
            formSchema={
              formDefWithOneGroupWithAttributeCollection as FormSchema
            }
            onSubmit={mockSubmit}
          />,
        );
        const numberInput = screen.getByText('numberVariableLabelText');
        expect(numberInput).toBeInTheDocument();
        const textInput = screen.getByText('textVarLabelText');
        expect(textInput).toBeInTheDocument();
        const attributeButton = screen.getByRole('button', { expanded: false });
        expect(attributeButton).toBeInTheDocument();

        const user = userEvent.setup();
        await user.type(numberInput, '3.33');

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });
        await waitFor(() => {
          expect(submitButton).toBeInTheDocument();
        });
        await user.click(submitButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
      });

      it('renders a form a group with a textVariable and attribute and does not validates the group', async () => {
        const mockSubmit = vi.fn();
        render(
          <FormGenerator
            formSchema={
              formDefWithOneGroupWithAttributeCollection as FormSchema
            }
            onSubmit={mockSubmit}
          />,
        );

        const numberInput = screen.getByText('numberVariableLabelText');
        expect(numberInput).toBeInTheDocument();
        const textInput = screen.getByText('textVarLabelText');
        expect(textInput).toBeInTheDocument();
        const attributeButton = screen.getByRole('button', { expanded: false });
        expect(attributeButton).toBeInTheDocument();

        const user = userEvent.setup();
        await user.type(numberInput, '3.33');
        await user.type(textInput, 'abcd');

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });
        await waitFor(() => {
          expect(submitButton).toBeInTheDocument();
        });
        await user.click(submitButton);

        expect(mockSubmit).toHaveBeenCalledTimes(0);
      });
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

    it('renders a form with non-repeating group and headlineLevel', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithGroupWithSpecifiedHeadlineLevel as FormSchema}
          onSubmit={mockSubmit}
        />,
      );

      const headlineElement = screen.getByRole('heading', {
        name: 'someRootFormGroupText',
        level: 1,
      });
      expect(headlineElement).toBeInTheDocument();
    });

    it('renders a form with repeating group and headlineLevel', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithGroupWithSpecifiedHeadlineLevel as FormSchema}
          onSubmit={mockSubmit}
        />,
      );

      const headlineElement = screen.getByRole('heading', {
        name: 'author',
        level: 3,
      });
      expect(headlineElement).toBeInTheDocument();
    });

    it('renders a form with group and default headlineLevel', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithGroupWithDefaultHeadlineLevel as FormSchema}
          onSubmit={mockSubmit}
        />,
      );

      const headlineElement = screen.getByRole('heading', {
        name: 'author',
        level: 2,
      });
      expect(headlineElement).toBeInTheDocument();
    });

    it('validation should pass a group having min 0 and max 0 and variables being min 1 and max 1', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOptionalGroupWithRequiredVar as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('validation should fail a group having min 1 and max 1 with an empty optional numberVar child', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableBeingOptional as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('validation should fail a group having min 1 and max 1 and some sub groups being optional', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefContributorGroupWithAuthorGroupAuthor as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
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

  describe.skip('checkIfComponentHasValue', () => {
    it('checkIfComponentHasValue hides variable in output with no value', () => {
      const mockSubmit = vi.fn();
      const coraRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            someOtherTextVar: {
              value: 'someTestText',
            },
          },
        },
      };
      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithTwoTextVariableWithModeOutput as FormSchema}
          record={coraRecord}
        />,
      );
      const inputElement = screen.queryByLabelText('someMetadataTextVarText');
      expect(inputElement).not.toBeInTheDocument();
    });

    it('checkIfComponentHasValue does not hides variable in output with value', () => {
      const mockSubmit = vi.fn();
      const coraRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            someOtherTextVar: {
              value: 'someTestText',
            },
          },
        },
      };
      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithTwoTextVariableWithModeOutput as FormSchema}
          record={coraRecord}
        />,
      );
      const inputElement = screen.getByLabelText(
        'someMetadataOtherTextVarText',
      );
      expect(inputElement).toBeInTheDocument();
    });
  });
});
