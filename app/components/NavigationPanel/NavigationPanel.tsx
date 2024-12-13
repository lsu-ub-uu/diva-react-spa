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

import { useState, useEffect } from 'react';
import { Step, StepButton, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { NavigationPanelLink } from '../index';

export interface NavigationPanelProps {
  links: NavigationPanelLink[];
  activeLinkName?: string;
}

export const NavigationPanel = (props: NavigationPanelProps) => {
  const [activeLinkName, setActiveLinkName] = useState(props.activeLinkName);
  const { t } = useTranslation();

  useEffect(() => {
    setActiveLinkName(props.activeLinkName);
  }, [props.activeLinkName]);

  const findActiveLinkNameIndex = (linkName: string | undefined): number => {
    if (linkName === undefined) return 0;
    return props.links.findIndex((link) => link.name === linkName);
  };

  return (
    <Stepper
      sx={{
        '& .MuiStepper-root': {
          width: 'inherit',
          height: 'inherit',
        },
        '& .MuiSvgIcon-root': {
          borderRadius: '50%',
          stroke: '#613985',
          strokeWidth: '3px',
        },
        '& .MuiSvgIcon-root:not(.Mui-completed)': {
          color: 'white',
        },
        '& .MuiStepIcon-text': {
          fill: '#613985',
          display: 'none',
        },
        '& .MuiStepConnector-line': {
          minHeight: '12px',
          marginTop: '-6px',
          marginBottom: '-6px !important',
        },
        '& .MuiSvgIcon-root.Mui-active': {
          color: '#613985',
          stroke: '#613985',
          strokeWidth: '3px',
        },
        '& .MuiSvgIcon-root.Mui-completed': {
          color: '#c1b3ce',
          stroke: '#c1b3ce',
          strokeWidth: '3px',
        },
      }}
      orientation='vertical'
      nonLinear
      activeStep={findActiveLinkNameIndex(activeLinkName)}
    >
      {props.links.map((item, index) => (
        <Step key={`${item.name}_[${index}]`}>
          <StepButton
            focusRipple
            // disableRipple
            href={`#anchor_${item.name}`}
            onClick={() => {
              setActiveLinkName(item.name);
            }}
          >
            {t(item.label)}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};
