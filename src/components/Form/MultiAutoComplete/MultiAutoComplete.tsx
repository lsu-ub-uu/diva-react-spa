import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete as MuiAutocomplete, IconButton } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { SelectItem } from '../../index';

interface MultiAutoCompleteProps {
  loading: boolean;
  placeholder?: string;
  options: SelectItem[];
  onSelected?: (id: string) => void;
  onBrowseButtonClicked?: () => void;
}

export const MultiAutoComplete = (
  props: MultiAutoCompleteProps,
): JSX.Element => {
  // store items selected string[]

  return (
    <MuiAutocomplete
      loading={props.loading}
      clearText='Clear all'
      size='small'
      multiple
      popupIcon={<ExpandMoreIcon />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      id='autocomplete-multi-select'
      sx={{ width: '100%' }}
      options={props.options}
      getOptionDisabled={(option) => option.disabled ?? false}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          // inputRef={ref}
          variant='outlined'
          {...params}
          // error={error !== undefined}
          placeholder='Search'
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <IconButton
                  title='Browse research subjects'
                  aria-label='browse'
                  onClick={() => {
                    if (props.onBrowseButtonClicked) {
                      props.onBrowseButtonClicked();
                    }
                  }}
                >
                  <AccountTreeIcon />
                </IconButton>
                {params.InputProps.startAdornment}
              </>
            ),
          }}
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
