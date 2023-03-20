import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import {
  Card as MuiCard,
  CardHeader,
  Grid,
  IconButton,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import { ReactNode } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '../Tooltip/Tooltip';

const StyledCardHeader = styled(CardHeader)((props) => ({
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: '#e6f0f7',
  paddingTop: props.theme.spacing(1.5),
  paddingBottom: props.theme.spacing(1.5),
  paddingLeft: props.theme.spacing(4),
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

export const Card = (props: CardProps) => {
  return (
    <MuiCard
      sx={[
        {
          maxWidth: '100%',
          borderRadius: 0,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <StyledCardHeader
        action={props.action}
        sx={{
          ...(props.variant === 'variant1' && {
            backgroundColor: '#d6e7f3;',
            borderBottom: '2px solid #5389c0',
          }),
          ...(props.variant === 'variant2' && {
            backgroundColor: '#eedcdb;',
            borderBottom: '2px solid #cc908c',
          }),
          ...(props.variant === 'variant3' && {
            backgroundColor: '#d9eadb;',
            borderBottom: '2px solid #a6c9a4',
          }),
          ...(props.variant === 'variant4' && {
            backgroundColor: '#ded5e7;',
            borderBottom: '2px solid #8566a1',
          }),
          ...(props.variant === 'variant5' && {
            backgroundColor: '#f8e7d8;',
            borderBottom: '2px solid #e09b60',
          }),
          ...(props.variant === 'variant6' && {
            backgroundColor: '#e6f0f7;',
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
            <Grid item>{props.title}</Grid>
            <Grid item>
              <InfoButton
                title={props.tooltipTitle}
                body={props.tooltipBody}
              />
            </Grid>
          </Grid>
        }
      />
      <StyledCardContent
        sx={{
          ...(props.variant !== 'variant6' && {
            backgroundColor: '#fff;',
          }),
          ...(props.variant === 'variant6' && {
            backgroundColor: 'f7fafd;',
          }),
        }}
      >
        {props.children}
      </StyledCardContent>
    </MuiCard>
  );
};
