import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

interface ControlledEditorProps {
  name: string;
  control?: Control<any>;
  label: string;
  required: boolean;
  toolbar: string;
}

export const ControlledEditor = (props: ControlledEditorProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel
            required={props.required}
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          <Editor
            tinymceScriptSrc='/tinymce/tinymce.min.js'
            ref={ref}
            onEditorChange={onChange}
            value={value}
            init={{
              statusbar: false,
              height: 300,
              width: '100%',
              menubar: false,
              plugins: ['code fullscreen paste charmap'],
              toolbar: props.toolbar,
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <FormHelperText error={error !== undefined}>
            {error !== undefined ? error.message : ' '}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
