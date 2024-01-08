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

import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SelectItem } from '../index';

interface AutoCompleteProps {
  placeholder?: string;
  options: SelectItem[];
  onSelected?: (id: string) => void;
}

export const Autocomplete = (props: AutoCompleteProps): JSX.Element => {
  return (
    <MuiAutocomplete
      popupIcon={<ExpandMoreIcon />}
      onChange={(event: React.SyntheticEvent, value: SelectItem | null) => {
        if (props.onSelected && value != null) props.onSelected(value.id);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      id='autocomplete-test'
      sx={{ width: '100%' }}
      options={props.options}
      getOptionDisabled={(option) => option.disabled ?? false}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholder ?? 'Search'}
          margin='normal'
        />
      )}
      renderOption={(renderProps, option, { inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li {...renderProps}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};
