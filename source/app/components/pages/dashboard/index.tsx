// packages
import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// scripts
import SettingsButton from '../../molecules/settings-section';
import styles from './styles';

const Dashboard = () => (
  <Grid direction="column" container sx={styles.gridContainer}>
    <Grid direction="row" justifyContent="space-between" alignItems="center" container item>
      <Typography variant="h2" sx={styles.textContainer}>Celerik Scaffolder</Typography>
      <SettingsButton />
    </Grid>
    <Divider sx={styles.divider} />
  </Grid>
);

export default Dashboard;
