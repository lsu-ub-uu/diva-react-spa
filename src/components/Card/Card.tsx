import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { ReactNode } from 'react';

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: '#d6e7f3',
  paddingTop: theme.spacing(1),
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(1),
  minHeight: theme.spacing(1 / 2),
  borderBottom: '2px solid #5388c0',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => {
  return {
    backgroundColor: '#ececec',
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
}

export const Card = (props: CardProps) => {
  return (
    <MuiCard sx={{ maxWidth: '100%', borderRadius: 0 }}>
      <StyledCardHeader
        action={
          <IconButton aria-label='settings'>
            <ShareIcon />
          </IconButton>
        }
        titleTypographyProps={{
          variant: 'h5',
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
        title={props.title}
      />
      <StyledCardContent>{props.children}</StyledCardContent>
    </MuiCard>
  );
};
