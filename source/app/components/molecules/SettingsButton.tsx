// packages
import React from "react";
import Modal from "./Modal";
import Button from "@mui/material/Button";

// styles
const styles = {
  buttonStyle: {
    padding: "10px 20px",
    height: "min-content",
    color: "text.main",
    bgColor: 'white',
    textTransform: 'capitalize',
    fontWeight: '700'
  }
};

const SettingsButton = () => {
  return (
    <>
      <Button sx={styles.buttonStyle} variant="contained">Settings</Button>
      <Modal />
    </>
  );
};

export default SettingsButton;
