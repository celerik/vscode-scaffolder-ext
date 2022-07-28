import { Theme } from '@mui/material';

export default {
  content: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: 'none'
  },
  saveButton: {
    alignSelf: 'end',
    marginBottom: 2,
    marginRight: 2,
    width: '25%'
  },
  titleContainer: { m: 0, pl: 2 },
  title: { color: 'white', m: 0, fontWeight: 500 },
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
  }
};
