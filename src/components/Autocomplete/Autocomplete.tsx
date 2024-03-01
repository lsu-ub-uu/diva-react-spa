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
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {
  Autocomplete as MuiAutocomplete,
  FormLabel,
  IconButton,
} from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';
import { SelectItem, Tooltip } from '../index';

interface AutoCompleteProps {
  name: string;
  // control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
  parentPresentationStyle?: string;
  showLabel?: boolean;
  options: SelectItem[];
  onSelected?: (id: string) => void;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

interface Film {
  title: string;
  year: number;
}

export const Autocomplete = (props: AutoCompleteProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Film[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const { t } = useTranslation();
  return (
    <>
      <FormLabel
        // htmlFor={field.name}
        aria-label={props.label}
        required={props.required}
        // error={error !== undefined}
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
      <MuiAutocomplete
        size='small'
        popupIcon={<ExpandMoreIcon />}
        onChange={(event: React.SyntheticEvent, value: Film | null) => {
          // onChange={(event: React.SyntheticEvent, value: SelectItem | null) => {
          if (props.onSelected && value != null) props.onSelected(value.title);
          // if (props.onSelected && value != null) props.onSelected(value.id);
        }}
        // isOptionEqualToValue={(option, value) => option.id === value.id}
        id='autocomplete-test'
        sx={{ width: '100%' }}
        // options={props.options}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        // getOptionLabel={(option) => option.title}
        options={options}
        // getOptionDisabled={(option) => option.disabled ?? false}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={props.placeholder ?? 'Search'}
            margin='normal'
          />
        )}
        renderOption={(renderProps, option, { inputValue }) => {
          const matches = match(option.title, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.title, matches);

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
    </>
  );
};
