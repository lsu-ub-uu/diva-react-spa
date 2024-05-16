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
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { Box, Chip, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import { ActionButtonGroup } from './ActionButtonGroup';
import { FormComponent } from './types';
import { createDefaultValuesFromComponent } from './utils';
import { isComponentSingularAndOptional, isFirstLevel } from './utils/helper';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip/Tooltip';
import { headlineLevelToTypographyVariant } from './FormGenerator';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponent;
  renderCallback: (path: string) => unknown;
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

  function getContent() {
    return (
      <>
        <Controller
          control={props.control}
          name={props.name}
          render={({ fieldState }) => (
            <span style={{ color: 'red' }}>{fieldState.error?.message}</span>
          )}
        />
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{ position: 'relative', marginTop: '10px' }}
          >
            {!isComponentSingularAndOptional(props.component) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <div
                  style={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    width: '25%',
                    marginRight: '5px',
                  }}
                />
                <Chip
                  label={`${t(props.component.label ?? '')} ${index + 1}`}
                />
                <div
                  style={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    width: '25%',
                    marginLeft: '5px',
                  }}
                />
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
              />
            )}
            <Grid
              container
              item
              xs={12}
              spacing={2}
              justifyContent='flex-start'
              alignItems='center'
              direction='row'
            >
              {
                props.renderCallback(
                  `${props.name}[${index}]` as const,
                ) as JSX.Element
              }
            </Grid>
          </div>
        ))}
        {props.component.mode === 'input' &&
          fields.length < (props.component.repeat?.repeatMax ?? 1) && (
            <Button
              sx={{ mt: 1, mb: 1 }}
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
          )}
      </>
    );
  }

  return isFirstLevel(props.name) ? (
    <span
      key={props.name}
      className='anchorLink'
      id={`anchor_${props.component.name}`}
    >
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {props.component.showLabel === true ? (
            <Typography
              text={props.component?.label ?? ''}
              variant={headlineLevelToTypographyVariant(
                props.component.headlineLevel,
              )}
            />
          ) : null}
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
        {getContent()}
      </Box>
    </span>
  ) : (
    <Grid
      item
      xs={12}
      sm={props.component.gridColSpan}
      id='temp2'
      flexDirection='column'
      style={
        {
          // flexBasis:
          //   props.component.presentationStyle === 'inline' ? 'auto' : '100%',
        }
      }
    >
      {getContent()}
    </Grid>
  );
};
