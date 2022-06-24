// Package
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Scripts
import ListItem from '../../molecules/row-list';
import styles from './styles';
import { GlobalStateContext } from '../../../context/MessageContext';
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';
import { remoteList } from '../../../api/remote-list';

interface Props {
  isRemote?: boolean;
  localData?: IFolder[];
}

const ListItems = ({ isRemote, localData }: Props) => {
  const [list, setList] = useState<IFolder[]>([]);
  const { globalStateFromExtension } = useContext(GlobalStateContext);

  const getFolders = async () => {
    if (globalStateFromExtension.templateUrl) {
      const data = await remoteList.getListOfFolders(
        globalStateFromExtension.templateUrl
      );
      setList(data);
    }
  };

  useEffect(() => {
    if (isRemote) {
      getFolders();
    } else if (localData?.length) {
      setList([...localData]);
    }
  }, [globalStateFromExtension.templateUrl, localData]);

  return (
    <Grid item sx={{ mb: 3 }}>
      <Paper sx={styles.paper} elevation={0}>
        <Typography variant="h5" sx={styles.title}>
          {isRemote ? 'Remote Templates' : 'Local Templates'}
        </Typography>
      </Paper>
      <List sx={styles.list}>
        {list.length ? list.map((folder) => (
          <ListItem
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

ListItems.defaultProps = {
  isRemote: false,
  localData: []
};

export default ListItems;
