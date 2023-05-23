import { useState, useEffect, SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete as MuiAutocomplete, IconButton } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { SelectItem } from '../../index';

interface MultiAutoCompleteProps {
  loading: boolean;
  values: string[];
  placeholder?: string;
  options: SelectItem[];
  onChange?: (id: string[]) => void;
  onBrowseButtonClicked?: () => void;
}

export const MultiAutoComplete = (
  props: MultiAutoCompleteProps,
): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(props.values);
  }, [props.values]);

  const getItemsFromIds = () => {
    return props.options.filter((item) => selected.indexOf(item.id) > -1);
  };

  return (
    <MuiAutocomplete
      value={getItemsFromIds()}
      onChange={(event: SyntheticEvent, selectItems: SelectItem[]) => {
        const ids = selectItems.map((item) => item.id);
        setSelected(ids);
        if (props.onChange) props.onChange(ids);
      }}
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
