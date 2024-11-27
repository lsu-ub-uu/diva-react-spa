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
import { Button, Box, Grid, IconButton } from '@mui/material';
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
import { Typography, Tooltip } from '@/components';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponent;
  renderCallback: (path: string) => unknown;
  hasValue?: boolean;
}

function addSpaceForActionButtons(props: FieldArrayComponentProps) {
  return (
    <>
      {!props.component.showLabel && props.component.mode === 'input' && (
        /* Leave space for action buttons when no label */
        <Box sx={{ paddingBlock: 4 }} />
      )}
    </>
  );
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

  return (
    <Grid
      key={`${props.name}_grid`}
      item
      xs={12}
      sm={props.component.gridColSpan}
      id={`anchor_${addAttributesToName(props.component, props.component.name)}`}
      flexDirection='column'
    >
      <Controller
        control={props.control}
        name={props.name}
        render={({ fieldState }) => (
          <span style={{ color: 'red' }}>{fieldState.error?.message}</span>
        )}
      />
      {fields.map((field, index) => {
        return (
          <div
            key={`${field.id}_${index}_a`}
            style={{
              position: 'relative',
              marginTop: '10px',
            }}
          >
            {isComponentGroup(props.component) && (
              <Box
                key={`${field.id}_${index}_b`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                {props.component.showLabel && (
                  <>
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
                  </>
                )}

                {addSpaceForActionButtons(props)}
              </Box>
            )}
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
                  fields.length <= (props.component.repeat?.repeatMin ?? 1)
                }
                deleteButtonAction={() => handleRemove(index)}
                entityType={props.component.type}
                key={`${field.id}_${index}_f`}
              />
            )}

            {
              props.renderCallback(
                `${props.name}[${index}]` as const,
              ) as JSX.Element
            }
          </div>
        );
      })}
      {props.component.mode === 'input' &&
        fields.length < (props.component.repeat?.repeatMax ?? 1) && (
          <Button
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            variant='outlined'
            disabled={fields.length >= (props.component.repeat?.repeatMax ?? 1)}
            onClick={handleAppend}
            disableRipple
            endIcon={<AddCircleOutlineIcon />}
          >
            {t(props.component.label as string)}
          </Button>
        )}
    </Grid>
  );
};
