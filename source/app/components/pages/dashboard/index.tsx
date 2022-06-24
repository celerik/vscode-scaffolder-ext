/* global localTemplates */
// packages
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItems from '../../organisms/list-items';

// scripts
import SettingsButton from '../../molecules/settings-section';
import styles from './styles';
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';

const Dashboard = () => {
  const [localData, setLocalData] = useState<IFolder[]>([]);

  useEffect(() => {
    if (localTemplates) {
      const data = localTemplates.split(',').map((template) => ({ name: template }));
      setLocalData(data);
    }
  }, []);

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
        <ListItems isRemote />
        <ListItems localData={localData} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
