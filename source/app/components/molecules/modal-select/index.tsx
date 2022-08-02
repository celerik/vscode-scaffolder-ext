// @package
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

// @scripts
import styles from './styles';
import { GlobalStateContext } from '../../../context/MessageContext';

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

  const onClickSubmit = (fields: any) => {
    handleSubmitData(fields);
    handleCloseDialog();
  };

  return (
    <Dialog open={value} disableEscapeKeyDown fullWidth sx={{ borderRadius: 0, ...styles.dialog }} maxWidth="sm">
      <DialogTitle sx={styles.titleContainer} component="div">
        <Typography gutterBottom variant="h4" sx={styles.title}>
          {title}
        </Typography>
        <IconButton aria-label="close" onClick={handleCloseDialog} sx={styles.iconButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onClickSubmit)} style={{ display: 'contents' }}>
        <DialogContent dividers sx={styles.content}>
          {data.map((item) => (
            <React.Fragment key={item}>
              <Typography gutterBottom sx={{ color: 'text.secondary' }} variant="body1">
                { `{{${item}}}`}
              </Typography>
              <TextField
                error={Boolean(errors[item])}
                helperText={errors[item]?.message as string}
                id="outlined-basic"
                size="small"
                sx={styles.input}
                variant="outlined"
                {...register(item, {
                  required: true
                })}
              />
            </React.Fragment>
          ))}
        </DialogContent>
        <DialogActions disableSpacing>
          <Button variant="contained" type="submit" sx={styles.saveButton}>
            Generates
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalSelect;
