// packages
import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// scripts
import SettingsButton from '../molecules/SettingsButton';

// styles
const styles = {
  gridContainer: {
    bgcolor: '#263344',
    height: '100vh',
    padding: '10px 20px'
  },
  textContainer: {
    margin: '10px 0px'
  },
  divider: {
    borderColor: 'white',
    width: '100%'
  }
};

const Dashboard = () => {
  return (
    <Grid direction='column' container sx={styles.gridContainer}>
      <Grid direction="row" justifyContent="space-between" alignItems="center" container item>
        <Typography variant='h2' sx={styles.textContainer}>Celerik Scaffolder</Typography>
        <SettingsButton />
      </Grid>
      <Divider sx={styles.divider} />
    </Grid >
  );
};

export default Dashboard;
