// @package
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

// @scripts
import { GlobalStateContext } from '../../../context/MessageContext';
import styles from './styles';

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
  const { handleStateFromApp } = useContext(GlobalStateContext);

  const {
    register, handleSubmit, reset, formState: { errors }
  } = useForm();

  const handleCloseDialog = () => {
    reset();
    handleDialogValue(false);
    handleStateFromApp('scaffoldingFile', '', false);
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
                { `{{${item}}}`}
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
