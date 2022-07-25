import { Theme } from '@mui/material';

export default {
  content: { display: 'flex', flexDirection: 'column' },
  saveButton: {
    mt: 2,
    width: '25%',
    alignSelf: 'end'
  },
  titleContainer: { m: 0, pl: 2 },
  title: { color: 'white', m: 0, fontWeight: 500 },
  iconButton: {
    position: 'absolute',
    right: 3,
    top: 1,
    color: (theme: Theme) => theme.palette.grey[500]
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
  }
};
