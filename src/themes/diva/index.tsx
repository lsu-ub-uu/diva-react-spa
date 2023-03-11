import { createTheme, Shadows } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const divaTheme = createTheme({
  shadows: Array(25).fill('none') as Shadows,
  transitions: {
    create: () => 'none',
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 4,
  },
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#010101',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {},
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiLink: {},
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          border: '2px solid black',
          borderRadius: 0,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: '#000',
          borderWidth: 3,
          '&:hover': {
            borderWidth: 3,
          },
        },
      },
    },
  },
});
