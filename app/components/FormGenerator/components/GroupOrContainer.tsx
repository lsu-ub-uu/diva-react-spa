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

import type {
  FormComponentContainer,
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import { Box, Grid2 as Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import {
  checkIfPresentationStyleIsInline,
  checkIfPresentationStyleOrParentIsInline,
  getGroupLevel,
  headlineLevelToTypographyVariant,
  isFirstLevelGroup,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { ComponentList } from '@/components/FormGenerator/ComponentList';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import type { BFFDataRecord } from '@/types/record';
import { Card } from '@/components/Card/Card';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardContent } from '@/components/Card/CardContent';
import { Typography } from '@/components/Typography/Typography';
import { CardTitle } from '@/components/Card/CardTitle';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FirstLevelGroup } from '@/components/FormGenerator/components/FirstLevelGroup';

interface GroupOrContainerProps {
  currentComponentNamePath: string;
  reactKey: string;
  component: FormComponentContainer | FormComponentGroup;
  parentPresentationStyle: string | undefined;
  childWithNameInDataArray: string[];
}

export const GroupOrContainer = ({
  currentComponentNamePath,
  reactKey,
  component,
  parentPresentationStyle,
  childWithNameInDataArray,
}: GroupOrContainerProps) => {
  const { linkedData, boxGroups } = useContext(FormGeneratorContext);
  const groupLevel = getGroupLevel(currentComponentNamePath);

  if (
    isComponentFirstLevelAndNOTLinkedData(currentComponentNamePath, linkedData)
  ) {
    return (
      <FirstLevelGroup
        reactKey={reactKey}
        component={component}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
        childWithNameInDataArray={childWithNameInDataArray}
      />
    );
  }

  return (
    <Grid
      key={reactKey}
      id={`anchor_${addAttributesToName(component, component.name)}`}
      size={12}
      sx={{
        display: 'flex',
        flexDirection: checkIfPresentationStyleIsInline(component)
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
      <DevInfo component={component} />
      <Card boxed={boxGroups && groupLevel !== 0}>
        {component?.showLabel &&
          (!linkedData ? (
            <CardHeader>
              <CardTitle>
                <Typography
                  text={component?.label ?? ''}
                  sx={{ mb: groupLevel === 0 ? 2 : undefined }}
                  variant={headlineLevelToTypographyVariant(
                    component.headlineLevel,
                  )}
                />
              </CardTitle>
              <Attributes
                component={component}
                path={currentComponentNamePath}
              />
            </CardHeader>
          ) : (
            <span style={{ width: '100%' }}>
              <Typography
                text={component?.label ?? ''}
                sx={{ mb: 2 }}
                variant={headlineLevelToTypographyVariant(
                  component.headlineLevel,
                )}
              />
            </span>
          ))}
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {component.components && (
              <ComponentList
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const isComponentFirstLevelAndNOTLinkedData = (
  currentComponentNamePath: string,
  linkedData: BFFDataRecord['data'] | undefined,
) => {
  return isFirstLevelGroup(currentComponentNamePath) && !linkedData;
};

const checkIfPresentationStyleIsUndefinedOrEmpty = (
  component: FormComponentContainer | FormComponentGroup,
) => {
  return (
    component.presentationStyle === undefined ||
    component.presentationStyle === ''
  );
};
