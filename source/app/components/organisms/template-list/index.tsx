/* global vscode */
// Package
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';

// Scripts
import ModalSelect from '../../molecules/modal-select';
import RowItemTemplate from '../../molecules/row-item-template';
import styles from './styles';
import { GlobalStateContext } from '../../../context/MessageContext';
import { IFolder, IDataConfig } from '../../../utils/interfaces/remoteFolders.interface';
import { localList } from '../../../api/local-list';
import { remoteList } from '../../../api/remote-list';
import { ErrorMessage } from '../../../../src/view/messages/messageTypes';

interface Props {
  data: IFolder[];
  isLocal?: boolean;
  owner?: string;
  title: string;
}

const TemplateList = ({
  data,
  isLocal,
  owner,
  title
}: Props) => {
  const { globalStateFromExtension } = useContext(GlobalStateContext);

  const [dataConfig, setDataConfig] = useState<IDataConfig>({ variables: [] });
  const [folderSelected, setFolderSelected] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalValue = (state: boolean) => setIsModalOpen(state);

  const getFileConfigSelected = async (folderName: string) => {
    setFolderSelected(folderName);
    let configFile: IDataConfig = { variables: [] };
    if (isLocal) {
      localList.getConfigFile(folderName);
    } else {
      configFile = await remoteList.getConfigFile(globalStateFromExtension.templateUrl, folderName);
      if (configFile.variables.length) {
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
        folder: folderSelected,
        fields,
        isLocal,
        data: remoteFiles,
        isRelative: dataConfig.isRelative,
        expressions: dataConfig.expressions || {}
      }
    });
  };

  useEffect(() => {
    if (isLocal && globalStateFromExtension.scaffoldingFile) {
      try {
        setDataConfig(JSON.parse(globalStateFromExtension.scaffoldingFile));
        handleModalValue(true);
      } catch (error: any) {
        vscode.postMessage<ErrorMessage>({
          type: 'ERROR',
          payload: (error?.message || error) as string
        });
      }
    }
  }, [globalStateFromExtension.scaffoldingFile]);

  return (
    <>
      <ModalSelect
        data={dataConfig.variables}
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
            <RowItemTemplate
              key={(folder.name || folder) as React.Key}
              link={folder.html_url}
              owner={!isLocal ? owner : ''}
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
  isLocal: false,
  owner: ''
};

export default TemplateList;
