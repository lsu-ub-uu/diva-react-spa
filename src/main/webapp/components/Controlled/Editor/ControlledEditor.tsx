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

import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

interface ControlledEditorProps {
  name: string;
  control?: Control<any>;
  label: string;
  required: boolean;
  toolbar: string;
  plugins: string;
}

export const ControlledEditor = (props: ControlledEditorProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field: { name, onChange, value, ref },
        fieldState: { error },
      }) => (
        <FormControl fullWidth>
          <FormLabel
            htmlFor={name}
            required={props.required}
            error={error !== undefined}
          >
            {props.label}
          </FormLabel>
          <Editor
            id={name}
            tinymceScriptSrc='/tinymce/tinymce.min.js'
            ref={ref}
            onEditorChange={onChange}
            value={value}
            init={{
              statusbar: false,
              height: 300,
              width: '100%',
              menubar: false,
              plugins: props.plugins,
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
