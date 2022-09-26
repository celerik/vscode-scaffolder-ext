/* global vscode */
// Package
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
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
  const [showMore, setShowMore] = useState({ show: false, buttonText: 'Show more' });

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

  const changeShowMore = () => {
    if (showMore.show) {
      setShowMore({ show: false, buttonText: 'Show more' });
    } else {
      setShowMore({ show: true, buttonText: 'Show less' });
    }
  };

  const getFolders = () => {
    if (data.length > 4 && !showMore.show) {
      return data.slice(0, 4);
    }
    return data;
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
          <Grid container spacing={2}>
            {data.length ? getFolders().map((folder) => (
              <Grid key={(folder.name || folder) as React.Key} md={6} xs={12} item>
                <RowItemTemplate
                  key={(folder.name || folder) as React.Key}
                  link={folder.html_url}
                  owner={!isLocal ? owner : ''}
                  nameFolder={(folder.name || folder) as string}
                  functionSelect={
                    () => getFileConfigSelected(folder.name)
                  }
                />
              </Grid>
            )) : (
              <Typography variant="body1" sx={styles.noResourceLabel}>
                No resources found
              </Typography>
            )}
          </Grid>
        </List>
        { data.length > 4 && (
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Link
            component="button"
            href="/#"
            underline="hover"
            onClick={changeShowMore}
          >
            { showMore.show ? showMore.buttonText : `${showMore.buttonText} (${data.length < 32 ? data.length - 4 : '+32'})`}
          </Link>
        </Grid>
        )}
      </Grid>
    </>
  );
};

TemplateList.defaultProps = {
  isLocal: false,
  owner: ''
};

export default TemplateList;
