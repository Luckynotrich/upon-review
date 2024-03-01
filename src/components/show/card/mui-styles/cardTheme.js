import { createTheme } from "@mui/material";
import { green, lightGreen,orange, yellow } from '@mui/material/colors';

export const theme = createTheme({

})
export const getDesignTokens = (mode) => ({

  breakpoints:{
    values:{
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200
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
        }:{
          main: green['900'],
        }),
      },
      ...(mode === 'dark' && {
        background: {
          default: 'hsl(123, 61%, 15%)',
          paper: 'hsl(123, 61%, 15%)',
        },
      }),
      ...(mode === 'light' && {
        background: {
          default: orange[200],
          paper: orange[200],
        },
      }),
      text: {
        ...(mode === 'light'
          ? {
              primary: yellow[900],
              secondary: yellow[800],
            }
          : {
              primary: yellow[500],
              secondary: yellow[500],
            }),
      },
      border:{
        color: 'black',
      }
     
    },
  });
  