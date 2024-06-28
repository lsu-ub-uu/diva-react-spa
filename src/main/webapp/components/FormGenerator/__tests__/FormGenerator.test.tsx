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

import { expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  formDefWithTextVar,
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
  formDefWithOneOptionalNumberVariableWithAttributeCollection,
  formDefWithTwoTextVariableHavingFinalValue,
  formDefWithTwoTextVariableWithModeOutput,
  formDefWithOptionalGroupWithRequiredTextVar,
  formDefWithOptionalGroupWithRequiredNumberVar,
  formDefWithOptionalGroupWithRequiredRecordLink,
  formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar,
  formDefWithOptionalGroupWithMixOptionalAndRequiredTextVars,
  formDefWithOneRequiredNumberVariableWithAttributeCollection,
  formDefWithOneOptionalGroupWithAttributeCollection,
  formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute,
  formDefWithOneOptionalGroupWithTextVariableAndAttributeCollection,
  formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection,
  formDefWithOptionalGroupWithLongitudeAndLatitudeTextVars,
  formDefWithOptionalGroupWithLongitudeAndLatitudeNumberVars,
  formDefWithOptionalGroupWithTwoCollectionVars,
  formDefWithTextVarAndNestedGroupsWithOneTextVar,
  formDefTwoOptionalGroupsWithRequiredTextVars,
  formDefWithOptionalGroupWithRequiredGroupWithRequiredVars,
  formDefWithOneRequiredGroupWithAttributeCollection,
  formDefWithOneNumberVariableModeOutput, loginUnitformDefForLoginUnitWithPassword,
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
    it('renders a form from a given definition', () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithTextVar as FormSchema}
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

    it('renders a form from a given definition does validate it', async () => {
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

    it('renders a form from a given definition does NOT validate it', async () => {
      const mockSubmit = vi.fn();

      const { container } = render(
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
      await user.click(submitButton);

      expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });
  });

  describe('form with linked data', () => {
    it('renders a form with linked data from a given definition', () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithTextVar as FormSchema}
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
    it('renders a recordLink 0-1 and minNumberToShow 1 and validates it', async () => {
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

    it('renders a recordLink 1-1 and does NOT validates it', async () => {
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
    it('renders a textVariable 1-1 and does NOT validate it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithTextVar as FormSchema}
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

    it('renders a multiple textVariables 1-1 with finalValue ', async () => {
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

    it('renders a textVariable 1-1 with mode output', async () => {
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

    it('renders a textVariable 0-1 and minNumberOfRepeatingToShow 1', async () => {
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

    test('renders a textVariable 0-2 and minNumberOfRepeatingToShow 1', async () => {
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

    it('renders a textVariable 0-1, minNumberToShow 1 and bad input', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={loginUnitformDefForLoginUnitWithPassword as FormSchema}
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

    it('renders a textVariable 0-1 as password', async () => {
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

      const inputElement = screen.getByPlaceholderText('loginPasswordTextVarText');

      const user = userEvent.setup();
      await user.type(inputElement, 'password'); // enter some invalid text
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('numberVariable', () => {
    it('renders a numberVariable 1-1 and does NOT validate it', async () => {
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

    it('renders a numberVariable with mode output', async () => {
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
            someNumberVariableNameInData: {
              value: '2',
            },
          },
        },
      };
      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOneNumberVariableModeOutput as FormSchema}
          record={coraRecord}
        />,
      );
      const inputElement = screen.getByText('2');
      expect(inputElement).toBeInTheDocument();
    });

    it('renders a numberVariable 1-1 with input under min', async () => {
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

    it('renders a numberVariable 1-1 with input over max', async () => {
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

    it('renders a numberVariable 0-1 and does NOT validate text', async () => {
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

    it('renders a numberVariable 1-1 with numberOfDecimals 2 and does NOT validate', async () => {
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

    it('renders a numberVariable 1-1 with numberOfDecimals 2 and does validate', async () => {
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

    it('renders a numberVariable 0-1 with minNumberOfRepeatingToShow 1 with no input and does validate', async () => {
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

    it('renders a numberVariable 0-1 with minNumberOfRepeatingToShow 1 and does validate', async () => {
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
    it('renders a textVariable 2-3 should render 2 based on minNumberOfRepeatingToShow', () => {
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
    it('should NOT render add button when repeatMax is reached', async () => {
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

    it('should NOT render move buttons when repeatMax is less or equal to one', async () => {
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
    it('renders a collectionVariable 1-1 and its options', async () => {
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

    it('renders a collectionVariable 1-1 and does validate it', async () => {
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

    it('renders a collectionVariable 1-1 and does NOT validate it', async () => {
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

    it('renders a collectionVariable 1-1 with mode output', async () => {
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
    it('renders a numberVariable 1-1 with attribute and does NOT validate it when skipped', async () => {
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

    it('renders a numberVariable 1-1 with attribute and validates it when filled', async () => {
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

    it('renders a numberVariable 0-1 with attribute and validates it when skipped', async () => {
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

    it('renders a numberVariable 1-1 and attribute and does NOT validate it when only attribute is picked', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneRequiredNumberVariableWithAttributeCollection as FormSchema
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

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 0-1 and attribute and does NOT validates it when variable is written in', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneOptionalNumberVariableWithAttributeCollection as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );

      const numberInput = screen.getByPlaceholderText(
        'someNumberVar2IdPlaceholder',
      );
      expect(numberInput).toBeInTheDocument();

      const attributeButton = screen.getByRole('button', { expanded: false });
      expect(attributeButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(numberInput, '12');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 1-1 and a numberVariable 0-1 with attribute and validates it', async () => {
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

    it('renders a group 0-1 with attribute and textVariable 1-1 and validates it', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneOptionalGroupWithAttributeCollection as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );
      const textInput = screen.getByPlaceholderText(
        'mainTitleTextVarPlaceholderText',
      );
      expect(textInput).toBeInTheDocument();
      const attributeButton = screen.getByRole('button', { expanded: false });
      expect(attributeButton).toBeInTheDocument();

      const user = userEvent.setup();

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a group 1-1 with a textVariable 1-1 and attribute and validates it', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneRequiredGroupWithAttributeCollection as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );
      const textInput = screen.getByPlaceholderText(
        'mainTitleTextVarPlaceholderText',
      );
      expect(textInput).toBeInTheDocument();
      // const attributeButton = screen.getByRole('button', { expanded: false });
      // expect(attributeButton).toBeInTheDocument();

      const user = userEvent.setup();
      const expandButton = screen.getAllByRole('button', { expanded: false });

      await user.click(expandButton[0]);
      const items = screen.getByRole('listbox');

      expect(items.children).toHaveLength(2); // includes None option

      await user.selectOptions(items, 'aarLangItemText');
      await user.type(textInput, 'aaaa');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });

      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 with a group 1-1 having textVars 1-1 an validates it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithRequiredGroupWithRequiredVars as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const mainTitleElement = screen.getByPlaceholderText(
        'mainTitleTextVarText',
      );
      const subtitleElement = screen.getByPlaceholderText(
        'subtitleTextVarText',
      );

      expect(mainTitleElement).toBeInTheDocument();
      expect(subtitleElement).toBeInTheDocument();

      const user = userEvent.setup();
      // await user.type(mainTitleElement, '1.25');
      // await user.type(subtitleElement, '1.25');
      await user.click(submitButton);

      // expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a group having 0-1 with a group having 1-1 having textVars having 1-1 and does NOT validate it', async () => {
      const mockSubmit = vi.fn();

      const { container } = render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithRequiredGroupWithRequiredVars as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const mainTitleElement = screen.getByPlaceholderText(
        'mainTitleTextVarText',
      );
      const subtitleElement = screen.getByPlaceholderText(
        'subtitleTextVarText',
      );

      expect(mainTitleElement).toBeInTheDocument();
      expect(subtitleElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(mainTitleElement, '1.25');
      await user.click(submitButton);

      expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a group 0-1 with attribute and with a textVariable 0-1 and attribute and validates it', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );
      const attributeButtons = screen.getAllByRole('button', {
        expanded: false,
      });
      expect(attributeButtons).toHaveLength(2);
      const textInput = screen.getByPlaceholderText(
        'mainTitleTextVarPlaceholderText',
      );
      expect(textInput).toBeInTheDocument();

      const user = userEvent.setup();

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {
        expect(submitButton).toBeInTheDocument();
      });
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a optional group with multiple attributes and with a required textVariable and attribute and validates it', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneOptionalGroupWithTextVariableAndAttributeCollection as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );
      const attributeButtons = screen.getAllByRole('button', {
        expanded: false,
      });
      expect(attributeButtons).toHaveLength(2);

      const textInput = screen.getByPlaceholderText(
        'mainTitleTextVarPlaceholderText',
      );
      expect(textInput).toBeInTheDocument();

      const titleTypeAttribute = screen.getByRole('button', {
        name: 'titleTypeCollectionVarText',
      });
      const languageAttribute = screen.getByRole('button', {
        name: 'languageCollectionVarText',
      });
      expect(languageAttribute).toBeInTheDocument();
      expect(titleTypeAttribute).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(textInput);
      await user.type(textInput, 'someAlternativeTitle');

      await user.click(languageAttribute);

      await waitFor(async () => {
        const languageElement = await screen.findByRole('listbox');
        await user.selectOptions(languageElement, 'aarLangItemText');
      });
      // screen.debug(languageAttribute);
      await user.click(titleTypeAttribute);

      await waitFor(async () => {
        const titleTypeElement = await screen.findByRole('listbox');
        await user.selectOptions(titleTypeElement, 'alternativeTitleItemText');
      });

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      expect(submitButton).toBeInTheDocument();

      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a optional group with attribute with a optional group and with a required textVariable and attribute and validates it', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={
            formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection as FormSchema
          }
          onSubmit={mockSubmit}
        />,
      );
      const attributeButtons = screen.getAllByRole('button', {
        expanded: false,
      });
      expect(attributeButtons).toHaveLength(2);

      const textInput = screen.getByPlaceholderText(
        'mainTitleTextVarPlaceholderText',
      );
      expect(textInput).toBeInTheDocument();

      const titleTypeAttribute = screen.getByRole('button', {
        name: 'titleTypeCollectionVarText',
      });
      const languageAttribute = screen.getByRole('button', {
        name: 'languageCollectionVarText',
      });
      expect(languageAttribute).toBeInTheDocument();
      expect(titleTypeAttribute).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(textInput);
      await user.type(textInput, 'someAlternativeTitle');

      await user.click(languageAttribute);

      await waitFor(async () => {
        const languageElement = await screen.findByRole('listbox');
        await user.selectOptions(languageElement, 'aarLangItemText');
      });
      // screen.debug(languageAttribute);
      await user.click(titleTypeAttribute);

      await waitFor(async () => {
        const titleTypeElement = await screen.findByRole('listbox');
        await user.selectOptions(titleTypeElement, 'alternativeTitleItemText');
      });

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      expect(submitButton).toBeInTheDocument();

      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('group', () => {
    it('renders a group 1-1 with textVariable 1-1 child', async () => {
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

    it('renders a group 1-10 and headlineLevel 1', async () => {
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

    it('renders a group 1-10 and headlineLevel 3', async () => {
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

    it('renders a group 1-10 and headlineLevel default', async () => {
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

    it('renders a group 0-1 and textVariable 1-1 and validates it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={formDefWithOptionalGroupWithRequiredTextVar as FormSchema}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a group group 0-1 and numberVariable being 1-1 and validates it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithRequiredNumberVar as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 and recordLink being 1-1 and validates it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithRequiredRecordLink as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('render a group 0-1 with a child group 1-X and textVar being 1-1 and validates it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('render a group 1-1 and some sub groups 0-1 and does NOT validates it', async () => {
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

    it('renders a group 1-1 and some textVars 0-1 and 1-1 and does NOT validates it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithMixOptionalAndRequiredTextVars as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputNumberElement, '1.23');
      await user.click(submitButton);

      // await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(0);
      // });
    });

    it('renders a group 1-1 and textVars 1-1 being partially filled and does NOT validate it', async () => {
      const mockSubmit = vi.fn();

      const { container } = render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithLongitudeAndLatitudeTextVars as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputNumberElement, '1.23');
      await user.click(submitButton);

      expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a group 1-1 and numberVars 1-1 being partially filled and does NOT validate it', async () => {
      const mockSubmit = vi.fn();

      const { container } = render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithLongitudeAndLatitudeNumberVars as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputNumberElement, '3');
      await user.click(submitButton);

      expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a group 1-1 and collectionVars being partially filled and does NOT validate it', async () => {
      const mockSubmit = vi.fn();

      const { container } = render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithOptionalGroupWithTwoCollectionVars as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();

      const expandButton = screen.getAllByRole('button', { expanded: false });
      // expect(expandButton).toBeInTheDocument();

      await user.click(expandButton[0]);
      const items = screen.getByRole('listbox');

      expect(items.children).toHaveLength(2); // includes None option

      await user.selectOptions(items, 'bthItemText');
      await user.click(submitButton);

      expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a group 0-1 with textVar having 1-1, a group having 1-1 with textVar 1-1 and does NOT validate it', async () => {
      const mockSubmit = vi.fn();

      const { container } = render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefWithTextVarAndNestedGroupsWithOneTextVar as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputNumberElement, '3');
      await user.click(submitButton);

      expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(0);
    });

    it('renders a group 0-1 with nested textVars 1-1 and does validate it', async () => {
      const mockSubmit = vi.fn();

      render(
        <FormGenerator
          onSubmit={mockSubmit}
          formSchema={
            formDefTwoOptionalGroupsWithRequiredTextVars as FormSchema
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const longitudeElement = screen.getByPlaceholderText('longitude');
      const latitudeElement = screen.getByPlaceholderText('latitude');

      expect(longitudeElement).toBeInTheDocument();
      expect(latitudeElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(longitudeElement, '1.25');
      await user.type(latitudeElement, '1.25');
      await user.click(submitButton);

      // expect(container.getElementsByClassName('Mui-error').length).toBe(3);
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });
  describe('guiElementLink', () => {
    it('renders a numberVariable 1-1 and guiElementLink', async () => {
      const mockSubmit = vi.fn();
      render(
        <FormGenerator
          formSchema={formDefWithOneNumberVariableAndGuiElementLink as FormSchema}
          onSubmit={mockSubmit}
        />,
      );

      const link = screen.getByRole('link');

      expect(link).toHaveAttribute('href', 'http://www.google.se');
    });
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
    const inputElement = screen.getByLabelText('someMetadataOtherTextVarText');
    expect(inputElement).toBeInTheDocument();
  });
});
