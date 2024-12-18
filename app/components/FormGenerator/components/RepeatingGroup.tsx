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

import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { FieldArrayComponent } from '@/components/FormGenerator/components/FieldArrayComponent';
import { ComponentList } from '@/components/FormGenerator/ComponentList';
import { useRemixFormContext } from 'remix-hook-form';
import { Grid2 as Grid, IconButton, Stack } from '@mui/material';
import { Card } from '@/components/Card/Card';
import { headlineLevelToTypographyVariant } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { Typography } from '@/components/Typography/Typography';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { CardContent } from '@/components/Card/CardContent';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { cleanFormData, hasOnlyAttributes } from '@/utils/cleanFormData';
import { useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';

interface RepeatingGroupProps {
  currentComponentNamePath: string;
  reactKey: string;
  component: FormComponentGroup;
  parentPresentationStyle: string | undefined;
  childWithNameInDataArray: string[];
}

export const RepeatingGroup = ({
  currentComponentNamePath,
  reactKey,
  component,
  parentPresentationStyle,
  childWithNameInDataArray,
}: RepeatingGroupProps) => {
  const { control, getValues } = useRemixFormContext();
  const { t } = useTranslation();
  const { boxGroups } = useContext(FormGeneratorContext);

  return (
    <FieldArrayComponent
      key={reactKey}
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(arrayPath, actionButtonGroup) => {
        const hasNoValues = hasOnlyAttributes(
          cleanFormData(getValues(arrayPath)),
        );

        if (component.mode === 'output' && hasNoValues) {
          return null;
        }

        return (
          <Grid size={12}>
            <DevInfo component={component} />
            <Card boxed={boxGroups}>
              <CardHeader>
                {component.showLabel && (
                  <CardTitle>
                    <Typography
                      variant={
                        headlineLevelToTypographyVariant(
                          component.headlineLevel,
                        ) ?? 'bodyTextStyle'
                      }
                      text={component.label!}
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
                  </CardTitle>
                )}

                <Attributes
                  component={component}
                  path={arrayPath}
                />

                {actionButtonGroup}
              </CardHeader>
              <CardContent>
                <Stack spacing={2}>
                  <ComponentList
                    components={component.components ?? []}
                    childWithNameInDataArray={childWithNameInDataArray}
                    parentPresentationStyle={
                      component.presentationStyle ?? parentPresentationStyle
                    }
                    path={arrayPath}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      }}
    />
  );
};
