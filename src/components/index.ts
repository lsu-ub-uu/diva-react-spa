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

export { Layout } from './Layout';
export { Section } from './Section/Section';
export { AsidePortal } from './AsidePortal/AsidePortal';
export { Tooltip } from './Tooltip/Tooltip';
export { Dialog } from './Dialog/Dialog';
export { Backdrop } from './Backdrop/Backdrop';
export { Card } from './Card/Card';
export { Search } from './Search/Search';
export { BackdropProvider, useBackdrop } from './Backdrop/BackdropContext';
export { FileUpload } from './FileUpload/FileUpload';
export {
  HorizontalStepper,
  StepIcon,
} from './HorizontalStepper/HorizontalStepper';
export { TabsMenu } from './TabsMenu/TabsMenu';
export { Select } from './Form/Select/Select';
export { Checkbox } from './Form/Checkbox/Checkbox';
export { Radio } from './Form/Radio/Radio';
export { RichTree } from './RichTree/RichTree';
export { ControlledAutocomplete } from './Controlled/Autocomplete/ControlledAutocomplete';
export { SubjectCategoryPicker } from './SubjectCategoryPicker/SubjectCategoryPicker';
export { ResearchSubjectPicker } from './ResearchSubjectPicker/ResearchSubjectPicker';
export { DatePicker } from './Form/DatePicker/DatePicker';
export { DateTimePicker } from './Form/DateTimePicker/DateTimePicker';
export { ErrorSummary } from './Form/ErrorSummary/ErrorSummary';
export { SnackbarProvider } from './Snackbar/SnackbarProvider';
export { FormGenerator } from './FormGenerator/FormGenerator';
export { Typography } from './Typography/Typography';
export { LinkButton } from './LinkButton/LinkButton';
export { NavigationPanel } from './NavigationPanel/NavigationPanel';
export { LinkedRecord } from './LinkedRecord/LinkedRecord';

export {
  useSectionScroller,
  linksFromFormSchema,
} from './NavigationPanel/useSectionScroller';

export interface SelectItem {
  id: string;
  name: string;
  disabled?: boolean;
  parentId?: string;
}

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NavigationPanelLink {
  name: string;
  label: string;
}
