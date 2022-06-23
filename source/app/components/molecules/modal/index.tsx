/* eslint-disable react-hooks/exhaustive-deps */
// packages
import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

// scripts
import styles from './styles';
import { GIT_URL } from '../../../utils/regex';
import { GlobalStateContext } from '../../../context/MessageContext';

// types
type Fields = {
  urlParam: string;
};

interface Props {
  handleModalValue: (state: boolean) => void;
  modalState: boolean;
}

export default function CustomizedDialogs({
  handleModalValue,
  modalState
}: Props) {
  const { handleStateFromApp, globalStateFromExtension } = useContext(GlobalStateContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Fields>();

  useEffect(() => {
    reset({ urlParam: globalStateFromExtension.templateUrl });
  }, [globalStateFromExtension.templateUrl]);

  const onUpdateUrl: SubmitHandler<Fields> = (data) => {
    handleStateFromApp('templateUrl', data.urlParam);
    handleModalValue(false);
  };

  const handleClose = () => {
    reset({ urlParam: globalStateFromExtension.templateUrl });
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
        <Typography gutterBottom variant="h5" sx={styles.title}>
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
        <form onSubmit={handleSubmit(onUpdateUrl)} style={{ display: 'contents' }}>
          <Typography gutterBottom sx={{ color: 'text.secondary' }} variant="body1">
            Templates URL (GitHub):
          </Typography>
          <TextField
            id="outlined-basic"
            sx={styles.input}
            size="small"
            error={Boolean(errors.urlParam)}
            helperText={errors.urlParam?.message}
            variant="outlined"
            {...register('urlParam', {
              required: true,
              pattern: {
                value: GIT_URL,
                message: 'Invalid url'
              }
            })}
          />
          <Button variant="contained" type="submit" sx={styles.saveButton}>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
