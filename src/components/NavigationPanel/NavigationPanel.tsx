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

import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import { NavigationPanelLink } from '../index';

export interface NavigationPanelProps {
  links: NavigationPanelLink[];
  activeLinkName?: string;
}

export const NavigationPanel = (props: NavigationPanelProps) => {
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
      activeStep={findActiveLinkNameIndex(props.activeLinkName)}
    >
      {props.links.map((item) => (
        <Step key={item.name}>
          <StepButton
            disableRipple
            href={`#${item.name}`}
          >
            {item.label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};
