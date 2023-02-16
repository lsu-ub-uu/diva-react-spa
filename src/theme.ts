import { createTheme, Shadows } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  shadows: Array(25).fill('none') as Shadows,
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
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
