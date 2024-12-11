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

import { Control, Controller, useFieldArray } from 'react-hook-form';
import { Box, Button, Grid2 as Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import { ActionButtonGroup } from './ActionButtonGroup';
import { FormComponent } from '../types';
import {
  addAttributesToName,
  createDefaultValuesFromComponent,
} from '../defaultValues/defaultValues';
import {
  headlineLevelToTypographyVariant,
  isComponentGroup,
  isComponentSingularAndOptional,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Card } from '@/components/Card/Card';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardContent } from '@/components/Card/CardContent';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { Typography } from '@/components/Typography/Typography';
import { Tooltip } from '@/components/Tooltip/Tooltip';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponent;
  renderCallback: (path: string) => unknown;
  hasValue?: boolean;
}

export const FieldArrayComponent = (props: FieldArrayComponentProps) => {
  const { t } = useTranslation();
  const { fields, append, move, remove } = useFieldArray({
    control: props.control,
    name: props.name,
  });
  const handleAppend = async () => {
    append(createDefaultValuesFromComponent(props.component, true));
  };

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };
  const isBoxed = isComponentGroup(props.component);

  return (
    <Grid
      key={`${props.name}_grid`}
      size={{ xs: 12, sm: props.component.gridColSpan }}
      id={`anchor_${addAttributesToName(props.component, props.component.name)}`}
      container
      spacing={1}
    >
      <Controller
        control={props.control}
        name={props.name}
        render={({ fieldState }) => (
          <>
            {fieldState.error && (
              <span style={{ color: 'red' }}>{fieldState.error?.message}</span>
            )}
          </>
        )}
      />
      {fields.map((field, index) => {
        return (
          <Grid
            size={12}
            key={`${field.id}_${index}_a`}
          >
            <Card
              boxed={isBoxed}
              sx={{ position: 'relative' }}
            >
              {isComponentGroup(props.component) && (
                <CardHeader
                  key={`${field.id}_${index}_b`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {props.component.showLabel && (
                    <Box
                      sx={{ mr: 'auto', display: 'flex', alignItems: 'center' }}
                    >
                      <Typography
                        variant={
                          headlineLevelToTypographyVariant(
                            props.component.headlineLevel,
                          ) ?? 'bodyTextStyle'
                        }
                        text={props.component.label!}
                      />
                      <Tooltip
                        title={t(props.component.tooltip?.title as string)}
                        body={t(props.component.tooltip?.body as string)}
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

                  <Attributes
                    component={props.component}
                    path={props.name}
                  />

                  {props.component.mode === 'input' && (
                    <ActionButtonGroup
                      entityName={`${t(props.component.label ?? '')}`}
                      hideMoveButtons={isComponentSingularAndOptional(
                        props.component,
                      )}
                      moveUpButtonDisabled={index === 0}
                      moveUpButtonAction={() => handleMove(index, index - 1)}
                      moveDownButtonDisabled={index === fields.length - 1}
                      moveDownButtonAction={() => handleMove(index, index + 1)}
                      deleteButtonDisabled={
                        fields.length <=
                        (props.component.repeat?.repeatMin ?? 1)
                      }
                      deleteButtonAction={() => handleRemove(index)}
                      entityType={props.component.type}
                      key={`${field.id}_${index}_f`}
                    />
                  )}
                </CardHeader>
              )}
              {!isComponentGroup(props.component) &&
                props.component.mode === 'input' && (
                  <Box
                    sx={{ position: 'absolute', top: 4, right: 0, zIndex: 1 }}
                  >
                    <ActionButtonGroup
                      entityName={`${t(props.component.label ?? '')}`}
                      hideMoveButtons={isComponentSingularAndOptional(
                        props.component,
                      )}
                      moveUpButtonDisabled={index === 0}
                      moveUpButtonAction={() => handleMove(index, index - 1)}
                      moveDownButtonDisabled={index === fields.length - 1}
                      moveDownButtonAction={() => handleMove(index, index + 1)}
                      deleteButtonDisabled={
                        fields.length <=
                        (props.component.repeat?.repeatMin ?? 1)
                      }
                      deleteButtonAction={() => handleRemove(index)}
                      entityType={props.component.type}
                      key={`${field.id}_${index}_f`}
                    />
                  </Box>
                )}
              <CardContent sx={{ p: isBoxed ? 2 : undefined }}>
                {
                  props.renderCallback(
                    `${props.name}[${index}]` as const,
                  ) as JSX.Element
                }
              </CardContent>
            </Card>
          </Grid>
        );
      })}

      {props.component.mode === 'input' &&
        fields.length < (props.component.repeat?.repeatMax ?? 1) && (
          <Grid size={12}>
            <Button
              fullWidth
              variant='outlined'
              disabled={
                fields.length >= (props.component.repeat?.repeatMax ?? 1)
              }
              onClick={handleAppend}
              disableRipple
              endIcon={<AddCircleOutlineIcon />}
            >
              {t(props.component.label as string)}
            </Button>
          </Grid>
        )}
    </Grid>
  );
};
