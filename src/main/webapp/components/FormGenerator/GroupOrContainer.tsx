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
 */

import { FormComponent } from '@/components/FormGenerator/types';
import { Box, Grid, IconButton } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/utils';
import { Tooltip, Typography } from '@/components';
import InfoIcon from '@mui/icons-material/Info';
import { headlineLevelToTypographyVariant } from '@/components/FormGenerator/FormGenerator';
import {
  checkIfPresentationStyleIsInline,
  checkIfPresentationStyleOrParentIsInline,
  isFirstLevelGroup,
} from '@/components/FormGenerator/utils/helper';
import { useTranslation } from 'react-i18next';
import { FormComponentListGenerator } from '@/components/FormGenerator/FormComponentListGenerator';

interface GroupOrContainerProps {
  currentComponentNamePath: string;
  reactKey: string;
  component: FormComponent;
  createFormComponentAttributes: (
    aComponent: FormComponent,
    aPath: string,
  ) => (JSX.Element | null)[];
  parentPresentationStyle: string | undefined;
  childWithNameInDataArray: string[];
  linkedData: boolean;
}

export const GroupOrContainer = ({
  currentComponentNamePath,
  reactKey,
  component,
  createFormComponentAttributes,
  parentPresentationStyle,
  childWithNameInDataArray,
  linkedData,
}: GroupOrContainerProps) => {
  const { t } = useTranslation();
  return isComponentFirstLevelAndNOTLinkedData(
    currentComponentNamePath,
    linkedData,
  ) ? (
    <Grid
      item
      xs={12}
      key={reactKey}
      className='anchorLink isComponentFirstLevelAndNOTLinkedData'
      id={`anchor_${addAttributesToName(component, component.name)}`}
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
          className={'NOTisComponentFirstLevelAndNOTLinkedData'}
          id={`anchor_${addAttributesToName(component, component.name)}`}
        >
          {createFormComponentAttributes(component, currentComponentNamePath)}

          {component.components && (
            <FormComponentListGenerator
              components={component.components}
              childWithNameInDataArray={childWithNameInDataArray}
              parentPresentationStyle={
                component.presentationStyle ?? parentPresentationStyle
              }
              path={currentComponentNamePath}
            />
          )}
        </Grid>
      </Box>
    </Grid>
  ) : (
    <Grid
      item
      key={reactKey}
      id={`anchor_${addAttributesToName(component, component.name)}`}
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
            variant={headlineLevelToTypographyVariant(component.headlineLevel)}
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
      {component.components && (
        <FormComponentListGenerator
          components={component.components}
          childWithNameInDataArray={childWithNameInDataArray}
          parentPresentationStyle={
            checkIfPresentationStyleIsUndefinedOrEmpty(component)
              ? parentPresentationStyle
              : component.presentationStyle
          }
          path={currentComponentNamePath}
        />
      )}
    </Grid>
  );
};

const isComponentFirstLevelAndNOTLinkedData = (
  currentComponentNamePath: string,
  linkedData: boolean | undefined,
) => {
  return isFirstLevelGroup(currentComponentNamePath) && !linkedData;
};

const checkIfPresentationStyleIsUndefinedOrEmpty = (
  component: FormComponent,
) => {
  return (
    component.presentationStyle === undefined ||
    component.presentationStyle === ''
  );
};
