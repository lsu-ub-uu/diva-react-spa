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
 */

import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from '@mui/material';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import styles from './TextField.module.css';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
  parentPresentationStyle?: string;
  showLabel?: boolean;
  hasValue?: boolean;
  inputFormat?: 'password';
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const ControlledTextField = ({
  name,
  control,
  label,
  placeholder,
  required,
  readOnly,
  multiline,
  tooltip,
  displayMode,
  parentPresentationStyle,
  showLabel,
  hasValue,
  inputFormat,
  attributes,
  actionButtonGroup,
}: ControlledTextFieldProps) => {
  const { t } = useTranslation();
  const hasDisplayMode = displayMode ?? 'input';

  if (hasDisplayMode === 'output' && !hasValue) {
    return null;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const fieldWithoutRef = { ...field, ref: undefined };
        return (
          <div
            className={styles.textVarInput}
            /* fullWidth
            sx={{
              flexDirection:
                parentPresentationStyle === 'inline' ? 'row' : 'column',
              alignItems: 'baseline',
            }} */
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div className={styles.inputWrapper}>
                {showLabel && <label htmlFor={name}>{t(label)}</label>}
                {tooltip && (
                  <Tooltip
                    title={t(tooltip.title)}
                    body={t(tooltip.body)}
                  >
                    <IconButton
                      sx={{ m: -1 }}
                      aria-label='Help'
                      disableRipple
                      color='default'
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {attributes}
              </div>
              {actionButtonGroup}
            </div>

            {displayMode === 'input' ? (
              <input
                id={name}
                placeholder={
                  placeholder !== undefined ? (t(placeholder) as string) : ''
                }
              />
            ) : (
              /* <TextField
                  multiline={multiline ?? false}
                  rows={multiline ? 3 : 1}
                  id={field.name}
                  size='small'
                  error={error !== undefined}
                  {...fieldWithoutRef}
                  inputRef={field.ref}
                  onBlur={field.onBlur}
                  autoComplete='off'
                  placeholder={
                    placeholder !== undefined ? (t(placeholder) as string) : ''
                  }
                  fullWidth
                  variant='outlined'
                  helperText={error !== undefined ? error.message : ' '}
                  InputProps={{
                    readOnly: readOnly,
                    endAdornment: (
                      <ErrorIcon
                        sx={{
                          color: '#ff0000',
                          visibility: error !== undefined ? 'visible' : 'hidden',
                        }}
                      />
                    ),
                  }}
                  type={inputFormat}
                /> */
              <>
                <span>{field.value}</span>
                <input
                  type='hidden'
                  value={field.value}
                  name={field.name}
                />
              </>
            )}
          </div>
        );
      }}
    />
  );
};
