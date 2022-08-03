/* global vscode */
// Package
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';

// Scripts
import ListItem from '../../molecules/row-item-template';
import ModalSelect from '../../molecules/modal-select';
import styles from './styles';
import { GlobalStateContext } from '../../../context/MessageContext';
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';
import { localList } from '../../../api/local-list';
import { remoteList } from '../../../api/remote-list';

interface Props {
  data: IFolder[];
  isLocal?: boolean;
  title: string;
}

const TemplateList = ({ title, data, isLocal }: Props) => {
  const { globalStateFromExtension } = useContext(GlobalStateContext);

  const [dataConfig, setDataConfig] = useState<Array<string>>([]);
  const [folderSelected, setFolderSelected] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalValue = (state: boolean) => setIsModalOpen(state);

  const getFileConfigSelected = async (folderName: string) => {
    setFolderSelected(folderName);
    let configFile: string[] = [];
    if (isLocal) {
      localList.getConfigFile(folderName);
    } else {
      configFile = await remoteList.getConfigFile(globalStateFromExtension.templateUrl, folderName);
      if (configFile.length) {
        setDataConfig(configFile);
        handleModalValue(true);
      }
    }
  };

  const handleSubmitData = async (fields: {}) => {
    const remoteFiles = !isLocal && await remoteList
      .getTreeFolders(globalStateFromExtension.templateUrl, folderSelected);
    vscode.postMessage({
      type: 'SCAFFOLDING',
      payload: {
        folder: folderSelected, fields, isLocal, data: remoteFiles
      }
    });
  };

  useEffect(() => {
    if (isLocal && globalStateFromExtension.scaffoldingFile) {
      setDataConfig(JSON.parse(globalStateFromExtension.scaffoldingFile).variables);
      handleModalValue(true);
    }
  }, [globalStateFromExtension.scaffoldingFile]);

  return (
    <>
      <ModalSelect
        data={dataConfig}
        handleDialogValue={handleModalValue}
        handleSubmitData={handleSubmitData}
        title={folderSelected}
        value={isModalOpen}
      />
      <Grid item sx={{ mb: 3 }}>
        <Paper sx={styles.paper} elevation={0}>
          <Typography variant="h5" sx={styles.title}>
            {title}
          </Typography>
        </Paper>
        <List sx={styles.list}>
          <Grid container spacing={2}>
            {data.length ? data.map((folder) => (
              <Grid key={(folder.name || folder) as React.Key} md={6} xs={12} item>
                <ListItem
                  link={folder.html_url}
                  nameFolder={(folder.name || folder) as string}
                  functionSelect={
                    () => getFileConfigSelected(folder.name)
                  }
                />
              </Grid>
            )) : (
              <Typography variant="h5" sx={styles.noResourceLabel}>
                No resources found
              </Typography>
            )}
          </Grid>
        </List>
      </Grid>
    </>
  );
};

TemplateList.defaultProps = {
  isLocal: false
};

export default TemplateList;
