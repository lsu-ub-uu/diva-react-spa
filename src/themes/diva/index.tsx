import { createTheme, Shadows } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { LinkProps } from '@mui/material';

export const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  return (
    <RouterLink
      ref={ref}
      to={href}
      {...other}
    />
  );
});

LinkBehavior.displayName = 'linkBehaviour';

export const divaTheme = createTheme({
  shadows: Array(25).fill('none') as Shadows,
  transitions: {
    create: () => 'none',
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    primary: {
      main: '#010101',
    },
    secondary: {
      main: '#010101',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
        disableRipple: true,
      },
    },
  },
});
