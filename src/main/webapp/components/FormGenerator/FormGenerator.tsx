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

import React from 'react';
import { Grid } from '@mui/material';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form';
import {
  ControlledLinkedRecord,
  ControlledSelectField,
  ControlledTextField,
} from '../Controlled';
import {
  addAttributesToName,
  getChildNameInDataArray,
  getChildrenWithSameNameInData,
} from './utils';
import {
  checkIfComponentHasValue,
  isComponentGroup,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentSurroundingContainer,
  isComponentVariable,
  isFirstLevelGroup,
} from './utils/helper';
import { ControlledAutocomplete, LinkButton, Typography } from '@/components';
import { FormComponent, FormSchema } from './types';
import { DivaTypographyVariants } from '../Typography/Typography';
import { CoraRecord } from '@/features/record/types';
import { FormComponentGenerator } from '@/components/FormGenerator/FormComponentGenerator';

interface FormGeneratorProps {
  record?: CoraRecord;
  formSchema: FormSchema;
  onSubmit: (formValues: FieldValues) => void;
  onInvalid?: (fieldErrors: FieldErrors) => void;
  linkedData?: boolean;
  control: Control<FieldValues, any>;
  getValues: UseFormGetValues<any>;
}

export const FormGenerator = ({
  linkedData = false,
  ...props
}: FormGeneratorProps) => {
  return (
    <FormComponentGenerator
      component={props.formSchema.form}
      idx={0}
      path={''}
      linkedData={linkedData}
    />
  );
};

export const renderLeafComponent = (
  component: FormComponent,
  reactKey: string,
  control: Control<any>,
  name: string,
  renderElementGridWrapper: boolean,
  getValues: UseFormGetValues<FieldValues>,
  parentPresentationStyle?: string,
): JSX.Element | null => {
  switch (component.type) {
    case 'textVariable':
    case 'numberVariable': {
      return createTextOrNumberVariable(
        reactKey,
        renderElementGridWrapper,
        component,
        name,
        control,
        parentPresentationStyle,
        getValues,
      );
    }
    case 'recordLink': {
      const hasValue = checkIfComponentHasValue(getValues, name);

      if (
        checkIfComponentContainsSearchId(component) &&
        component.mode === 'input' &&
        !hasValue
      ) {
        return createRecordLinkWithSearch(
          reactKey,
          renderElementGridWrapper,
          component,
          name,
          control,
        );
      }

      if (component.linkedRecordPresentation !== undefined) {
        return createRecordLinkWithLinkedPresentation(
          reactKey,
          renderElementGridWrapper,
          component,
          name,
          control,
          getValues,
        );
      }

      return createTextOrNumberVariable(
        reactKey,
        renderElementGridWrapper,
        component,
        name,
        control,
        parentPresentationStyle,
        getValues,
      );
    }
    case 'collectionVariable': {
      return createCollectionVariable(
        reactKey,
        renderElementGridWrapper,
        component,
        name,
        control,
        getValues,
      );
    }
    case 'text': {
      return createText(reactKey, renderElementGridWrapper, component);
    }
    case 'guiElementLink': {
      return createGuiElement(reactKey, component);
    }
    default:
      return null;
  }
};

const createTextOrNumberVariable = (
  reactKey: string,
  renderElementGridWrapper: boolean,
  component: FormComponent,
  name: string,
  control: Control<any>,
  parentPresentationStyle: string | undefined,
  getValues: UseFormGetValues<FieldValues>,
) => {
  const hasValue = checkIfComponentHasValue(getValues, name);
  return (
    <Grid
      key={reactKey}
      item
      xs={12}
      sm={renderElementGridWrapper ? component.gridColSpan : 12}
      style={{
        flexBasis:
          convertChildStyleToString(component.childStyle) === 'compact'
            ? 'auto'
            : '100%',
      }}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <ControlledTextField
        multiline={component.inputType === 'textarea'}
        label={component.label ?? ''}
        showLabel={component.showLabel}
        name={name}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        parentPresentationStyle={parentPresentationStyle}
        hasValue={hasValue}
        inputFormat={component.inputFormat}
      />
    </Grid>
  );
};

const createRecordLinkWithSearch = (
  reactKey: string,
  renderElementGridWrapper: boolean,
  component: FormComponent,
  name: string,
  control: Control<any>,
) => {
  return (
    <Grid
      key={reactKey}
      item
      xs={12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
      sm={renderElementGridWrapper ? component.gridColSpan : 12}
    >
      <ControlledAutocomplete
        label={component.label ?? ''}
        name={name}
        showLabel={component.showLabel}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        searchLink={component.search}
        presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
        recordType={component.recordLinkType ?? ''}
      />
    </Grid>
  );
};

const createRecordLinkWithLinkedPresentation = (
  reactKey: string,
  renderElementGridWrapper: boolean,
  component: FormComponent,
  name: string,
  control: Control<any>,
  getValues: UseFormGetValues<FieldValues>,
) => {
  const hasValue = checkIfComponentHasValue(getValues, name);
  return (
    <React.Fragment key={`${reactKey}_${name}`}>
      {hasValue ? (
        <Grid
          key={reactKey}
          item
          xs={12}
          sm={renderElementGridWrapper ? component.gridColSpan : 12}
        >
          <ControlledLinkedRecord
            control={control}
            name={name}
            recordType={component.recordLinkType ?? ''}
            presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
          />
        </Grid>
      ) : null}
    </React.Fragment>
  );
};

const createCollectionVariable = (
  reactKey: string,
  renderElementGridWrapper: boolean,
  component: FormComponent,
  name: string,
  control: Control<any>,
  getValues: UseFormGetValues<FieldValues>,
) => {
  const hasValue = checkIfComponentHasValue(getValues, name);

  return (
    <Grid
      key={reactKey}
      item
      xs={12}
      sm={renderElementGridWrapper ? component.gridColSpan : 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <ControlledSelectField
        name={name}
        isLoading={false}
        loadingError={false}
        label={component.label ?? ''}
        showLabel={component.showLabel}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        options={component.options}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        hasValue={hasValue}
      />
    </Grid>
  );
};

const createText = (
  reactKey: string,
  renderElementGridWrapper: boolean,
  component: FormComponent,
) => {
  return (
    <Grid
      key={reactKey}
      item
      xs={12}
      sm={renderElementGridWrapper ? component.gridColSpan : 12}
      style={{
        flexBasis:
          convertChildStyleToString(component.childStyle) === 'compact'
            ? 'auto'
            : '2em',
      }}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <Typography
        variant={component.textStyle ?? 'bodyTextStyle'}
        text={component.name}
      />
    </Grid>
  );
};

const createGuiElement = (reactKey: string, component: FormComponent) => {
  return (
    <LinkButton
      key={reactKey}
      href={component.url ?? ''}
      text={component.elementText ?? ''}
    />
  );
};

// move to utils
export const headlineLevelToTypographyVariant = (
  headlineLevel: string | undefined,
): DivaTypographyVariants['variant'] => {
  let typographyVariant: DivaTypographyVariants['variant'];
  if (headlineLevel !== undefined) {
    typographyVariant =
      `${headlineLevel}TextStyle` as DivaTypographyVariants['variant'];
  } else {
    typographyVariant = 'h2TextStyle';
  }

  return typographyVariant as DivaTypographyVariants['variant']; // check style to return as default
};

const isComponentSurroundingContainerAndNOTRepeating = (
  component: FormComponent,
) => {
  return (
    isComponentSurroundingContainer(component) &&
    !isComponentRepeating(component)
  );
};

const isComponentGroupOrRepeatingContainerAndNOTRepeating = (
  component: FormComponent,
) => {
  return (
    (isComponentGroup(component) || isComponentRepeatingContainer(component)) &&
    !isComponentRepeating(component)
  );
};

const isComponentGroupAndRepeating = (component: FormComponent) => {
  return isComponentGroup(component) && isComponentRepeating(component);
};

const isComponentVariableAndRepeating = (component: FormComponent) => {
  return isComponentVariable(component) && isComponentRepeating(component);
};

function isComponentFirstLevelAndNOTLinkedData(
  currentComponentNamePath: string,
  linkedData: boolean | undefined,
) {
  return isFirstLevelGroup(currentComponentNamePath) && !linkedData;
}

export const convertChildStyleToString = (
  childStyle: string[] | undefined,
): string | null => {
  return childStyle?.[0] === undefined ? '' : childStyle[0].toString();
};

const checkIfAttributesToShowIsAValue = (component: FormComponent) => {
  if (
    component.attributesToShow === 'all' ||
    component.attributesToShow === undefined
  ) {
    return 'all';
  }
  if (component.attributesToShow === 'selectable') {
    return 'selectable';
  }
  return 'none';
};

const checkIfComponentContainsSearchId = (component: FormComponent) => {
  return component.search !== undefined;
};

export const hasComponentSameNameInData = (component: FormComponent) => {
  if (component.components === undefined) {
    return false;
  }

  if (component.components.length === 1) {
    return false;
  }

  if (!isComponentGroup(component)) {
    return false;
  }
  const nameArray = getChildNameInDataArray(component);
  return getChildrenWithSameNameInData(nameArray).length >= 1;
};

export const getChildrenWithSameNameInDataFromSchema = (
  formSchema: FormSchema,
) => {
  return getChildrenWithSameNameInData(
    getChildNameInDataArray(formSchema?.form),
  );
};
