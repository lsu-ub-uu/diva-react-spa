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

import type {
  IconButtonProps,
  SxProps,
  Theme} from '@mui/material';
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Collapse,
  Grid2 as Grid,
  IconButton,
  styled
} from '@mui/material';
import type { ReactNode} from 'react';
import { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip } from '@/components/Tooltip/Tooltip';

const StyledCardHeader = styled(CardHeader)((props) => ({
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: 'main',
  paddingTop: props.theme.spacing(1.5),
  paddingBottom: props.theme.spacing(1.5),
  paddingLeft: props.theme.spacing(1),
  minHeight: props.theme.spacing(1 / 2),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => {
  return {
    padding: theme.spacing(4),
    borderRadius: 0,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  };
});

export interface CardProps {
  children?: ReactNode;
  title?: string;
  action?: ReactNode;
  variant:
    | 'variant1'
    | 'variant2'
    | 'variant3'
    | 'variant4'
    | 'variant5'
    | 'variant6';
  tooltipTitle: string;
  tooltipBody: string;
  sx?: SxProps<Theme>;
  expanded?: boolean;
}

export interface InfoButtonProps {
  title: string;
  body: string;
}

const InfoButton = (props: InfoButtonProps) => {
  return (
    <Tooltip
      title={props.title}
      body={props.body}
    >
      <IconButton
        disableRipple
        color='info'
        aria-label='info'
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

type ExpandMoreProps = IconButtonProps & {
  expand: boolean;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * @deprecated
 */
export const LegacyCard = (props: CardProps) => {
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    setExpand(props.expanded ?? true);
  }, [props.expanded]);

  return (
    <MuiCard
      sx={[
        {
          overflow: 'visible',
          maxWidth: '100%',
          borderRadius: 0,
          marginBottom: '30px',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <StyledCardHeader
        action={props.action}
        sx={{
          ...(props.variant === 'variant1' && {
            backgroundColor: '#d6e7f3',
            borderBottom: '2px solid #5389c0',
          }),
          ...(props.variant === 'variant2' && {
            backgroundColor: '#eedcdb',
            borderBottom: '2px solid #cc908c',
          }),
          ...(props.variant === 'variant3' && {
            backgroundColor: '#d9eadb',
            borderBottom: '2px solid #00700F',
          }),
          ...(props.variant === 'variant4' && {
            backgroundColor: '#ded5e7',
            borderBottom: '2px solid #8566a1',
          }),
          ...(props.variant === 'variant5' && {
            backgroundColor: '#f8e7d8',
            borderBottom: '2px solid #e09b60',
          }),
          ...(props.variant === 'variant6' && {
            backgroundColor: '#e6f0f7',
            border: 'none',
          }),
        }}
        titleTypographyProps={{
          variant: 'h5',
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
        title={
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
          >
            <Grid>
              <ExpandMore
                disableRipple
                expand={expand}
                onClick={() => setExpand((prev) => !prev)}
                aria-expanded={expand}
                aria-label='expand'
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Grid>
            <Grid>{props.title}</Grid>
            <Grid>
              <InfoButton
                title={props.tooltipTitle}
                body={props.tooltipBody}
              />
            </Grid>
          </Grid>
        }
      />
      <Collapse in={expand}>
        <StyledCardContent
          sx={{
            ...(props.variant === 'variant1' && {
              backgroundColor: '#D6E7F333',
            }),

            ...(props.variant === 'variant2' && {
              backgroundColor: '#fcf8f8',
            }),
            ...(props.variant === 'variant3' && {
              backgroundColor: '#f6faf7',
            }),
            ...(props.variant === 'variant5' && {
              backgroundColor: '#fff',
              padding: 0,
            }),
            ...(props.variant === 'variant6' && {
              backgroundColor: '#f7fafd',
            }),
          }}
        >
          {props.children}
        </StyledCardContent>
      </Collapse>
    </MuiCard>
  );
};
