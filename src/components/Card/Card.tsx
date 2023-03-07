import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import {
  Card as MuiCard,
  CardHeader,
  Grid,
  IconButton,
  styled,
} from '@mui/material';
import { ReactNode } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '../Tooltip/Tooltip';

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: '#d6e7f3',
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(4),
  minHeight: theme.spacing(1 / 2),
  borderBottom: '2px solid #5388c0',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => {
  return {
    backgroundColor: '#fff',
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
  variant: 'variant1' | 'variant2';
  tooltipTitle: string;
  tooltipBody: string;
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
    <MuiCard sx={{ maxWidth: '100%', borderRadius: 0 }}>
      <StyledCardHeader
        action={props.action}
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
      <StyledCardContent>{props.children}</StyledCardContent>
    </MuiCard>
  );
};
