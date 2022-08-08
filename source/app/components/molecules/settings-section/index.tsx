// packages
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '../modal';

const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalValue = (state: boolean) => setIsModalOpen(state);

  return (
    <>
      <IconButton onClick={() => setIsModalOpen(true)}>
        <SettingsIcon />
      </IconButton>
      <Modal handleModalValue={handleModalValue} modalState={isModalOpen} />
    </>
  );
};

export default SettingsButton;
