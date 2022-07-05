// package
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import styles from './styles';

const ModalSelect = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setIsModalOpen(false);
  };
  return (
    <Dialog open={isModalOpen}>
      <DialogTitle sx={styles.titleContainer} component="div">
        <Typography gutterBottom variant="h5" sx={styles.title}>
          Settings
        </Typography>
        <IconButton aria-label="close" onClick={handleCloseDialog} sx={styles.iconButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    </Dialog>
  );
};

export default ModalSelect;
