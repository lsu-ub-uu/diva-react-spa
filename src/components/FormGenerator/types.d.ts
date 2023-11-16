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

import { Option } from '../index';

export interface FormSchema {
  validationTypeId: string;
  form: FormComponent;
}

export interface FormComponentRepeat {
  repeatMin: number;
  repeatMax: number;
  minNumberOfRepeatingToShow?: number;
}

export interface FormComponentTooltip {
  title: string;
  body: string;
}

export interface FormComponent {
  type:
    | 'recordLink'
    | 'collectionVariable'
    | 'numberVariable'
    | 'textVariable'
    | 'group'
    | 'text'
    | 'container'
    | 'guiElementLink';
  name: string;
  label?: string;
  finalValue?: string;
  placeholder?: string;
  validation?: FormRegexValidation | FormNumberValidation;
  repeat?: FormComponentRepeat;
  tooltip?: FormComponentTooltip;
  inputType?: 'input' | 'textarea'; // really be optional?
  mode?: string;
  options?: Option[];
  attributes?: FormAttributeCollection[];
  components?: FormComponent[]; // for groups
  textStyle?:
    | 'h1TextStyle'
    | 'h2TextStyle'
    | 'h3TextStyle'
    | 'h4TextStyle'
    | 'h5TextStyle'
    | 'h6TextStyle'
    | 'bodyTextStyle';
  childStyle?: string[];
  gridColSpan?: number;
  url?: string; // used for guiElementLink
  elementText?: string; // used for guiElementLink
  presentAs?: string; // used for guiElementLink
  containerType?: 'repeating' | 'surrounding';
  presentationStyle?: string; // frame etc
  headlineLevel?: string;
}

type FormAttributeCollection = Omit<
  FormComponent,
  'repeat' | 'inputType' | 'attributes'
>;

interface FormRegexValidation {
  type: 'regex';
  pattern: string;
}

interface FormNumberValidation {
  type: 'number';
  min: number;
  max: number;
  warningMin: number;
  warningMax: number;
  numberOfDecimals: number;
}
