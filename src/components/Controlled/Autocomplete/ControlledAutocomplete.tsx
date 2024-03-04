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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Control, Controller } from 'react-hook-form';
import React from 'react';
import { FormControl, FormLabel, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '../../Autocomplete/Autocomplete';
import { Tooltip } from '../../Tooltip/Tooltip';

interface ControlledAutocompleteProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
  showLabel?: boolean;
  searchLink?: string;
}

export const ControlledAutocomplete = (props: ControlledAutocompleteProps) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            <FormLabel
              htmlFor={field.name}
              aria-label={props.label}
              error={error !== undefined}
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {props.showLabel === true ? t(props.label) : null}
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
              // name={props.name}
              placeholder={props.placeholder}
              readOnly={!!props.readOnly}
              displayMode={props.displayMode}
              searchLink={props.searchLink}
            />
          </FormControl>
        );
      }}
    />
  );
};
