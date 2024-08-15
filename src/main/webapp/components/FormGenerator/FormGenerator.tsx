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
import { Box, Container, Grid, IconButton, Toolbar } from '@mui/material';
import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormGetValues,
} from 'react-hook-form';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import InfoIcon from '@mui/icons-material/Info';
import {
  ControlledTextField,
  ControlledSelectField,
  ControlledLinkedRecord,
} from '../Controlled';
import { createDefaultValuesFromFormSchema, RecordData } from './utils';
import { generateYupSchemaFromFormSchema } from './utils/yupSchema';
import {
  checkIfComponentHasValue,
  isComponentContainer,
  isComponentGroup,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentSurroundingContainer,
  isComponentVariable,
  isFirstLevel,
} from './utils/helper';
import {
  Typography,
  LinkButton,
  ControlledAutocomplete,
  Tooltip,
} from '../index';
import { FormComponent, FormSchema } from './types';
import { FieldArrayComponent } from './FieldArrayComponent';
import { DivaTypographyVariants } from '../Typography/Typography';
import { CoraRecord } from '../../app/hooks';

interface FormGeneratorProps {
  record?: CoraRecord;
  formSchema: FormSchema;
  onSubmit: (formValues: FieldValues) => void;
  onInvalid?: (fieldErrors: FieldErrors) => void;
  linkedData?: boolean;
}

export const FormGenerator = ({
  linkedData = false,
  ...props
}: FormGeneratorProps) => {
  const { t } = useTranslation();
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      props.formSchema,
      props.record?.data as RecordData,
    ),
    resolver: yupResolver(generateYupSchemaFromFormSchema(props.formSchema)),
  });
  const { control, handleSubmit, reset, getValues } = methods;

  const generateFormComponent = (
    component: FormComponent,
    idx: number,
    path: string,
    parentPresentationStyle?: string,
  ) => {
    const reactKey = `key_${idx}`;

    let currentComponentNamePath;
    if (isComponentContainer(component)) {
      currentComponentNamePath = path;
    } else {
      currentComponentNamePath = !path
        ? `${component.name}`
        : `${path}.${component.name}`;
    }

    const createFormComponentAttributes = (
      aComponent: FormComponent,
      aPath: string,
    ) => {
      return (aComponent.attributes ?? []).map((attribute, index) => {
        const hasValue = checkIfComponentHasValue(getValues, attribute.name);
        return (
          <Grid
            key={attribute.name}
            item
            xs={12}
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
      );
    }

    if (isComponentGroupAndRepeating(component)) {
      return createComponentGroupAndRepeating(
        currentComponentNamePath,
        reactKey,
        component,
        createFormComponentAttributes,
        parentPresentationStyle,
      );
    }

    if (isComponentVariableAndRepeating(component)) {
      return createComponentVariableAndRepeating(
        reactKey,
        component,
        currentComponentNamePath,
        createFormComponentAttributes,
        parentPresentationStyle,
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
            flexDirection: checkIfPresentationStyleOrIsInline(component)
              ? 'row'
              : 'column',
            alignItems: checkIfPresentationStyleOrIsInline(component)
              ? 'center'
              : undefined,
          }}
        >
          {component.components &&
            createFormComponents(
              component.components,
              currentComponentNamePath,
              component.presentationStyle ?? parentPresentationStyle,
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
    ) => JSX.Element[],
    parentPresentationStyle: string | undefined,
  ) => {
    return isComponentFirstLevelAndNOTLinkedData(
      currentComponentNamePath,
      linkedData,
    ) ? (
      <span
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
                currentComponentNamePath,
                component.presentationStyle ?? parentPresentationStyle,
              )}
          </Grid>
        </Box>
      </span>
    ) : (
      <Box
        key={reactKey}
        id={component.name}
        sx={{
          display: 'flex',
          flexDirection: checkIfPresentationStyleOrParentIsInline(
            component,
            parentPresentationStyle,
          )
            ? 'row'
            : 'column',
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
        {component?.showLabel && (
          <Typography
            text={component?.label ?? ''}
            variant={headlineLevelToTypographyVariant(component.headlineLevel)}
          />
        )}
        {createFormComponentAttributes(component, currentComponentNamePath)}
        {component.components &&
          createFormComponents(
            component.components,
            currentComponentNamePath,
            checkIfPresentationStyleIsUndefinedOrEmpty(component)
              ? parentPresentationStyle
              : component.presentationStyle,
          )}
      </Box>
    );
  };

  const createComponentGroupAndRepeating = (
    currentComponentNamePath: string,
    reactKey: string,
    component: FormComponent,
    createFormComponentAttributes: (
      aComponent: FormComponent,
      aPath: string,
    ) => JSX.Element[],
    parentPresentationStyle: string | undefined,
  ) => {
    return isFirstLevel(currentComponentNamePath) ? (
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
              arrayPath,
              component.presentationStyle ?? parentPresentationStyle,
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
                arrayPath,
                component.presentationStyle ?? parentPresentationStyle,
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
    ) => JSX.Element[],
    parentPresentationStyle: string | undefined,
  ) => {
    return (
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
      />
    );
  };

  const createFormComponents = (
    components: FormComponent[],
    path = '',
    parentPresentationStyle?: string,
  ): JSX.Element[] => {
    return components.map((c, i) => {
      return generateFormComponent(
        c,
        i,
        path,
        parentPresentationStyle as string,
      );
    });
  };

  return linkedData !== true ? (
    <Box
      component='form'
      sx={{ width: '100%' }}
      onSubmit={handleSubmit(
        (values) => props.onSubmit(values),
        (errors) => props.onInvalid && props.onInvalid(errors),
      )}
    >
      {generateFormComponent(props.formSchema.form, 0, '')}

      <AppBar
        position='fixed'
        style={{
          backgroundColor: '#eee',
          top: 'auto',
          bottom: 0,
          display: 'block',
        }}
      >
        <Container maxWidth='lg'>
          <Grid container>
            <Grid
              item
              xs={3}
            />
            <Grid
              item
              xs={9}
            >
              <Toolbar>
                <Box
                  component='div'
                  sx={{ mt: 1, mb: 1, width: '100%' }}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Button
                    disableRipple
                    variant='contained'
                    color='secondary'
                    sx={{ height: 40 }}
                    onClick={() => reset()}
                  >
                    {t('divaClient_ResetButtonText')}
                  </Button>
                  <Button
                    type='submit'
                    disableRipple
                    variant='contained'
                    color='primary'
                    sx={{ height: 40 }}
                  >
                    {t('divaClient_SubmitButtonText')}
                  </Button>
                </Box>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  ) : (
    generateFormComponent(props.formSchema.form, 0, '')
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
      if (checkIfComponentContainsSearchId(component)) {
        return createRecordLinkWithSearchLink(
          reactKey,
          renderElementGridWrapper,
          component,
          name,
          control,
        );
      }
      return createRecordLinkWithoutSearchLink(
        reactKey,
        renderElementGridWrapper,
        component,
        name,
        control,
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

const createRecordLinkWithSearchLink = (
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
      {component.mode === 'input' ? (
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
      ) : (
        <ControlledLinkedRecord
          control={control}
          name={name}
          recordType={component.recordLinkType ?? ''}
          presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
        />
      )}
    </Grid>
  );
};

const createRecordLinkWithoutSearchLink = (
  reactKey: string,
  renderElementGridWrapper: boolean,
  component: FormComponent,
  name: string,
  control: Control<any>,
  getValues: UseFormGetValues<FieldValues>,
) => {
  const hasValue = checkIfComponentHasValue(getValues, name);

  return (
    <div>
      {hasValue ? (
        <Grid
          key={reactKey}
          item
          xs={12}
          sm={renderElementGridWrapper ? component.gridColSpan : 12}
        >
          {component.mode === 'output' ? (
            <ControlledTextField
              multiline={component.inputType === 'textarea'}
              label={component.label ?? ''}
              name={name}
              showLabel={component.showLabel}
              placeholder={component.placeholder}
              tooltip={component.tooltip}
              control={control}
              readOnly={!!component.finalValue}
              displayMode={component.mode}
              hasValue={hasValue}
            />
          ) : (
            <ControlledLinkedRecord
              control={control}
              name={name}
              recordType={component.recordLinkType ?? ''}
              presentationRecordLinkId={
                component.presentationRecordLinkId ?? ''
              }
            />
          )}
        </Grid>
      ) : null}
    </div>
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
  return isFirstLevel(currentComponentNamePath) && !linkedData;
}

export const convertChildStyleToString = (
  childStyle: string[] | undefined,
): string | null => {
  return childStyle?.[0] === undefined ? '' : childStyle[0].toString();
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

const checkIfPresentationStyleOrIsInline = (component: FormComponent) => {
  return component.presentationStyle === 'inline';
};

const checkIfComponentContainsSearchId = (component: FormComponent) => {
  return component.search !== undefined;
};
