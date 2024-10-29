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
import { Box, Grid, IconButton } from '@mui/material';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import {
  ControlledLinkedRecord,
  ControlledSelectField,
  ControlledTextField,
} from '../Controlled';
import {
  addAttributesToName,
  getChildNameInDataArray,
  getChildrenWithSameNameInData,
  hasCurrentComponentSameNameInData,
} from './utils';
import {
  checkIfComponentHasValue,
  checkIfSingularComponentHasValue,
  isComponentContainer,
  isComponentGroup,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentSurroundingContainer,
  isComponentVariable,
  isFirstLevelGroup,
  isFirstLevelVariable,
} from './utils/helper';
import {
  ControlledAutocomplete,
  LinkButton,
  Tooltip,
  Typography,
} from '@/components';
import { FormComponent, FormSchema } from './types';
import { FieldArrayComponent } from './FieldArrayComponent';
import { DivaTypographyVariants } from '../Typography/Typography';
import { CoraRecord } from '@/features/record/types';

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
  control,
  getValues,
  ...props
}: FormGeneratorProps) => {
  const { t } = useTranslation();

  const generateFormComponent = (
    component: FormComponent,
    idx: number,
    path: string,
    childWithNameInDataArray: string[] = [],
    parentPresentationStyle?: string,
  ) => {
    const reactKey = `key_${idx}`;

    let currentComponentNamePath;

    const childrenWithSameNameInData = getChildrenWithSameNameInData(
      getChildNameInDataArray(component),
    );

    const currentComponentSameNameInData = hasCurrentComponentSameNameInData(
      childWithNameInDataArray,
      component.name,
    );
    const addAttributesForMatchingNameInDataWithoutPath =
      currentComponentSameNameInData
        ? `${addAttributesToName(component, component.name)}`
        : `${component.name}`;

    const addAttributesForMatchingNameInDataWithPath =
      currentComponentSameNameInData
        ? `${path}.${addAttributesToName(component, component.name)}`
        : `${path}.${component.name}`;

    if (isComponentContainer(component)) {
      currentComponentNamePath = path;
    } else {
      currentComponentNamePath = !path
        ? addAttributesForMatchingNameInDataWithoutPath
        : addAttributesForMatchingNameInDataWithPath;
    }

    const createFormComponentAttributes = (
      aComponent: FormComponent,
      aPath: string,
    ) => {
      return (aComponent.attributes ?? []).map((attribute, index) => {
        const hasValue = checkIfComponentHasValue(getValues, attribute.name);
        const attributesToShow = checkIfAttributesToShowIsAValue(component);
        if (attributesToShow === 'all') {
          return (
            <Grid
              key={attribute.name}
              item
              xs={6}
            >
              <ControlledSelectField
                key={`${attribute.name}_${index}`}
                name={`${aPath}._${attribute.name}`}
                isLoading={false}
                loadingError={false}
                label={attribute.label ?? ''}
                showLabel={component.showLabel}
                placeholder={attribute.placeholder}
                tooltip={attribute.tooltip}
                control={control}
                options={attribute.options}
                readOnly={!!attribute.finalValue}
                displayMode={attribute.mode}
                hasValue={hasValue}
              />
            </Grid>
          );
        }

        if (attributesToShow === 'selectable' && !attribute.finalValue) {
          return (
            <Grid
              key={attribute.name}
              item
              xs={6}
            >
              <ControlledSelectField
                key={`${attribute.name}_${index}`}
                name={`${aPath}._${attribute.name}`}
                isLoading={false}
                loadingError={false}
                label={attribute.label ?? ''}
                showLabel={component.showLabel}
                placeholder={attribute.placeholder}
                tooltip={attribute.tooltip}
                control={control}
                options={attribute.options}
                readOnly={!!attribute.finalValue}
                displayMode={attribute.mode}
                hasValue={hasValue}
              />
            </Grid>
          );
        }

        return null;
      });
    };

    if (isComponentSurroundingContainerAndNOTRepeating(component)) {
      return createComponentSurroundingContainerAndNOTRepeating(
        reactKey,
        component,
        currentComponentNamePath,
        parentPresentationStyle,
      );
    }

    if (isComponentGroupOrRepeatingContainerAndNOTRepeating(component)) {
      return createComponentGroupOrRepeatingContainerAndNOTRepeating(
        currentComponentNamePath,
        reactKey,
        component,
        createFormComponentAttributes,
        parentPresentationStyle,
        childrenWithSameNameInData,
      );
    }

    if (isComponentGroupAndRepeating(component)) {
      return createComponentGroupAndRepeating(
        currentComponentNamePath,
        reactKey,
        component,
        createFormComponentAttributes,
        parentPresentationStyle,
        childrenWithSameNameInData,
      );
    }

    if (isComponentVariableAndRepeating(component)) {
      return createComponentVariableAndRepeating(
        reactKey,
        component,
        currentComponentNamePath,
        createFormComponentAttributes,
        parentPresentationStyle,
        getValues,
      );
    }

    return (
      <React.Fragment key={reactKey}>
        {createFormComponentAttributes(component, currentComponentNamePath)}
        {renderLeafComponent(
          component,
          reactKey,
          control,
          `${currentComponentNamePath}.value`,
          true,
          getValues,
          parentPresentationStyle,
        )}
      </React.Fragment>
    );
  };

  const createComponentSurroundingContainerAndNOTRepeating = (
    reactKey: string,
    component: FormComponent,
    currentComponentNamePath: string,
    parentPresentationStyle: string | undefined,
  ) => {
    return (
      <React.Fragment key={reactKey}>
        <div
          id='surrounding-container'
          key={reactKey}
          style={{
            // background: 'lightgray',
            // border: '1px solid black',
            display: 'flex',
            flexDirection: checkIfPresentationStyleIsInline(component)
              ? 'row'
              : 'column',
            alignItems: checkIfPresentationStyleIsInline(component)
              ? 'center'
              : undefined,
          }}
        >
          {component.components &&
            createFormComponents(
              component.components,
              [],
              component.presentationStyle ?? parentPresentationStyle,
              currentComponentNamePath,
            )}
        </div>
      </React.Fragment>
    );
  };

  const createComponentGroupOrRepeatingContainerAndNOTRepeating = (
    currentComponentNamePath: string,
    reactKey: string,
    component: FormComponent,
    createFormComponentAttributes: (
      aComponent: FormComponent,
      aPath: string,
    ) => (JSX.Element | null)[],
    parentPresentationStyle: string | undefined,
    childWithNameInDataArray: string[],
  ) => {
    return isComponentFirstLevelAndNOTLinkedData(
      currentComponentNamePath,
      linkedData,
    ) ? (
      <Grid
        item
        xs={12}
        key={reactKey}
        className='anchorLink'
        id={`anchor_${component.name}`}
      >
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {component.showLabel === true ? (
              <>
                <Typography
                  text={component?.label ?? ''}
                  variant={headlineLevelToTypographyVariant(
                    component.headlineLevel,
                  )}
                />
                <Tooltip
                  title={t(component.tooltip?.title as string)}
                  body={t(component.tooltip?.body as string)}
                >
                  <IconButton
                    disableRipple
                    color='info'
                    aria-label='info'
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
          </Box>
          <Grid
            container
            spacing={2}
            justifyContent='space-between'
            alignItems='flex-start'
          >
            {createFormComponentAttributes(component, currentComponentNamePath)}

            {component.components &&
              createFormComponents(
                component.components,
                childWithNameInDataArray,
                component.presentationStyle ?? parentPresentationStyle,
                currentComponentNamePath,
              )}
          </Grid>
        </Box>
      </Grid>
    ) : (
      <Grid
        item
        key={reactKey}
        id={component.name}
        className='aaaaaaaaa'
        xs={12}
        sx={{
          display: 'flex',
          flexDirection:
            checkIfPresentationStyleIsInline(component) || linkedData
              ? 'row'
              : 'column',
          flexWrap: 'wrap',
          alignItems: checkIfPresentationStyleOrParentIsInline(
            component,
            parentPresentationStyle,
          )
            ? 'center'
            : null,
          gap: checkIfPresentationStyleOrParentIsInline(
            component,
            parentPresentationStyle,
          )
            ? '0.2em'
            : null,
        }}
      >
        {component?.showLabel &&
          (!linkedData ? (
            <Typography
              text={component?.label ?? ''}
              variant={headlineLevelToTypographyVariant(
                component.headlineLevel,
              )}
            />
          ) : (
            <span style={{ width: '100%' }}>
              <Typography
                text={component?.label ?? ''}
                variant={headlineLevelToTypographyVariant(
                  component.headlineLevel,
                )}
              />
            </span>
          ))}
        {createFormComponentAttributes(component, currentComponentNamePath)}
        {component.components &&
          createFormComponents(
            component.components,
            childWithNameInDataArray,
            checkIfPresentationStyleIsUndefinedOrEmpty(component)
              ? parentPresentationStyle
              : component.presentationStyle,
            currentComponentNamePath,
          )}
      </Grid>
    );
  };

  const createComponentGroupAndRepeating = (
    currentComponentNamePath: string,
    reactKey: string,
    component: FormComponent,
    createFormComponentAttributes: (
      aComponent: FormComponent,
      aPath: string,
    ) => (JSX.Element | null)[],
    parentPresentationStyle: string | undefined,
    childWithNameInDataArray: string[],
  ) => {
    return isFirstLevelGroup(currentComponentNamePath) ? (
      <FieldArrayComponent
        key={reactKey}
        control={control}
        component={component}
        name={currentComponentNamePath}
        renderCallback={(arrayPath: string) => {
          return [
            ...createFormComponentAttributes(component, arrayPath),
            ...createFormComponents(
              component.components ?? [],
              childWithNameInDataArray,
              component.presentationStyle ?? parentPresentationStyle,
              arrayPath,
            ),
          ];
        }}
      />
    ) : (
      <Grid
        item
        xs={12}
        key={reactKey}
        sx={{ position: 'relative' }}
      >
        {component?.showLabel && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {component.showLabel ? (
              <Typography
                text={component?.label ?? ''}
                variant={headlineLevelToTypographyVariant(
                  component.headlineLevel,
                )}
              />
            ) : null}
            <Tooltip
              title={t(component.tooltip?.title as string)}
              body={t(component.tooltip?.body as string)}
            >
              <IconButton
                disableRipple
                color='info'
                aria-label='info'
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <FieldArrayComponent
          key={reactKey}
          control={control}
          component={component}
          name={currentComponentNamePath}
          renderCallback={(arrayPath: string) => {
            return [
              ...createFormComponentAttributes(component, arrayPath),
              ...createFormComponents(
                component.components ?? [],
                [],
                component.presentationStyle ?? parentPresentationStyle,
                arrayPath,
              ),
            ];
          }}
        />
      </Grid>
    );
  };

  const createComponentVariableAndRepeating = (
    reactKey: string,
    component: FormComponent,
    currentComponentNamePath: string,
    createFormComponentAttributes: (
      aComponent: FormComponent,
      aPath: string,
    ) => (JSX.Element | null)[],
    parentPresentationStyle: string | undefined,
    getValues: UseFormGetValues<FieldValues>,
  ) => {
    const hasValue = checkIfComponentHasValue(getValues, component.name);
    const hasLinkedDataValue = checkIfSingularComponentHasValue(
      getValues,
      currentComponentNamePath,
    );
    return !hasLinkedDataValue && linkedData ? null : (
      <FieldArrayComponent
        key={reactKey}
        control={control}
        component={component}
        name={currentComponentNamePath}
        renderCallback={(variableArrayPath: string) => {
          return [
            ...createFormComponentAttributes(component, variableArrayPath),
            renderLeafComponent(
              component,
              variableArrayPath,
              control,
              `${variableArrayPath}.value`,
              false,
              getValues,
              parentPresentationStyle,
            ),
          ];
        }}
        hasValue={hasValue}
      />
    );
  };

  const createFormComponents = (
    components: FormComponent[],
    childWithNameInDataArray: string[],
    parentPresentationStyle?: string,
    path = '',
  ): (JSX.Element | null)[] => {
    return components.map((c, i) => {
      return generateFormComponent(
        c,
        i,
        path,
        childWithNameInDataArray,
        parentPresentationStyle as string,
      );
    });
  };

  return generateFormComponent(props.formSchema.form, 0, '');
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
      id={
        isFirstLevelVariable(name)
          ? `anchor_${addAttributesToName(component, component.name)}`
          : ''
      }
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

const checkIfPresentationStyleOrParentIsInline = (
  component: FormComponent,
  parentPresentationStyle: string | undefined,
) => {
  return (
    component.presentationStyle === 'inline' ||
    parentPresentationStyle === 'inline'
  );
};

const checkIfPresentationStyleIsUndefinedOrEmpty = (
  component: FormComponent,
) => {
  return (
    component.presentationStyle === undefined ||
    component.presentationStyle === ''
  );
};

const checkIfPresentationStyleIsInline = (component: FormComponent) => {
  return component.presentationStyle === 'inline';
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
