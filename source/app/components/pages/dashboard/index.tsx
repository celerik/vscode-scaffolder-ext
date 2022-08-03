/* global localTemplates */
// packages
import React, { useEffect, useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TemplateList from '../../organisms/template-list';

// scripts
import SettingsButton from '../../molecules/settings-section';
import styles from './styles';
import { GIT_URL } from '../../../utils/regex';
import { GlobalStateContext } from '../../../context/MessageContext';
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';
import { remoteList } from '../../../api/remote-list';

const Dashboard = () => {
  const [localData, setLocalData] = useState<IFolder[]>([]);
  const [owner, setOwner] = useState<string>('');
  const [remoteData, setRemoteData] = useState<IFolder[]>([]);
  const { globalStateFromExtension } = useContext(GlobalStateContext);

  const getRemoteFolders = async () => {
    if (globalStateFromExtension.templateUrl) {
      const data = await remoteList.getListOfFolders(
        globalStateFromExtension.templateUrl
      );
      const urlFragment = GIT_URL.exec(globalStateFromExtension.templateUrl);
      if (urlFragment) setOwner(urlFragment[4]);
      setRemoteData(data);
    }
  };

  useEffect(() => {
    getRemoteFolders();
  }, [globalStateFromExtension.templateUrl]);

  useEffect(() => {
    if (localTemplates) {
      const data = localTemplates.split(',').map((template) => ({ name: template }));
      setLocalData(data);
    }
  }, []);

  return (
    <Grid direction="column" alignContent="baseline" container sx={styles.gridContainer}>
      <Grid direction="row" justifyContent="space-between" alignItems="center" container item>
        <Typography variant="h2" sx={styles.textContainer}>
          Celerik Scaffolder
        </Typography>
        <SettingsButton />
        <Divider sx={styles.divider} />
      </Grid>
      <Grid sx={styles.list} item>
        <TemplateList data={remoteData} owner={owner} title="Remote Templates" />
        <TemplateList isLocal data={localData} title="Local Templates" />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
