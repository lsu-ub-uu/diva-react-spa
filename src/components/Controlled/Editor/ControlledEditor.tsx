import { FormControl, FormLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

interface ControlledEditorProps {
  name: string;
  control?: Control<any>;
  label: string;
}

export const ControlledEditor = (props: ControlledEditorProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel
            required={false}
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
              toolbar:
                'italic | alignleft aligncenter alignright | fullscreen | code paste charmap superscript subscript',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </FormControl>
      )}
    />
  );
};
