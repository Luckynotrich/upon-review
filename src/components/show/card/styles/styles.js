import { createTheme } from "@mui/material";

export const theme = createTheme({

    breakpoints:{
        values:{
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200
        }
    }
})
export const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        ...amber,
        ...(mode === 'dark' && {
          main: amber[300],
        }),
      },
      ...(mode === 'dark' && {
        background: {
          default: deepOrange[900],
          paper: deepOrange[900],
        },
      }),
      text: {
        ...(mode === 'light'
          ? {
              primary: grey[900],
              secondary: grey[800],
            }
          : {
              primary: '#fff',
              secondary: grey[500],
            }),
      },
      ...(mode === 'light' && {
          background: {
            default: amber[300],
            paper: deepOrange[900],
          },
        }),
    },
  });
  