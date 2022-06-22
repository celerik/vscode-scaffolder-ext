// packages
import React, { useState } from "react";
import Modal from "./Modal";
import Button from "@mui/material/Button";

const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalValue = (state: boolean) => setIsModalOpen(state);

  return (
    <>
      <Button variant="contained" onClick={() => setIsModalOpen(true)} >Settings</Button>
      <Modal handleModalValue={handleModalValue} modalState={isModalOpen} />
    </>
  );
};

export default SettingsButton;
