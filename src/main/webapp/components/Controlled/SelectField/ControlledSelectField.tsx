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
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import { Select } from '../../Form/Select/Select';
import { Option, Tooltip } from '../../index';

interface ControlledSelectFieldProps {
  name: string;
  label: string;
  control?: Control<any>;
  options?: Option[];
  isLoading: boolean;
  loadingError: boolean;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
}

export const ControlledSelectField = (props: ControlledSelectFieldProps) => {
  const { t } = useTranslation();
  const displayMode = props.displayMode ?? 'input';

  const findOptionLabelByValue = (
    array: Option[] | undefined,
    value: string,
  ): string => {
    if (array === undefined) return 'Failed to translate';
    const option = array.find((opt) => opt.value === value);
    return option?.label ?? 'Failed to translate';
  };

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
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            )}
          </FormLabel>
          {displayMode === 'input' ? (
            <Select
              sx={{
                '& .MuiSelect-select .notranslate::after': props.placeholder
                  ? {
                      content: `"${t(props.placeholder)}"`,
                      opacity: 0.42,
                    }
                  : {},
              }}
              inputProps={{
                id: props.name,
                inputRef: ref,
                readOnly: props.readOnly,
              }}
              labelId={name}
              onBlur={onBlur}
              size='small'
              value={props.options?.length ? value : ''}
              onChange={onChange}
              /* ref={ref} */
              fullWidth
              loadingError={props.loadingError}
              error={error !== undefined}
              loading={props.isLoading}
            >
              <MenuItem
                value=''
                disableRipple
              >
                <em>{t('divaClient_optionNoneText')}</em>
              </MenuItem>
              {props.options &&
                props.options.map((item, index) => {
                  return (
                    <MenuItem
                      disabled={item.disabled}
                      key={`${props.name}_$option-${index}`}
                      disableRipple
                      value={item.value}
                    >
                      {t(item.label)}
                    </MenuItem>
                  );
                })}
            </Select>
          ) : (
            <>
              <span>{t(findOptionLabelByValue(props.options, value))}</span>
              <input
                type='hidden'
                value={value}
                name={name}
              />
            </>
          )}
          <FormHelperText error={error !== undefined}>
            {error !== undefined ? error.message : ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
