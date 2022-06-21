// packages
import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItems from '../organisms/ListItems';
// scripts
import SettingsButton from '../molecules/SettingsButton';

// styles
const styles = {
  gridContainer: {
    bgcolor: 'background.default',
    height: '100vh',
    padding: '10px 20px',
  },
  textContainer: {
    margin: '10px 0px',
  },
  divider: {
    borderColor: 'white',
    width: '100%',
  },
  list: {
    marginTop: '20px',
  },
};

const Dashboard = () => {
  return (
    <Grid direction="column" container sx={styles.gridContainer}>
      <Grid direction="row" justifyContent="space-between" alignItems="center" container item>
        <Typography variant="h2" sx={styles.textContainer}>
          Celerik Scaffolder
        </Typography>
        <SettingsButton />
      </Grid>
      <Divider sx={styles.divider} />
      <Grid sx={styles.list}>
        <ListItems />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
