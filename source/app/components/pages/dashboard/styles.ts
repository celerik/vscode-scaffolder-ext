import { Theme } from '@mui/material';

export default {
  gridContainer: {
    bgcolor: 'background.default',
    height: '100vh',
    padding: '10px 20px',
    display: 'grid'
  },
  textContainer: {
    color: 'white',
    fontWeight: 'bold',
    margin: '10px 0px'
  },
  divider: {
    borderColor: 'background.paper',
    width: '100%'
  },
  list: {
    marginTop: '20px',
    overflow: 'auto'
  },
  styledInputBase: (theme: Theme) => ({
    backgroundColor: theme.palette.grey[700],
    borderRadius: 4,
    color: 'white',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`
    },
    '& .MuiInputBase-root': {
      with: '100%'
    }
  }),
  searchIconWrapper: (theme: Theme) => ({
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1
  }),
  search: (theme: Theme) => ({
    backgroundColor: 'black',
    borderRadius: 0,
    marginLeft: 0,
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1)
    }
  }),
};
