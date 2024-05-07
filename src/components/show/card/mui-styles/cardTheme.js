import { createTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { green, lightGreen, orange, yellow } from '@mui/material/colors';

// export const theme = createTheme({

// })
export const getDesignTokens = (mode) => ({

  breakpoints: {
    values: {
      micro: 0,
      mini: 360,
      mobile: 400,
      Mmoble: 500,
      MaxMoble: 601,
      tablet: 640,
      Ltablet: 768,
      laptop: 1024,
      desktop: 1280
    }
  },
  typography: {
    fontFamily: 'Poppins',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  
  palette: {
    mode,
    primary: {
      ...lightGreen,
      ...(mode === 'dark' ? {
        main: lightGreen['A700'],
      } : {
        main: green['900'],
      }),
    },
    secondary: {
      ...orange,
      ...(mode === 'dark' ? {
        main: orange[200]
      } : {
        main: orange[800]
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: 'hsl(123, 61%, 15%)',
        paper: 'hsl(123, 61%, 15%)',
        secondary: 'hsl(123, 61%, 15%)',
      },

    }),
    ...(mode === 'light' && {
      background: {
        default: orange[200],
        paper: orange[200],
        secondary: orange[800]
      },

    }),
     
      text: {
        ...(mode === 'light'
          ? {
            primary: yellow[900],
            secondary: '#5d0303',
          }
          : {
            primary: yellow[500],
            secondary: yellow[500],
          }),
      },
      border: {
        color: 'black',
      }

    },
  });
// export function Min600MediaQuery() {
//   const matches = useMediaQuery('(min-width:600px)');
// }