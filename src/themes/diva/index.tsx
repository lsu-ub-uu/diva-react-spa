import {
  createTheme,
  PaletteColorOptions,
  Shadows,
} from '@mui/material/styles';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1TextStyle: CSSProperties;
    h2TextStyle: CSSProperties;
    h3TextStyle: CSSProperties;
    h4TextStyle: CSSProperties;
    h5TextStyle: CSSProperties;
    h6TextStyle: CSSProperties;
    bodyTextStyle: CSSProperties;
  }

  interface TypographyVariantsOptions {
    h1TextStyle?: CSSProperties;
    h2TextStyle?: CSSProperties;
    h3TextStyle?: CSSProperties;
    h4TextStyle?: CSSProperties;
    h5TextStyle?: CSSProperties;
    h6TextStyle?: CSSProperties;
    bodyTextStyle?: CSSProperties;
  }

  interface Palette {
    blue: PaletteColorOptions;
    purple: PaletteColorOptions;
    green: PaletteColorOptions;
    red: PaletteColorOptions;
    yellow: PaletteColorOptions;
    gray: PaletteColorOptions;
  }
  interface PaletteOptions {
    blue: PaletteColorOptions;
    purple: PaletteColorOptions;
    green: PaletteColorOptions;
    red: PaletteColorOptions;
    yellow: PaletteColorOptions;
    gray: PaletteColorOptions;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1TextStyle: true;
    h2TextStyle: true;
    h3TextStyle: true;
    h4TextStyle: true;
    h5TextStyle: true;
    h6TextStyle: true;
    bodyTextStyle: true;
  }
}
const { palette } = createTheme();
export const divaTheme = createTheme({
  shadows: Array(25).fill('none') as Shadows,
  transitions: {
    create: () => 'none',
  },
  typography: {
    fontFamily: 'Arial',
    button: {
      textTransform: 'none',
    },
    h1TextStyle: {
      fontSize: '2rem',
      fontWeight: '600',
    },
    h2TextStyle: {
      fontSize: '1.5rem',
      fontWeight: '400',
    },
    h3TextStyle: {
      fontSize: '3rem',
    },
    h4TextStyle: {
      fontSize: '2rem',
    },
    h5TextStyle: {
      fontSize: '2rem',
    },
    h6TextStyle: {
      fontSize: '2rem',
    },
    bodyTextStyle: {
      fontSize: '1rem',
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
      main: '#ff1744',
    },
    purple: palette.augmentColor({
      color: {
        light: '#75598e',
        main: '#613985',
      },
    }),
    blue: palette.augmentColor({
      color: {
        light: '#d6e7f3',
        main: '#0d6efd',
        dark: '#0555a4',
      },
    }),
    red: palette.augmentColor({
      color: {
        light: '#EEDCDB',
        main: '#990000',
        dark: '#730000',
      },
    }),
    green: palette.augmentColor({
      color: {
        light: '#d9eadb',
        main: '#00700f',
      },
    }),
    gray: palette.augmentColor({
      color: {
        light: '#faf9f8',
        main: '#e7e3de',
        dark: '#9b8a7a',
      },
    }),
    yellow: palette.augmentColor({
      color: {
        light: '#fdf3d1',
        main: '#f6c244',
      },
    }),
  },
  components: {
    MuiCssBaseline: {},
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#efefef',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: '#efefef',
        },
      },
    },
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
          border: '1px solid #000',
          borderRadius: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fff',
          border: '1px solid #000',
          borderRadius: 0,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
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
        root: {
          contentBox: 'border-box',
        },
        outlined: {
          borderColor: '#333',
          borderWidth: 3,
          '&:hover': {
            borderWidth: 3,
            borderColor: '#111',
          },
        },
        contained: {
          border: '3px solid #333',
          '&:hover': {
            border: '3px solid #111',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1TextStyle: 'h1',
          h2TextStyle: 'h2',
          h3TextStyle: 'h3',
          h4TextStyle: 'h4',
          h5TextStyle: 'h5',
          h6TextStyle: 'h6',
          bodyTextStyle: 'p',
        },
      },
    },
  },
});
