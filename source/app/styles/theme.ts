// @packages
import {
  createTheme,
  PaletteOptions
} from '@mui/material/styles';

type IPalette = PaletteOptions;

const colors = {
  blue: '#708AEF',
  drakBlue: '#263344',
  lightBlue: '#394A61',
  lightGray: '#B3B3B3',
  white: '#FFFFFF'
};

const theme = createTheme({
  palette: {
    background: {
      default: colors.drakBlue,
      paper: colors.lightBlue,
    },
    grey: {
      600: colors.lightGray
    },
    primary: {
      main: colors.white
    },
    text: {
      main: colors.blue
    }
  } as IPalette,
  typography: {
    h1: {
      fontSize: 34,
      fontWeight: 400
    },
    h2: {
      fontSize: 28
    },
    h3: {
      fontSize: 23
    },
    h4: {
      fontSize: 19
    },
    h5: {
      fontSize: 17
    },
    body1: {
      fontSize: 15
    },
    body2: {
      fontSize: 12
    },
    caption: {
      fontSize: 10
    }
  }
});

export default theme;
