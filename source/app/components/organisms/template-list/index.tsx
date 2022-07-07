// Package
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Scripts
import ListItem from '../../molecules/row-item-template';
import styles from './styles';
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';
import { remoteList } from '../../../api/remote-list';
import { GlobalStateContext } from '../../../context/MessageContext';

interface Props {
  title: string;
  data: IFolder[];
}

const TemplateList = ({ title, data }: Props) => {
  const { globalStateFromExtension } = useContext(GlobalStateContext);
  return (
    <Grid item sx={{ mb: 3 }}>
      <Paper sx={styles.paper} elevation={0}>
        <Typography variant="h5" sx={styles.title}>
          {title}
        </Typography>
      </Paper>
      <List sx={styles.list}>
        {data.length ? data.map((folder) => (
          <ListItem
            functionSelect={
              () => remoteList.getConfigFile(globalStateFromExtension.templateUrl, folder.name)
            }
            key={(folder.name || folder) as React.Key}
            nameFolder={(folder.name || folder) as string}
            link={folder.html_url}
          />
        )) : (
          <Typography variant="h5" sx={styles.noResourceLabel}>
            No resources found
          </Typography>
        )}
      </List>
    </Grid>
  );
};

export default TemplateList;
