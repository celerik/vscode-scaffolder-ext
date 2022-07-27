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

  const handleSubmitData = (fields: {}) => {
    vscode.postMessage({
      type: 'SCAFFOLDING',
      payload: { folder: folderSelected, fields, isLocal }
    });
  };

  const dataConfigFormated = (configArray: string[]) => configArray.map((item) => (item.replaceAll('{', '').replaceAll('}', '')));

  useEffect(() => {
    if (isLocal && globalStateFromExtension.scaffoldingFile) {
      setDataConfig(JSON.parse(globalStateFromExtension.scaffoldingFile).variables);
      handleModalValue(true);
    }
  }, [globalStateFromExtension.scaffoldingFile]);

  return (
    <>
      <ModalSelect
        data={dataConfigFormated(dataConfig)}
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
          {data.length ? data.map((folder) => (
            <ListItem
              key={(folder.name || folder) as React.Key}
              link={folder.html_url}
              nameFolder={(folder.name || folder) as string}
              functionSelect={
                () => getFileConfigSelected(folder.name)
              }
            />
          )) : (
            <Typography variant="h5" sx={styles.noResourceLabel}>
              No resources found
            </Typography>
          )}
        </List>
      </Grid>
    </>
  );
};

TemplateList.defaultProps = {
  isLocal: false
};

export default TemplateList;
