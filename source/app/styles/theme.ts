// @packages
import {
  createTheme
} from '@mui/material/styles';



const theme = createTheme({
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
