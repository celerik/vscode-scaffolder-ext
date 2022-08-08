// @packages
import { createTheme, PaletteOptions } from '@mui/material/styles';

type IPalette = PaletteOptions;

const colors = {
  charcoal: '#354459',
  cornflowerBlue: '#708AEF',
  gunmetal: '#263344',
  hanBlue: '#3A78D1',
  japaneseIndigo: '#293648',
  lavanderGrey: '#BEC2D1',
  philippineSilver: '#B3B3B3',
  policeBlue: '#394A61',
  white: '#FFFFFF',
  chineseBlack: '#151515',
  raisinBlack: '#242424',
  sonicSilver: '#757575',
  outerSpace: '#444444'
};

const theme = createTheme({
  palette: {
    background: {
      default: colors.chineseBlack,
      hover: colors.raisinBlack,
      paper: colors.raisinBlack
    },
    grey: {
      500: colors.philippineSilver
    },
    primary: {
      main: colors.white
    },
    secondary: {
      main: colors.sonicSilver
    },
    text: {
      primary: colors.cornflowerBlue,
      secondary: colors.philippineSilver,
      third: colors.lavanderGrey
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
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.chineseBlack,
          color: 'white'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          padding: '10px 20px',
          height: 'min-content',
          color: colors.white,
          backgroundColor: 'rgb(9, 113, 241)',
          textTransform: 'capitalize',
          fontWeight: '500'
        },
        text: {
          color: colors.hanBlue
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.white
        }
      }
    }
  }
});

export default theme;
