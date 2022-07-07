// package
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

import styles from './styles';

// types

interface Props {
  handleDialogValue: (state: boolean) => void;
  handleSubmitData: (fields: {}) => void;
  value: boolean;
  title: string;
  data: string[];
}

const ModalSelect = ({
  handleDialogValue, value, title, data, handleSubmitData
}: Props) => {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm();

  const handleCloseDialog = () => {
    handleDialogValue(false);
  };
  return (
    <Dialog open={value} disableEscapeKeyDown fullWidth sx={{ borderRadius: 0 }} maxWidth="sm">
      <DialogTitle sx={styles.titleContainer} component="div">
        <Typography gutterBottom variant="h4" sx={styles.title}>
          {title}
        </Typography>
        <IconButton aria-label="close" onClick={handleCloseDialog} sx={styles.iconButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={styles.content}>
        <form onSubmit={handleSubmit(handleSubmitData)} style={{ display: 'contents' }}>
          {data.map((item) => (
            <React.Fragment key={item}>
              <Typography gutterBottom sx={{ color: 'text.secondary' }} variant="body1">
                {item}
              </Typography>
              <TextField
                id="outlined-basic"
                sx={styles.input}
                size="small"
                error={Boolean(errors[item])}
                helperText={errors[item]?.message as string}
                variant="outlined"
                {...register(item, {
                  required: true
                })}
              />
            </React.Fragment>
          ))}
          <Button variant="contained" type="submit" sx={styles.saveButton}>
            Generate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSelect;
