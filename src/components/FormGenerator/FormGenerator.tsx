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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextField } from '../Controlled';

interface FormGeneratorProps {
  formSchema: FormSchema;
  onSubmit: () => void;
}

export interface FormSchema {
  validationTypeId: string;
  components: FormComponent[];
}

interface FormComponent {
  type: string;
  name: string;
  placeholder?: string;
  validation?: FormValidation;
}

interface FormValidation {
  type: 'regex';
  pattern: string;
}

const generateYupSchema = () => {
  return yup.object().shape({
    someNameInData: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z]$/),
  });
};

export const FormGenerator = (props: FormGeneratorProps) => {
  const methods = useForm({
    resolver: yupResolver(generateYupSchema()),
  });
  const generateFormComponent = (component: FormComponent, idx: number) => {
    const reactKey = `${component.name}_${idx}`;
    switch (component.type) {
      case 'inputText': {
        return (
          <ControlledTextField
            key={reactKey}
            label={component.name}
            name={component.name}
            placeholder={component.placeholder}
            control={methods.control}
          />
        );
      }
      default:
        return <h1 key={reactKey}>{component.name}</h1>;
    }
  };

  return (
    <Box
      component='form'
      onSubmit={methods.handleSubmit(props.onSubmit)}
    >
      {props.formSchema.components.map(generateFormComponent)}
      <Button
        type='submit'
        disableRipple
        variant='contained'
      >
        Submit
      </Button>
    </Box>
  );
};
