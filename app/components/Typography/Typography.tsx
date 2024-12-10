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

import { useTranslation } from 'react-i18next';
import { SxProps, Typography as MuiTypography } from '@mui/material';
import { ElementType } from 'react';

export interface DivaTypographyVariants {
  variant:
    | 'h1TextStyle'
    | 'h2TextStyle'
    | 'h3TextStyle'
    | 'h4TextStyle'
    | 'h5TextStyle'
    | 'h6TextStyle'
    | 'bodyTextStyle'
    | 'boldTextStyle';
}

interface TypographyProps extends DivaTypographyVariants {
  text: string;
  sx?: SxProps;
}

const mapHeaderStyleToComponent = (headerStyle: string): ElementType => {
  // hack to get header components to render correctly
  return headerStyle.slice(0, 2) as ElementType;
};

export const Typography = (props: TypographyProps) => {
  const { t } = useTranslation();

  return (
    <MuiTypography
      component={
        props.variant.startsWith('bo')
          ? 'p'
          : mapHeaderStyleToComponent(props.variant)
      }
      variant={props.variant}
      sx={props.sx}
    >
      {t(props.text)}
    </MuiTypography>
  );
};
