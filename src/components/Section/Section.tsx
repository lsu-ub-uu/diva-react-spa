import { ReactNode } from 'react';
import { styled, Box, SxProps, Theme, Typography } from '@mui/material';

export interface SectionProps {
  children?: ReactNode;
  title?: string;
  sx?: SxProps<Theme>;
}

const Content = styled(Box)(({ theme }) => {
  return {
    backgroundColor: '#fff',
    padding: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  };
});

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: '#eee',
  minHeight: theme.spacing(1 / 2),
  borderBottom: '2px solid black',
}));

const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  color: theme.palette.primary.main,
  fontWeight: 600,

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const Section = (props: SectionProps) => {
  return (
    <Box sx={props.sx}>
      <Header>{props.title && <Title>{props.title}</Title>}</Header>
      <Content>{props.children}</Content>
    </Box>
  );
};
