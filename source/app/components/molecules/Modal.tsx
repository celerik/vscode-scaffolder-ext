// packages
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Theme } from '@mui/material';

const styles = {
  content: { display: 'flex', flexDirection: 'column' },
  saveButton: {
    mt: 2,
    width: '25%',
    alignSelf: 'end'
  },
  titleContainer: { m: 0, pl: 2 },
  title: { color: "white", m: 0, fontWeight: 500 },
  iconButton: {
    position: 'absolute',
    right: 3,
    top: 1,
    color: (theme: Theme) => theme.palette.grey[500],
  },
  input: {
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        borderColor: "secondary.main"
      }
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "secondary.main"
      }
    }
  }
};

export interface Props {
  handleModalValue: (state: boolean) => void;
  modalState: boolean;
}

export default function CustomizedDialogs({
  handleModalValue,
  modalState
}: Props) {
  const handleClose = () => {
    handleModalValue(false);
  };

  return (
    <Dialog
      open={modalState}
      disableEscapeKeyDown
      fullWidth
      sx={{ borderRadius: 0 }}
      maxWidth="sm"
    >
      <DialogTitle sx={styles.titleContainer} component="div">
        <Typography gutterBottom variant='h5' sx={styles.title}>
          Settings
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={styles.iconButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={styles.content}>
        <Typography gutterBottom sx={{ color: "text.secondary" }} variant="body1">
          Templates URL (GitHub):
        </Typography>
        <TextField id="outlined-basic" sx={styles.input} size="small" variant="outlined" />
        <Button variant="contained" onClick={handleClose} sx={styles.saveButton}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
