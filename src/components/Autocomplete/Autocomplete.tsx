import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface SelectItem {
  id: string;
  name: string;
}

interface AutoCompleteProps {
  options: SelectItem[];
}

export const Autocomplete = (props: AutoCompleteProps): JSX.Element => {
  return (
    <MuiAutocomplete
      popupIcon={<ExpandMoreIcon />}
      onChange={(event: React.SyntheticEvent, value: SelectItem | null) => {
        alert(JSON.stringify(value));
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      id='autocomplete-test'
      sx={{ width: '100%' }}
      options={props.options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Sök'
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
