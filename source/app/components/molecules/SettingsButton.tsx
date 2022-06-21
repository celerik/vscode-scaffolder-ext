// packages
import React from "react";
import Button from '@mui/material/Button';

// styles
const styles = {
  buttonStyle: {
    padding: '10px 20px',
    height: "min-content"
  }
};

const SettingsButton = () => {
  return (
    <Button sx={styles.buttonStyle} variant="contained">Contained</Button>
  );
};

export default SettingsButton;
