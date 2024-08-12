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
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldArrayComponent } from '../FieldArrayComponent';
import {
  formDefWithOneTextVariableBeingOptional,
  formDefWithTextVar,
} from '../../../__mocks__/data/formDef';
import { FormComponent, FormSchema } from '../types';
import { renderLeafComponent } from '../FormGenerator';
import { createDefaultValuesFromFormSchema } from '../utils';
import { generateYupSchemaFromFormSchema } from '../utils/yupSchema';
import { reduxRender } from '../../../utils/testUtils';

describe('<FieldArrayComponent />', () => {
  it('aaa', () => {
    const variableArrayPath = 'someRootNameInData.someNameInData';

    const methods = useForm({
      mode: 'onChange',
      reValidateMode: 'onChange',
      shouldFocusError: false,
      defaultValues: createDefaultValuesFromFormSchema(
        formDefWithOneTextVariableBeingOptional as FormSchema,
        undefined,
      ),
      resolver: yupResolver(
        generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableBeingOptional as FormSchema,
        ),
      ),
    });
    const { control, getValues } = methods;

    reduxRender(
      <FieldArrayComponent
        name='someArrayName'
        component={
          formDefWithOneTextVariableBeingOptional.form
            .components[1] as FormComponent
        }
        renderCallback={(variableArrayPath) => {
          return [
            renderLeafComponent(
              formDefWithOneTextVariableBeingOptional.form
                .components[1] as FormComponent,
              variableArrayPath,
              control as Control<any>,
              `${variableArrayPath}.value`,
              false,
              undefined,
              getValues as UseFormGetValues<FieldValues>,
            ),
          ];
        }}
      />,
    );
  });
});
