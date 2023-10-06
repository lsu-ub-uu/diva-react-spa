import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCoraRecordSearch } from '../../app/hooks';
import { Option } from '../index';

interface AutoCompleteProps {
  placeholder?: string;
  onSelected?: (id: string) => void;
}

export const Autocomplete = (props: AutoCompleteProps): JSX.Element => {
  const { isLoading, options, setQuery } = useCoraRecordSearch();

  return (
    <MuiAutocomplete
      loading={isLoading}
      popupIcon={<ExpandMoreIcon />}
      onChange={(event: React.SyntheticEvent, option: Option | null) => {
        if (props.onSelected && option != null) props.onSelected(option.value);
      }}
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue);
      }}
      // isOptionEqualToValue={(option, value) => option.id === value.id}
      id='autocomplete-test'
      sx={{ width: '100%' }}
      options={options}
      // getOptionDisabled={(option) => option.disabled ?? false}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholder ?? 'Search'}
          margin='normal'
        />
      )}
      renderOption={(renderProps, option, { inputValue }) => {
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

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
