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

import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Autocomplete, Option, Tooltip } from '../../index';

interface ControlledSelectFieldProps {
  name: string;
  label: string;
  control?: Control<any>;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
  showLabel?: boolean;
  searchLink?: string;
}

export const ControlledAutocomplete2 = (props: ControlledSelectFieldProps) => {
  const { t } = useTranslation();
  const displayMode =
    props.displayMode !== undefined ? props.displayMode : 'input';

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field: { onChange, ref, value, name, onBlur },
        fieldState: { error },
      }) => (
        <FormControl fullWidth>
          <FormLabel
            htmlFor={name}
            aria-label={props.label}
            required={props.required}
            error={error !== undefined}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            {t(props.label)}
            {props.tooltip && (
              <Tooltip
                title={t(props.tooltip.title)}
                body={t(props.tooltip.body)}
              >
                <IconButton
                  edge='end'
                  aria-label='Help'
                  disableRipple
                  color='default'
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            )}
          </FormLabel>
          <Autocomplete
            placeholder={props.placeholder}
            readOnly={!!props.readOnly}
            displayMode={props.displayMode}
            searchLink={props.searchLink}
          />

          <FormHelperText error={error !== undefined}>
            {error !== undefined ? error.message : ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
