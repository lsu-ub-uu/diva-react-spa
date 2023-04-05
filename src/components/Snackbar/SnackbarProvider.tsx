import { styled } from '@mui/material';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

interface SnackbarProviderProps {
  maxSnack: number;
  children: React.ReactNode;
}

const StyledSnackbarProvider = styled(NotistackSnackbarProvider)(() => ({
  '&.notistack-MuiContent': {
    backgroundColor: '#efefef',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  '&.notistack-MuiContent-success': {
    svg: {
      color: 'rgb(56, 142, 60)',
      fill: 'rgb(56, 142, 60)',
    },
  },
  '&.notistack-MuiContent-error': {
    svg: {
      color: 'rgb(211, 47, 47)',
      fill: 'rgb(211, 47, 47)',
    },
  },
  '&.notistack-MuiContent-warning': {
    svg: {
      color: 'rgb(245, 124, 0)',
      fill: 'rgb(245, 124, 0)',
    },
  },
  '&.notistack-MuiContent-info': {
    svg: {
      color: 'rgb(2, 136, 209)',
      fill: 'rgb(2, 136, 209)',
    },
  },
}));

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  return (
    <StyledSnackbarProvider maxSnack={props.maxSnack}>
      {props.children}
    </StyledSnackbarProvider>
  );
};
