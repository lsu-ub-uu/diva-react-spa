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

export interface FormSchema {
  form: FormComponentGroup;
}

export interface RecordFormSchema extends FormSchema {
  validationTypeId: string;
}

export interface SearchFormSchema extends FormSchema {
  recordTypeToSearchIn: string[];
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

export interface LinkedPresentation {
  presentationId: string;
  presentedRecordType: string;
}
type FormComponentMode = 'input' | 'output' | undefined;

export interface FormComponentBase {
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
}
export interface FormComponentMetadata extends FormComponentBase {
  placeholder?: string;
  mode: FormComponentMode;
  tooltip?: FormComponentTooltip;
  label?: string;
  showLabel: boolean;
  headlineLevel?: string;
  attributesToShow?: 'all' | 'selectable' | 'none';
  repeat?: FormComponentRepeat;
  finalValue?: string;
  gridColSpan?: number;
  childStyle?: string[];
  presentationStyle?: string; // frame etc
}

export interface FormComponentVar extends FormComponentMetadata {
  inputType?: 'input' | 'textarea'; // really be optional?
  inputFormat?: 'password';
  validation?: FormRegexValidation | FormNumberValidation;
  attributes?: FormAttributeCollection[];
}

export interface FormComponentNumVar extends FormComponentMetadata {
  validation?: FormRegexValidation | FormNumberValidation;
  attributes?: FormAttributeCollection[];
}
export interface FormComponentCollVar extends FormComponentMetadata {
  options?: FormComponentCollItem[];
  attributes?: FormAttributeCollection[];
}

interface FormComponentCollItem {
  value: string;
  label: string;
}

export interface FormComponentRecordLink extends FormComponentMetadata {
  attributes?: FormAttributeCollection[];
  recordLinkType?: string;
  presentationRecordLinkId?: string;
  search?: string;
  linkedRecordPresentation?: LinkedPresentation;
}

export interface FormComponentContainer extends FormComponentMetadata {
  containerType?: 'repeating' | 'surrounding';
  components?: FormComponent[];
}

export interface FormComponentGroup extends FormComponentMetadata {
  attributes?: FormAttributeCollection[];
  components?: FormComponent[];
}

export interface FormComponentText extends FormComponentMetadata {
  textStyle?:
    | 'h1TextStyle'
    | 'h2TextStyle'
    | 'h3TextStyle'
    | 'h4TextStyle'
    | 'h5TextStyle'
    | 'h6TextStyle'
    | 'bodyTextStyle';
  childStyle?: string[];
}

export interface FormComponentGuiElement extends FormComponentBase {
  url?: string; // used for guiElementLink
  elementText?: string; // used for guiElementLink
  presentAs?: string; // used for guiElementLink
}

export type FormComponent =
  | FormComponentVar
  | FormComponentNumVar
  | FormComponentCollVar
  | FormComponentRecordLink
  | FormComponentContainer
  | FormComponentGroup
  | FormComponentText
  | FormComponentGuiElement;

export type FormComponentWithData =
  | FormComponentVar
  | FormComponentNumVar
  | FormComponentCollVar
  | FormComponentRecordLink
  | FormComponentGroup;

type FormAttributeCollection = Omit<
  FormComponentCollVar,
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
