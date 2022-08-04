import { Theme } from '@mui/material';

export default {
  content: {
    display: 'flex',
    borderColor: 'background.main',
    borderBottom: 'none',
    flexDirection: 'column'
  },
  saveButton: {
    alignSelf: 'end',
    marginBottom: 2,
    marginRight: 2,
    width: '25%'
  },
  titleContainer: {
    m: 0,
    pl: 2
  },
  title: { color: 'white', m: 0, fontWeight: 500 },
  subtitle: {
    color: 'text.secondary',
    marginTop: 1,
    margin: 0
  },
  iconButton: {
    color: (theme: Theme) => theme.palette.grey[500],
    position: 'absolute',
    right: 3,
    top: 1
  },
  input: {
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: 'secondary.main'
      }
    },
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': {
        borderColor: 'secondary.main'
      }
    }
  },
  dialog: {
    maxHeight: '80%'
  },
  varContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    margin: '10px 0'
  }
};
